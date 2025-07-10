import { atom } from 'jotai';

export const isPlanetVisibleAtom = atom(true);
export const selectedCategoryAtom = atom(null); // Default to null, as there's no 'All' category