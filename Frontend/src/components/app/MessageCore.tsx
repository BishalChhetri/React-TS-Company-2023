import React, { useState, useEffect, useRef } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Message, UserData } from "../../types/types.d";
import formatDateTime from "../../utils/formatDateTime";

interface Props {
  messages: Message[] | null;
  currentUser: UserData | undefined;
}

const MessageCore: React.FC<Props> = ({ messages, currentUser }) => {
  const [messageAll, setMessageAll] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messages && messages.length > 0) {
      setMessageAll(messages);
    } else {
      setMessageAll([]);
    }
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [messageAll]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-hidden">
      <PerfectScrollbar
        options={{
          wheelPropagation: false as boolean,
          suppressScrollX: true as boolean,
        }}
        className="max-h-[calc(100vh-250px)] overflow-y-auto p-2"
      >
        {messageAll.map((message, index) => {
          const currMessage = messageAll[index];
          const nextMessage = messageAll[index + 1];

          // const showTime = !nextMessage || message.sender_id !== nextMessage.sender_id;

          const showTime =
            !nextMessage ||
            (nextMessage &&
              Math.abs(
                parseInt(currMessage.createdAt) -
                  parseInt(nextMessage.createdAt)
              ) >
                24 * 60 * 60 * 1000);

          return (
            <div
              key={message.id}
              className={`flex mx-4 sm:mx-1 ${
                message.sender_id !== currentUser?.id
                  ? "justify-start"
                  : "justify-end"
              } mb-2`}
            >
              <div className="w-3/5 flex flex-col">
                <div
                  className={`p-3 rounded-lg cursor-pointer ${
                    message.sender_id === currentUser?.id
                      ? "bg-[#f9c9d2] text-blue-800 ml-auto"
                      : "bg-green-200 text-green-800 me-auto"
                  }`}
                >
                  {message.text}
                </div>
                {showTime && (
                  <span
                    className={`text-[0.5rem] ${
                      message.sender_id === currentUser?.id ? "ml-auto" : ""
                    }`}
                  >
                    {formatDateTime(
                      new Date(Number(message.createdAt)).toISOString()
                    )}
                  </span>
                )}
              </div>
              <div ref={scrollRef} />
            </div>
          );
        })}
      </PerfectScrollbar>{" "}
    </div>
  );
};

export default MessageCore;
