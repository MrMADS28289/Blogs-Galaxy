"use client";
import { Suspense, useState } from "react";
import { BtnList } from "@/app/data";
import BlogList from "@/components/BlogList";
import BlogCard from "@/components/BlogCard";
import RenderModel from "@/components/RenderModel";
import ScrollButton from "@/components/ScrollButton";
import AiModel from "@/components/models/AiModel";
import CommunityModel from "@/components/models/CommunityModel";
import CreativeModel from "@/components/models/CreativeModel";
import GeographyModel from "@/components/models/GeographyModel";
import HistoryModel from "@/components/models/HistoryModel";
import MotivationModel from "@/components/models/MotivationModel";
import SportsModel from "@/components/models/SportsModel";
import TechModel from "@/components/models/TechModel";
import { useBlogs } from "@/components/hooks/useBlogs";
import Pagination from "@/components/Pagination";
import CategoryNotFound from "@/components/UI/noCategory";

const modelMap = {
  ai: AiModel,
  community: CommunityModel,
  creative: CreativeModel,
  geography: GeographyModel,
  history: HistoryModel,
  motivation: MotivationModel,
  sports: SportsModel,
  tech: TechModel,
};

const CategoryPage = ({ params }) => {
  const { category } = params;
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 10;

  const { blogs, loading, error, totalPages } = useBlogs(
    currentPage,
    blogsPerPage
  );

  const categoryDetails = BtnList.find(
    (item) => item.link.substring(1) === category
  );

  if (!categoryDetails) {
    return <CategoryNotFound />;
  }

  const ModelComponent = modelMap[category];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <section className="relative w-full">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="animate-pulse text-2xl font-bold text-gray-400">
            Loading blogs...
          </div>
        </div>
      )}
      <div className="flex h-[70vh] w-full items-center justify-center">
        <div className="relative size-full">
          <Suspense fallback={null}>
            <RenderModel>
              {ModelComponent && (
                <ModelComponent
                  position={categoryDetails.position}
                  scale={categoryDetails.scale}
                />
              )}
            </RenderModel>
          </Suspense>
        </div>
      </div>
      <div className="mt-8 text-center">
        <h1 className="text-4xl font-bold">{categoryDetails.label}</h1>
        {categoryDetails.description && (
          <p className="mt-2 text-lg text-gray-400">
            {categoryDetails.description}
          </p>
        )}
      </div>
      <BlogList
        category={category}
        ItemLayoutComponent={BlogCard}
        blogs={blogs}
        error={error}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <ScrollButton />
    </section>
  );
};

export default CategoryPage;
