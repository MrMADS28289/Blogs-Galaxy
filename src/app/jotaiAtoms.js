import { atom } from 'jotai';

export const isPlanetVisibleAtom = atom(true);
export const selectedCategoryAtom = atom(null); // Default to null, as there's no 'All' category
export const showBlogModalAtom = atom(false);
export const blogModalDataAtom = atom(null);

export const showCommentsModalAtom = atom(false);
export const commentsModalDataAtom = atom(null);