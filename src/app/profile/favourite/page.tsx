import Sidebar from "@/components/profile/Sidebar";
import Container from "@/utils/Container";
import React from "react";

const FavouritePage = () => {
  return (
    <Container>
      <div className="grid grid-cols-4 gap-6">
        <div className="hidden md:block md:col-span-1 border-r-2">
          <Sidebar></Sidebar>
        </div>
      <div className="col-span-4 md:col-span-3">
          <h1>ooooooooo kkkkkkkkkkk nnnnnnnnnn</h1>
        </div>
      </div>
    </Container>
  );
};

export default FavouritePage;
