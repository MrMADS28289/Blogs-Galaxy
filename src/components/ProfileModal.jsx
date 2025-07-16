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
import { updateUser } from "@/utils/authApi";
import { toast } from "sonner";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaImage,
  FaSave,
  FaTimes,
  FaSmile,
  FaRocket,
  FaStar,
  FaHeart,
  FaGhost,
  FaEdit,
} from "react-icons/fa";

// Mapping of avatar names to their corresponding React-Icons components.
// This allows for dynamic rendering of different avatar icons.
const avatarComponents = {
  User: (props) => <FaUser {...props} />,
  Smile: (props) => <FaSmile {...props} />,
  Rocket: (props) => <FaRocket {...props} />,
  Star: (props) => <FaStar {...props} />,
  Heart: (props) => <FaHeart {...props} />,
  Ghost: (props) => <FaGhost {...props} />,
};

// Array of available avatar options, derived from the keys of avatarComponents.
const avatarOptions = Object.keys(avatarComponents);

/**
 * Helper component to display the selected avatar icon.
 * Falls back to a default user icon if the specified avatar is not found.
 */
const AvatarDisplay = ({ avatar, ...props }) => {
  const AvatarComponent = avatarComponents[avatar];
  if (!AvatarComponent) return <FaUser {...props} />;
  return <AvatarComponent {...props} />;
};

/**
 * ProfileModal component displays and allows editing of the user's profile information.
 * It uses Jotai for global state management to control its visibility and user data.
 */
const ProfileModal = () => {
  const [showProfileModal, setShowProfileModal] = useAtom(showProfileModalAtom);
  const [user, setUser] = useAtom(userAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const router = useRouter();

  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("User");

  // Initialize form fields when the user data changes.
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setSelectedAvatar(user.image || "User");
    }
  }, [user]);

  // Handles saving the updated profile information.
  const handleSave = async () => {
    if (!user || !user.token) {
      toast.error("Authentication token not found. Please log in again.");
      return;
    }

    try {
      const updatedUserData = await updateUser(
        { name, image: selectedAvatar },
        user.token
      );
      setUser(updatedUserData);
      toast.success("Profile updated successfully!");

      setIsEditMode(false);
    } catch (error) {
      toast.error("Failed to update profile: " + error.message);
    }
  };

  // Handles canceling the edit operation, reverting changes.
  const handleCancel = () => {
    if (user) {
      setName(user.name || "");
      setSelectedAvatar(user.image || "User");
    }
    setIsEditMode(false);
  };

  // Don't render the modal if it's not set to be shown.
  if (!showProfileModal) return null;

  // Use createPortal to render the modal outside the main DOM hierarchy,
  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-background/60 backdrop-blur-sm"
      onClick={() => setShowProfileModal(false)}
    >
      <div
        className="relative w-full max-w-md rounded border border-dashed border-orange-500 bg-background/20 p-6 text-center shadow-glass-inset backdrop-blur-[6px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button for the modal. Changes behavior based on edit mode. */}
        <button
          onClick={() =>
            isEditMode ? handleCancel() : setShowProfileModal(false)
          }
          className="absolute right-3 top-3 text-white hover:text-orange-500"
        >
          <FaTimes size={24} />
        </button>

        {/* Conditional rendering based on user authentication status. */}
        {isAuthenticated && user ? (
          <>
            {!isEditMode && (
              <button
                onClick={() => setIsEditMode(true)}
                className="absolute left-3 top-3 text-white hover:text-orange-500"
              >
                <FaEdit size={20} />
              </button>
            )}

            <h2 className="text-2xl font-bold text-white">Profile</h2>
            <div className="mt-4 flex flex-col items-center gap-4">
              {/* Display selected avatar. */}
              <div className="flex size-24 items-center justify-center rounded-full border-2 border-orange-500 bg-background/50">
                <AvatarDisplay
                  avatar={selectedAvatar}
                  className="size-16 text-white"
                />
              </div>

              {/* Conditional rendering for edit mode vs. display mode. */}
              {isEditMode ? (
                <div className="flex w-full flex-col items-center gap-4">
                  {/* Input field for user's name. */}
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-3/4 rounded border border-orange-500 bg-transparent px-3 py-2 text-center text-white"
                    placeholder="Enter your name"
                  />

                  {/* Avatar selection options. */}
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

                  {/* Save and Cancel buttons for edit mode. */}
                  <div className="flex gap-4">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 rounded border border-dashed border-green-500 px-4 py-2 text-white hover:bg-green-500/20 hover:shadow-glass-sm"
                    >
                      <FaSave size={16} />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 rounded border border-dashed border-red-500 px-4 py-2 text-white hover:bg-red-500/20 hover:shadow-glass-sm"
                    >
                      <FaTimes size={16} />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  {/* Display user's name and email when not in edit mode. */}
                  <p className="text-xl font-semibold text-white">
                    {user.name || "N/A"}
                  </p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                  {/* Admin panel button, only shown if the user has an 'admin' role. */}
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
