import Container from "@/utils/Container";
import React from "react";

const SearchLawyers = () => {
  return (
    <div className="bg-primary py-16">
      <Container>
        <div className="flex flex-col items-center justify-center text-white">
          <h1 className="text-6xl font-medium pb-2">Find Qualified Lawyers</h1>
          <p className="text-center">
            Browse through our network of experienced legal professionals and
            find the <br />
            right lawyer for your needs.
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
            <button className="px-8 py-3 col-span-2 border border-white text-white font-medium">
              Search Lawyers
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SearchLawyers;
