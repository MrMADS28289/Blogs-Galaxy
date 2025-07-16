import Image from "next/image";

/**
 * Validates if a given URL is a safe and allowed image URL.
 * It checks for valid URL format, and if it's an external URL, it verifies against allowed domains.
 * @param {string} url - The image URL to validate.
 * @returns {boolean} True if the URL is valid and allowed, false otherwise.
 */
const isValidImageUrl = (url) => {
  // Ensure the URL is a string.
  if (typeof url !== "string") return false;

  // Allow relative paths (e.g., /images/my-image.png).
  if (url.startsWith("/")) return true;

  // For absolute URLs, check if they start with http/https.
  if (url.startsWith("http://") || url.startsWith("https://")) {
    try {
      const { hostname } = new URL(url);
      // Retrieve allowed image domains from environment variables.
      const allowedDomains = (
        process.env.NEXT_PUBLIC_IMAGE_DOMAINS || ""
      ).split(",");
      // Check if the image's hostname is in the list of allowed domains.
      return allowedDomains.includes(hostname);
    } catch (error) {
      console.error("Invalid URL:", error);
      return false;
    }
  }

  // If none of the above conditions are met, the URL is considered invalid.
  return false;
};

/**
 * BlogImage component renders an image for a blog post.
 * It includes logic to validate image URLs and provide a fallback image if the source is invalid.
 * It uses Next.js's `Image` component for optimized image delivery.
 * @param {object} props - Component props.
 * @param {string} props.src - The source URL of the image.
 * @param {string} props.alt - The alt text for the image.
 * @param {object} props - Additional props passed to the Next.js `Image` component.
 */
const BlogImage = ({ src, alt, ...props }) => {
  const fallback = "/default.png";
  // Determine the safe source URL: use the provided src if valid, otherwise use the fallback.
  const safeSrc = isValidImageUrl(src) ? src : fallback;

  return (
    <Image
      src={safeSrc} // Use the validated or fallback source.
      alt={alt || "Blog image"} // Use provided alt text or a default.
      width={600}
      height={400}
      {...props} // Pass any other props (e.g., className) to the Image component.
    />
  );
};

export default BlogImage;
