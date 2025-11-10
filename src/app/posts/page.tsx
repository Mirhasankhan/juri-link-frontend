"use client";

import Filters from "@/components/lawyers/Filters";
import PostCard from "@/components/posts/PostCard";
import Container from "@/utils/Container";
import React, { useState } from "react";
import { Funnel, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePostsQuery } from "@/redux/features/services/services.api";

const PostsPage = () => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string | null>("");
  const [selectedService, setSelectedService] = useState<string | null>("");
  const [selectedLegal, setSelectedLegal] = useState<string | null>("");
  const { data: posts, isLoading } = usePostsQuery("");   

  const toggleFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

 

  if(isLoading){
    return "loading....."
  }

  return (
    <div className="py-6">
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-3/4 h-full bg-white z-50 shadow-lg p-4 md:hidden"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={toggleFilters}>
                <X size={24} />
              </button>
            </div>
            <Filters
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              selectedLegalService={selectedLegal}
              setSelectedLegalService={setSelectedLegal}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Container>
        <div className="grid grid-cols-4 gap-5 mt-6">
          <div className="hidden md:block col-span-1">
            <Filters
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              selectedLegalService={selectedLegal}
              setSelectedLegalService={setSelectedLegal}
            />
          </div>

          <div className="col-span-4 md:col-span-3">
            <div className="flex justify-between items-center pb-6">
              <h1 className="text-xl font-medium">Found &quot;{posts?.data?.length} posts&quot;</h1>
              <button
                onClick={toggleFilters}
                className="md:hidden font-medium border px-4 py-1 rounded-[6px] flex gap-2 items-center"
              >
                <Funnel size={18} />
                Filters
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {posts?.data?.map((post: any) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PostsPage;
