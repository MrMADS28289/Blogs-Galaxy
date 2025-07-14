"use client";

import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import {
  showProfileModalAtom,
  userAtom,
  isAuthenticatedAtom,
} from "@/app/jotaiAtoms";
import { updateUser } from "@/utils/authApi"; // Import the updateUser function
import { toast } from "sonner";
import {
  X,
  User,
  Edit,
  Save,
  Smile,
  Rocket,
  Star,
  Heart,
  Ghost,
} from "lucide-react";

// --- Avatar Components Map ---
const avatarComponents = {
  User: (props) => <User {...props} />,
  Smile: (props) => <Smile {...props} />,
  Rocket: (props) => <Rocket {...props} />,
  Star: (props) => <Star {...props} />,
  Heart: (props) => <Heart {...props} />,
  Ghost: (props) => <Ghost {...props} />,
};

const avatarOptions = Object.keys(avatarComponents);

const AvatarDisplay = ({ avatar, ...props }) => {
  const AvatarComponent = avatarComponents[avatar];
  if (!AvatarComponent) return <User {...props} />; // Fallback
  return <AvatarComponent {...props} />;
};

// --- Main Component ---
const ProfileModal = () => {
  const [showProfileModal, setShowProfileModal] = useAtom(showProfileModalAtom);
  const [user, setUser] = useAtom(userAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const router = useRouter();

  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("User");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setSelectedAvatar(user.image || "User");
    }
  }, [user]);

  const handleSave = async () => {
    if (!user || !user.token) {
      toast.error("Authentication token not found. Please log in again.");
      return; // Or handle this case more gracefully
    }

    try {
      // 1. Call the API to update the user's name and avatar
      const updatedUserData = await updateUser(
        { name, image: selectedAvatar },
        user.token
      );
      console.log("Updated user data from API:", updatedUserData); // Add this line

      // 2. Update user state locally in Jotai with the returned data
      setUser(updatedUserData);
      toast.success("Profile updated successfully!");

      // 3. Exit edit mode
      setIsEditMode(false);
    } catch (error) {
      toast.error("Failed to update profile: " + error.message);
      // Optionally, show an error message to the user
    }
  };

  const handleCancel = () => {
    // Reset fields to original state and exit edit mode
    if (user) {
      setName(user.name || "");
      setSelectedAvatar(user.image || "User");
    }
    setIsEditMode(false);
  };

  if (!showProfileModal) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-background/60 backdrop-blur-sm"
      onClick={() => setShowProfileModal(false)}
    >
      <div
        className="relative w-full max-w-md rounded border border-dashed border-orange-500 bg-background/20 p-6 text-center shadow-glass-inset backdrop-blur-[6px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() =>
            isEditMode ? handleCancel() : setShowProfileModal(false)
          }
          className="absolute right-3 top-3 text-white hover:text-orange-500"
        >
          <X size={24} />
        </button>

        {isAuthenticated && user ? (
          <>
            {!isEditMode && (
              <button
                onClick={() => setIsEditMode(true)}
                className="absolute left-3 top-3 text-white hover:text-orange-500"
              >
                <Edit size={20} />
              </button>
            )}

            <h2 className="text-2xl font-bold text-white">Profile</h2>
            <div className="mt-4 flex flex-col items-center gap-4">
              <div className="flex size-24 items-center justify-center rounded-full border-2 border-orange-500 bg-background/50">
                <AvatarDisplay
                  avatar={selectedAvatar}
                  className="size-16 text-white"
                />
              </div>

              {isEditMode ? (
                <div className="flex w-full flex-col items-center gap-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-3/4 rounded border border-orange-500 bg-transparent px-3 py-2 text-center text-white"
                    placeholder="Enter your name"
                  />

                  <div className="my-2">
                    <p className="text-sm text-gray-300">Choose your avatar:</p>
                    <div className="mt-2 flex flex-wrap justify-center gap-3">
                      {avatarOptions.map((avatarKey) => (
                        <button
                          key={avatarKey}
                          onClick={() => setSelectedAvatar(avatarKey)}
                          className={`rounded-full p-2 transition-all duration-200 ${
                            selectedAvatar === avatarKey
                              ? "scale-110 bg-orange-500/50"
                              : "bg-black/20 hover:bg-orange-500/30"
                          }`}
                        >
                          <AvatarDisplay
                            avatar={avatarKey}
                            className="size-8 text-white"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 rounded border border-dashed border-green-500 px-4 py-2 text-white hover:bg-green-500/20 hover:shadow-glass-sm"
                    >
                      <Save size={16} />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 rounded border border-dashed border-red-500 px-4 py-2 text-white hover:bg-red-500/20 hover:shadow-glass-sm"
                    >
                      <X size={16} />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-xl font-semibold text-white">
                    {user.name || "N/A"}
                  </p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                  {user.role === "admin" && (
                    <button
                      onClick={() => {
                        router.push("/admin");
                        setShowProfileModal(false);
                      }}
                      className="custom-bg mt-4 rounded border border-dashed border-orange-500 px-4 py-2 text-white hover:shadow-glass-sm"
                    >
                      Admin Panel
                    </button>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <p className="text-white">You are not logged in.</p>
        )}
      </div>
    </div>,
    document.body
  );
};

export default ProfileModal;
