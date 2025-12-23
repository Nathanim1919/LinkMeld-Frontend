import { create } from "zustand";
import { nanoid } from 'nanoid';
import { v4 as uuidv4 } from 'uuid';


/*
    Types
*/
export type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: number;
  status: "sending" | "sent" | "error";
};

export type BrainSelector = {
  isBrainActive: boolean; // true if brain is active
  isBookmarkActive: boolean; // true if bookmark is active
  hasExplicitContext: boolean; // true if context is explicitly set (any collection/bookmark/capures)
  canSend: boolean; // message can be sent
}

export type ContextDraft = {
  brainEnabled: boolean;

  collections: Set<string>;
  bookmarksEnabled: boolean;
  captures: Set<string>;
};

export type ContextSnapshot = {
  brain: {
    enabled: boolean;
  };

  collections: {
    ids: string[];
  };

  bookmarks: {
    enabled: boolean;
  };

  captures: {
    ids: string[];
  };
};

export type Conversation = {
  id: string;
  title: string;
  createdAt: number;
  context: ContextSnapshot;
  messages: Message[];
};


/*
  Constants
*/

const EMPTY_DRAFT: ContextDraft = {
  brainEnabled: true,  // default ON
  collections: new Set(),
  bookmarksEnabled: false,
  captures: new Set()
}


/*
   Core Rule
*/

const buildContextSnapshot = (draft: ContextDraft): ContextSnapshot => {
  if (draft.brainEnabled) {
    return {
        brain: {enabled: true},
        collections: {ids: []},
        bookmarks:{enabled: false},
        captures: {ids: []}
      }
  }

  return {
    brain: {enabled: false},
    collections: {ids: Array.from(draft.collections)},
    bookmarks: {enabled: draft.bookmarksEnabled},
    captures: {ids: Array.from(draft.captures)}
  }
}



/*
   Store
*/


type BrainStore = {
  conversations: Record<string, Conversation>;
  activeConversationId: string | null;

  draft: ContextDraft;

  // Actions
  toggleBrain: () => void;
  toggleBookmark: () => void;
  toggleCollection: (id: string) => void;
  toggleCapture: (id: string) => void;
  resetDraft: () => void;

  startConversation: (initialMessage: string) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  selectConversation: (id: string) => void;

  // Derived selectors
  isBrainActive: () => boolean;
  isBookmarkActive: () => boolean;
  hasExplicitContext: () => boolean;
  canSend: () => boolean;
};


export const useBrainStore = create<BrainStore>((set, get) => ({
  /*
    Initial State
  */

  conversations: {},
  activeConversationId: null,
  draft: EMPTY_DRAFT,


  /*
    Draft Actions
  */
  toggleBrain: () =>
    set(state => ({
      draft: {
        ...state.draft,
        brainEnabled: !state.draft.brainEnabled,
        bookmarksEnabled: false // 🔒 brain disables bookmarks
      }
    })),

  toggleBookmark: () =>
    set(state => ({
      draft: {
        ...state.draft,
        bookmarksEnabled: !state.draft.bookmarksEnabled,
        brainEnabled: false // 🔒 explicit context disables brain
      }
    })),

  toggleCollection: (id: string) =>
    set(state => {
      const next = new Set(state.draft.collections);
      next.has(id) ? next.delete(id) : next.add(id);

      return {
        draft: {
          ...state.draft,
          collections: next,
          brainEnabled: false // 🔒 explicit context disables brain
        }
      };
    }),

  toggleCapture: (id: string) =>
    set(state => {
      const next = new Set(state.draft.captures);
      next.has(id) ? next.delete(id) : next.add(id);

      return {
        draft: {
          ...state.draft,
          captures: next,
          brainEnabled: false
        }
      };
    }),

  resetDraft: () => set({ draft: EMPTY_DRAFT }),


  /*
     Conversation Lifecycle
  */

  startConversation: async (firstMessage: string) => {
    set(state => {
      if (!firstMessage.trim()) return state;

      const context = buildContextSnapshot(state.draft);
      const id = uuidv4();

      const conversation: Conversation = {
        id,
        title: firstMessage.slice(0, 60),
        createdAt: Date.now(),
        context,
        messages: [
          {
            id: nanoid(),
            role: 'user',
            content: firstMessage,
            createdAt: Date.now(),
            status: 'sent'
           }
        ]
      };

      return {
        conversations: {
          ...state.conversations,
          [id]: conversation
        },
        activeConversationId: id,
        draft: EMPTY_DRAFT
      };
    });
  },

  sendMessage: async (content: string) => set(state => {
        const id = state.activeConversationId
        if (!id || !content.trim()) return state

        const convo = state.conversations[id]

        return {
          conversations: {
            ...state.conversations,
            [id]: {
              ...convo,
              messages: [
                ...convo.messages,
                {
                  id: nanoid(),
                  role: 'user',
                  content,
                  createdAt: Date.now(),
                  status: 'sent'
                }
              ]
            }
          }
        }
      }),

  selectConversation: (id: string) =>
    set((_state) => ({
      activeConversationId: id
    })),

  // Derived selectors
    isBrainActive: () => get().draft.brainEnabled,
    isBookmarkActive: () => get().draft.bookmarksEnabled,

    hasExplicitContext: () => {
      const draft = get().draft;
      return (
        draft.bookmarksEnabled ||
        draft.collections.size > 0 ||
        draft.captures.size > 0
      );
    },

    canSend: () => {
      // Block only if Brain OFF and no explicit context
      return get().draft.brainEnabled || get().hasExplicitContext();
    }
}));