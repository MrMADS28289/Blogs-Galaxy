import { atom } from "jotai";

/**
 * Retrieves initial user data from localStorage.
 * This function is used to rehydrate the user state when the application loads.
 */
const getInitialUser = () => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  }
  return null;
};

export const isPlanetVisibleAtom = atom(true);
export const selectedCategoryAtom = atom(null);
export const showBlogModalAtom = atom(false);
export const blogModalDataAtom = atom(null);
export const showCommentsModalAtom = atom(false);
export const commentsModalDataAtom = atom(null);
export const showProfileModalAtom = atom(false);

/**
 * Atom for managing the authenticated user's data.
 * It reads initial user data from localStorage and persists changes back to localStorage.
 */
export const userAtom = atom(getInitialUser(), (get, set, newUser) => {
  set(userAtom, newUser);
  if (typeof window !== "undefined") {
    if (newUser) {
      // Store essential user details in localStorage.
      const userToStore = {
        id: newUser._id,
        email: newUser.email,
        token: newUser.token,
      };
      if (newUser.name) {
        userToStore.name = newUser.name;
      }
      if (newUser.image) {
        userToStore.image = newUser.image;
      }
      if (newUser.role) {
        userToStore.role = newUser.role;
      }
      localStorage.setItem("user", JSON.stringify(userToStore));
    } else {
      // Remove user data from localStorage on logout.
      localStorage.removeItem("user");
    }
  }
});

// Derived atom to check if a user is currently authenticated.
export const isAuthenticatedAtom = atom((get) => !!get(userAtom));
