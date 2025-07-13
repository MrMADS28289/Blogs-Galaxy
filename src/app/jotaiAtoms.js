import { atom } from "jotai";

// Function to get initial user from localStorage
const getInitialUser = () => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  }
  return null;
};

export const isPlanetVisibleAtom = atom(true);
export const selectedCategoryAtom = atom(null); // Default to null, as there's no 'All' category
export const showBlogModalAtom = atom(false);
export const blogModalDataAtom = atom(null);

export const showCommentsModalAtom = atom(false);
export const commentsModalDataAtom = atom(null);
export const showProfileModalAtom = atom(false);

export const userAtom = atom(
  getInitialUser(),
  (get, set, newUser) => {
    set(userAtom, newUser);
    if (typeof window !== "undefined") {
      if (newUser) {
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
        localStorage.removeItem("user");
      }
    }
  }
);

export const isAuthenticatedAtom = atom((get) => !!get(userAtom));
