import { Ellipsis, Send, Share, Trash } from "lucide-react";
import { useState } from "react";

export const BrainChatContainer = () => {
    const [showOptions, setShowOptions] = useState(false);
    const chatSmaple = [
        {
            id: 1,
            mode: 'user',
            content: 'Hello, how are you?',
        }, {
            id: 2,
            mode: 'deepen',
            content: 'I am a deep learning model, I can help you with your questions.',
        }, {
            id: 3,
            mode: 'user',
            content: 'What is the capital of France?',
        }, {
            id: 4,
            mode: 'deepen',
            content: 'The capital of France is Paris.',
        },
        {
            id: 5,
            mode: 'user',
            content: 'Explain relative theories of relativity.',
        }, {
            id: 6,
            mode: 'deepen',
            content: 'Relative theories of relativity are a set of theories that describe the relationship between space and time. They are based on the idea that the speed of light is constant in all inertial frames of reference.',
        },
        {
            id: 7,
            mode: 'user',
            content: 'Can you give me examples of relative theories of relativity?',
        }, {
            id: 8,
            mode: 'deepen',
            content: 'The most famous example of relative theories of relativity is the theory of special relativity. It was proposed by Albert Einstein in 1905. It is based on the idea that the speed of light is constant in all inertial frames of reference.',
        },
        {
            id: 9,
            mode: 'user',
            content: 'Can you give me examples of relative theories of relativity?',
        },{
            id: 3,
            mode: 'user',
            content: 'What is the capital of France?',
        }, {
            id: 4,
            mode: 'deepen',
            content: 'The capital of France is Paris.',
        },
        {
            id: 5,
            mode: 'user',
            content: 'Explain relative theories of relativity.',
        }, {
            id: 6,
            mode: 'deepen',
            content: 'Relative theories of relativity are a set of theories that describe the relationship between space and time. They are based on the idea that the speed of light is constant in all inertial frames of reference.',
        },
        {
            id: 7,
            mode: 'user',
            content: 'Can you give me examples of relative theories of relativity?',
        }, {
            id: 8,
            mode: 'deepen',
            content: 'The most famous example of relative theories of relativity is the theory of special relativity. It was proposed by Albert Einstein in 1905. It is based on the idea that the speed of light is constant in all inertial frames of reference.',
        },
        {
            id: 3,
            mode: 'user',
            content: 'What is the capital of France?',
        }, {
            id: 4,
            mode: 'deepen',
            content: 'The capital of France is Paris.',
        },
        {
            id: 5,
            mode: 'user',
            content: 'Explain relative theories of relativity.',
        }, {
            id: 6,
            mode: 'deepen',
            content: 'Relative theories of relativity are a set of theories that describe the relationship between space and time. They are based on the idea that the speed of light is constant in all inertial frames of reference.',
        },
        {
            id: 7,
            mode: 'user',
            content: 'Can you give me examples of relative theories of relativity?',
        }, {
            id: 8,
            mode: 'deepen',
            content: 'The most famous example of relative theories of relativity is the theory of special relativity. It was proposed by Albert Einstein in 1905. It is based on the idea that the speed of light is constant in all inertial frames of reference.',
        },
    ]
    return (
        <div className=" w-full relative bg-[#f6f3f3] dark:bg-[#101010] flex flex-col h-[calc(100vh-0px)]">
            <div className="flex text-black dark:text-white items-center justify-between px-4 py-2 border-b border-[#e2e0e0] dark:border-[#1b1b1c]">
                <div>
                    <h2 className="text-2xl font-bold">Deepen</h2>
                </div>
                <button className="cursor-pointer hover:opacity-50" onClick={() => setShowOptions(!showOptions)}>
                    <Ellipsis size={20} />
                </button>
                {showOptions && (
                    <div className="flex overflow-hidden flex-col text-black dark:text-white shadow-2xl absolute top-10 right-4 bg-white dark:bg-[#101010] border border-gray-300 dark:border-gray-800 rounded-md">
                        <button className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] cursor-pointer">
                            <Share size={16} />
                            Share
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] cursor-pointer">
                            <Trash size={16} />
                            Delete
                        </button>

                    </div>
                )}
            </div>
            <div className="flex flex-col  flex-1 p-4 w-[70%] mx-auto space-y-6 overflow-y-auto max-h-[calc(100vh-100px)]">
                {chatSmaple.map((item) => (
                    <div key={item.id} className={`flex ${item.mode === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`text-sm font-medium text-black dark:text-white ${item.mode === 'deepen' ? '' : 'bg-gray-200 dark:bg-[#1a1a1a] text-black dark:text-white'} rounded-2xl p-4`}>{item.content}</div>
                    </div>
                ))}
            </div>
            <div className="flex shadow-2xl overflow-hidden pl-4 p-3  items-center  w-[70%] bg-[#f6f3f3] dark:bg-[#101010]  mx-auto justify-center rounded-full border mb-4 border-[#e2e0e0] dark:border-[#1b1b1c]">
                <textarea
                    className="w-full h-full resize-none focus:outline-none text-black dark:text-white"
                    placeholder="Ask anything..."
                    rows={1}
                />
                <button className=" w-8 h-8 grid place-items-center text-black dark:text-white rounded-full cursor-pointer hover:opacity-50">
                    <Send size={22} />
                </button>
            </div>
        </div>
    );
}; 