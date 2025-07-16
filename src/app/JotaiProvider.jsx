"use client";

import { Provider } from "jotai";

/**
 * JotaiProvider component.
 * This component wraps the application to provide Jotai's global state management context.
 * Any component within this provider's children can access and modify Jotai atoms.
 */
export default function JotaiProvider({ children }) {
  return <Provider>{children}</Provider>;
}
