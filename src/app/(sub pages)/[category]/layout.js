import { BtnList } from "@/app/data";

export async function generateStaticParams() {
  return BtnList.map((item) => ({
    category: item.link.substring(1),
  }));
}

export default function CategoryLayout({ children }) {
  return <>{children}</>;
}
