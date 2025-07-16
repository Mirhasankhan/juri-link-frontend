"use client";
import { useCategoriesQuery } from "@/redux/features/services/services.api";

const Categories = ({
  setActive,
  active,
}: {
  setActive: (value: string) => void;
  active: string;
}) => {
  const { data: categories } = useCategoriesQuery("");


  return (
    <div className="border">
      {categories?.result?.map(
        (category: { id: string; categoryName: string }) => (
          <div key={category.id}>
            <div
              onClick={() => setActive(category.id)}
              className={`border-b px-8 py-3 group  flex justify-between items-center hover:bg-primary hover:text-white hover:cursor-pointer hover:px-8 transition-all duration-300 ease-in-out ${
                active == category.id && "bg-primary text-white"
              }`}
            >
              <h1 className="text-xl">{category.categoryName}</h1>

              <h1
                className={`${
                  active == category.id ? " bg-white" : " bg-primary"
                } h-[10px] w-[10px] rounded-full group-hover:bg-white transition-all duration-300 ease-in-out`}
              ></h1>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Categories;
