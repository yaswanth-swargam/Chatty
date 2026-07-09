import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessages,
  subscribeToMessages,
  unsubscribeFromMessages,
} from "../store/chatActions";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";

export default function ChatComponent() {
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  const {
    selectedUser,
    messages,
    isMessagesLoading,
  } = useSelector((state) => state.chat);

  const { authUser } = useSelector((state) => state.auth);

 useEffect(() => {
  if (!selectedUser) return;

  dispatch(getMessages(selectedUser.id));

  dispatch(subscribeToMessages());

  return () => {
    unsubscribeFromMessages();
  };
}, [dispatch, selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-base-content/60">
          Select a user to start chatting
        </p>
      </div>
    );
  }

  if (isMessagesLoading) {
    return <MessageSkeleton />;
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <ChatHeader />

      {/* Scrollable messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat ${
              message.sender_id === authUser.id
                ? "chat-end"
                : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full border">
                <img
                  src={
                    message.sender_id === authUser.id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="Profile"
                />
              </div>
            </div>

            <div className="chat-header mb-1">
              <time className="text-xs opacity-50">
                {new Date(message.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            </div>

            

            {message.image && (
              <img
                src={message.image}
                alt="Attachment"
                className="max-w-[200px] rounded-lg mt-2"
              />
            )}

            {message.text && (
              <div className="chat-bubble py-2 px-3">
                {message.text}
              </div>
            )}

            <div className="chat-header mb-1">
              <time className="text-xs opacity-50">
                {new Date(message.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <MessageInput />
    </div>
  );
}