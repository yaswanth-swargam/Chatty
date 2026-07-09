import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatComponent from "../components/ChatComponent";
import { useSelector } from "react-redux";

export default function HomePage() {
  const { selectedUser } = useSelector((state) => state.chat);

  return (
    <div className="h-screen pt-16">
      <div className="bg-base-100 h-[calc(100vh-4rem)] rounded-lg shadow-xl">
        <div className="flex h-full rounded-lg overflow-hidden">
          <Sidebar />

          {selectedUser ? (
            <ChatComponent />
          ) : (
            <NoChatSelected />
          )}
        </div>
      </div>
    </div>
  );
}