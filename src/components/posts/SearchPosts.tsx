import Container from "@/utils/Container";
import React from "react";

const SearchPosts = () => {
  return (
    <div className="bg-primary py-16">
      <Container>
        <div className="flex flex-col items-center justify-center text-white">
          <h1 className="text-6xl font-medium pb-2">
            Find Client&apos;s Posts
          </h1>
          <p className="text-center pb-2">
            Browse client posts and connect with individuals seeking legal help{" "}
            <br />
            through our network.
          </p>
          <div className="xl:w-4/6 text-black grid grid-cols-8 w-full gap-4">
            <input
              className="py-3 focus:outline-none col-span-3 w-full rounded-[8px] px-4"
              type="text"
              placeholder="search by law name or speciaz..."
            />
            <input
              className="py-3 focus:outline-none col-span-3 w-full rounded-[8px] px-4"
              type="text"
              placeholder="Location..."
            />
            <button className="px-8 py-3 col-span-2 border rounded-[4px] border-white text-white font-medium">
              Search Posts
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SearchPosts;
