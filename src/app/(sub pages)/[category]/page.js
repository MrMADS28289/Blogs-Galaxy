"use client";
import React, { Suspense } from "react";
import { BtnList } from "@/app/data";
import BlogList from "@/components/BlogList";
import BlogCard from '@/components/BlogCard';
import RenderModel from '@/components/RenderModel';
import ScrollButton from '@/components/ScrollButton';
import AiModel from "@/components/models/AiModel";
import CommunityModel from "@/components/models/CommunityModel";
import CreativeModel from "@/components/models/CreativeModel";
import GeographyModel from "@/components/models/GeographyModel";
import HistoryModel from "@/components/models/HistoryModel";
import MotivationModel from "@/components/models/MotivationModel";
import SportsModel from "@/components/models/SportsModel";
import TechModel from "@/components/models/TechModel";

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

  const categoryDetails = BtnList.find(
    (item) => item.link.substring(1) === category
  );

  if (!categoryDetails) {
    return <div>Category not found</div>;
  }

  const ModelComponent = modelMap[category];

  return (
    <section className="w-full">
      <div className="w-full h-[70vh] flex items-center justify-center">
        <div className="w-full h-full relative">
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
      <div className="text-center mt-8">
        <h1 className="text-4xl font-bold">{categoryDetails.label}</h1>
      </div>
      <BlogList category={category} ItemLayoutComponent={BlogCard} />
      <ScrollButton />
    </section>
  );
};

export default CategoryPage;
