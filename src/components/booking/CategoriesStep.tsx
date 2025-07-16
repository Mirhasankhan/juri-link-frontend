"use client";
import { useState } from "react";
import { useCategoriesQuery } from "@/redux/features/services/services.api";
import Image from "next/image";
import CategoryLoading from "../loadingData/CategoryLoading";
import { toast } from "react-toastify";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";

interface CategoriesStepProps {
  onNext: () => void;
  onSelect: (category: string) => void;
}

const CategoriesStep: React.FC<CategoriesStepProps> = ({
  onNext,
  onSelect,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { data: categoriesData, isLoading } = useCategoriesQuery("");

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onSelect(categoryId);
  };
    const {email} = useAppSelector(useCurrentUser)



  const handleNext = () => {
    if (!email) {
      toast.error("Please login first");
      return
    }
    if (selectedCategory) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Choose a Category
        </h2>
        <p className="text-gray-600">
          Select the type of service youre looking for
        </p>
      </div>

      {isLoading ? (
        <CategoryLoading></CategoryLoading>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categoriesData?.result?.map(
            (category: {
              id: string;
              categoryName: string;
              overview: string;
              mediaUrls: string[];
            }) => {
              const isSelected = selectedCategory === category.id;

              return (
                <div
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    isSelected
                      ? "border-blue-500 bg-blue-50 shadow-lg"
                      : "border-gray-200 hover:border-primary hover:shadow-md"
                  }`}
                >
                  <div className={`absolute inset-0 rounded-2xl`} />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <Image
                        alt=""
                        height={40}
                        width={40}
                        src={category.mediaUrls[0]}
                      ></Image>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {category.categoryName}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Facial treatment fasion {category.overview}
                    </p>
                  </div>

                  {isSelected && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>
      )}

      <div className="flex justify-end pt-6">
        <button
          onClick={handleNext}
          disabled={!selectedCategory}
          className="px-6 rounded-xl flex items-center bg-primary text-xl text-white  py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default CategoriesStep;
