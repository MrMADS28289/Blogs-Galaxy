import { atom } from "jotai";

// Function to get initial user from localStorage
const getInitialUser = () => {
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem('user');
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

export const userAtom = atom(getInitialUser());
export const isAuthenticatedAtom = atom(
  (get) => !!get(userAtom),
  (get, set, newUser) => {
    set(userAtom, newUser);
    if (typeof window !== 'undefined') {
      if (newUser) {
        localStorage.setItem('user', JSON.stringify(newUser));
      } else {
        localStorage.removeItem('user');
      }
    }
  }
);
