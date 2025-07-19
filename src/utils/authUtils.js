import { toast } from "sonner";

export const handleUnauthorized = (error) => {
  const errorMessage = error?.message || String(error);
  console.error("Unauthorized error caught:", errorMessage);

  if (errorMessage.includes("401")) {
    // Dispatch a custom event to signal unauthorized access
    const event = new CustomEvent('unauthorized-event');
    window.dispatchEvent(event);
    toast.error("Your session has expired. Please log in again.");
  }
};