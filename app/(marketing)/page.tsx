import React from "react";
import Header from "./_components/Header";
import Heroes from "./_components/Heroes";
import Footer from "./_components/Footer";
const MainPage = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10 dark:bg-[#1f1f1f]">
        <Header />
        <Heroes />
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
