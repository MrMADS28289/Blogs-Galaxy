import Image from "next/image";

const isValidImageUrl = (url) => {
  if (typeof url !== "string") return false;

  if (url.startsWith("/")) return true; // Allow relative paths

  if (url.startsWith("http://") || url.startsWith("https://")) {
    try {
      const { hostname } = new URL(url);
      const allowedDomains = (process.env.NEXT_PUBLIC_IMAGE_DOMAINS || "").split(',');
      return allowedDomains.includes(hostname);
    } catch (error) {
      console.error("Invalid URL:", error);
      return false; // Invalid URL
    }
  }

  return false;
};

const BlogImage = ({ src, alt, ...props }) => {
  const fallback = "/default.png";
  const safeSrc = isValidImageUrl(src) ? src : fallback;

  return (
    <Image
      src={safeSrc}
      alt={alt || "Blog image"}
      width={600}
      height={400}
      {...props}
    />
  );
};

export default BlogImage;
