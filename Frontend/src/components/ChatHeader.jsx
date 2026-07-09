import { useSelector } from "react-redux";

export default function ChatHeader() {
    const { selectedUser } = useSelector((state) => state.chat);


    if (!selectedUser) return null;

    return (
        <div className="w-full flex items-center gap-3 p-4 border-b border-base-300">
            <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
                className="w-10 h-10 rounded-full"
            />

            <div>
                <h3 className="font-semibold">
                    {selectedUser.fullName}
                </h3>

                <p className="text-sm text-gray-500">
                    Offline
                </p>
            </div>
        </div>
    );
}