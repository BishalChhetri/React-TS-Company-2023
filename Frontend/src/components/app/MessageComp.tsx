import React, { useRef, useEffect, useState, useMemo } from "react";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { BiMessageRoundedDots } from "react-icons/bi";
import {
  CREATE_MESSAGE_MUTATION,
  QUERY_MESSAGE,
  NEW_MESSAGE_SUBSCRIPTION,
} from "../../Query";
import MessageCore from "./MessageCore";
import { UserData, Message } from "../../types/types.d";
import { ClipLoader } from "react-spinners";

type Props = {
  isMenuOpen: boolean;
  activeUser: UserData | null;
  auth: UserData | undefined;
};

const MessageComp = ({ isMenuOpen, activeUser, auth }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [createMessage] = useMutation(CREATE_MESSAGE_MUTATION);
  const [messages, setMessages] = useState<Message[] | []>([]);

  const { data, loading, error, refetch } = useQuery(QUERY_MESSAGE, {
    variables: { input: { sender_id: auth?.id, receiver_id: activeUser?.id } },
    skip: !activeUser || !auth,
  });

  const {
    data: newMessage,
    loading: newLoading,
    error: newError,
  } = useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
    variables: { input: { receiver_id: auth?.id } },
    skip: !activeUser?.id,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!inputRef.current?.value || !activeUser?.id || !auth?.id) return;
      const message = await createMessage({
        variables: {
          input: {
            text: inputRef.current.value,
            sender_id: auth?.id,
            receiver_id: activeUser?.id,
          },
        },
      });

      setMessages((prevStat) => [...prevStat, message?.data?.createMessage]);
      inputRef.current.value = "";
    } catch (e: any) {
      throw new Error(e.message);
    }
  };

  useEffect(() => {
    if (!loading) {
      setMessages(data?.messages ? data.messages : []);
    }
  }, [data, loading]);

  useMemo(() => {
    refetch();
  }, [activeUser]);

  useMemo(() => {
    if (newMessage && newMessage.newMessage && !newLoading) {
      const receivedMessage = newMessage.newMessage;
      setMessages((prevStat) => [...prevStat, receivedMessage]);
    }
  }, [newMessage, newMessage?.newMessage, newLoading]);

  return (
    <div
      className={`bg-neutralSilver ${
        isMenuOpen
          ? "hidden"
          : "flex flex-col justify-between md:col-span-5 col-span-6"
      }  `}
    >
      {activeUser && (
        <div className="h-14 bg-neutralSilver text-center p-2 flex flex-col">
          <span className="text-brandPrimary text-xl font-bold">
            {activeUser?.name}
          </span>
          <span className="text-[0.5rem]">{activeUser?.email}</span>
        </div>
      )}
      {loading && (
        <div className="flex justify-center items-center mt-8">
          <ClipLoader size={20} color="#ee4e6a" />
        </div>
      )}
      {messages && !loading && messages.length > 0 && (
        <div className="flex flex-col justify-end mt-auto mb-2">
          <MessageCore messages={messages} currentUser={auth} />
        </div>
      )}
      {!messages && !loading && (
        <div className="flex m-auto justify-center relative">
          <span className="me-1 text-2xl font-bold text-neutralDGrey text-end ">
            Start Conversation
          </span>
          <BiMessageRoundedDots
            size="2rem"
            className="text-darkBrandPrimary absolute -right-8 -bottom-1 transform -translate-y-1/2"
          />
        </div>
      )}
      <form
        action="submit"
        onSubmit={handleSubmit}
        className="p-3 bg-white flex items-center justify-between w-full"
      >
        <input
          type="text"
          placeholder="Type your message..."
          className="input-primary w-full rounded-l h-12"
          ref={inputRef}
        />
        <button className="bg-brandPrimary ms-1 text-white py-1 px-4 transition-all duration-300 rounded hover:bg-darkBrandPrimary h-12">
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageComp;
