import React from "react";
import Linkify from "react-linkify";

type NoteMainTextProps = {
  text: string;
};

export const NoteMainText: React.FC<NoteMainTextProps> = ({ text }) => {
  const formatted = text.split("\n").filter(p => p.trim().length > 0);

  return (
    <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed bg-red-500 h-[20%] overflow-hidden">
      <Linkify
        componentDecorator={(decoratedHref, decoratedText, key) => (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={decoratedHref}
            key={key}
            className="text-blue-500 hover:underline"
          >
            {decoratedText}
          </a>
        )}
      >
        {formatted.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </Linkify>
    </div>
  );
};
