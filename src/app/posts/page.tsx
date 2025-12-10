"use client";

import PostFilters from "@/components/lawyers/PostFilters";
import PostCard from "@/components/posts/PostCard";
import Container from "@/utils/Container";
import React, { useState } from "react";
import { Funnel, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePostsQuery } from "@/redux/features/services/services.api";
import Link from "next/link";

const PostsPage = () => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [selectedService, setSelectedService] = useState<string | null>("");
  const [selectedLegal, setSelectedLegal] = useState<string | null>("");
  const [selectedUrgency, setSelectedUrgency] = useState<string | null>("");

  const {
    data: posts,
    isLoading
    
  } = usePostsQuery({
    serviceId: selectedLegal,
    level: selectedUrgency,
    serviceType: selectedService,
  });

  const toggleFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  if (isLoading) {
    return "loading.....";
  }

  return (
    <div className="py-6">
      {/* Mobile Filters */}
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

            <PostFilters
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              selectedLegalService={selectedLegal}
              setSelectedLegalService={setSelectedLegal}
              selectedUrgency={selectedUrgency}
              setSelectedUrgency={setSelectedUrgency}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <Container>
        <div className="grid grid-cols-4 gap-5 mt-6">
          {/* Desktop Filters */}
          <div className="hidden md:block col-span-1">
            <PostFilters
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              selectedLegalService={selectedLegal}
              setSelectedLegalService={setSelectedLegal}
              selectedUrgency={selectedUrgency}
              setSelectedUrgency={setSelectedUrgency}
            />
          </div>

          {/* Posts */}
          <div className="col-span-4 md:col-span-3">
            <div className="flex justify-between items-center pb-6">
              <h1 className="text-xl font-medium">
                Found {posts?.data?.length} posts
              </h1>

              <button
                onClick={toggleFilters}
                className="md:hidden font-medium border px-4 py-1 rounded-[6px] flex gap-2 items-center"
              >
                <Funnel size={18} />
                Filters
              </button>
              <Link href="/create-post">
                <button className="hidden font-medium border px-4 py-1 rounded-[6px] md:flex gap-2 items-center">
                  <Plus size={18} />
                  Create Post
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {posts?.data
                ?.slice()
                .reverse()
                .map((post: any) => (
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
