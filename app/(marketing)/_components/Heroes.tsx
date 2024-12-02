"use client";
import React from "react";
import Lottie from "lottie-react";
import HeroAnimation from "@/public/Animation/HeroAnimation.json";
import Image from "next/image";
import { useConvexAuth } from "convex/react";
const Heroes = () => {
  const { isLoading } = useConvexAuth();
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center">
        {!isLoading && (
          <div className="relative w-[350px] h-[350px] md:w-[400px] md:h-[400px]">
            <Lottie animationData={HeroAnimation} className="object-contain" />
          </div>
        )}

        <div
          className={
            isLoading
              ? "relative h-[600px] w-[600px] hidden md:block"
              : "relative h-[400px] w-[400px] hidden md:block"
          }
        >
          <Image
            src="/images/1-dark.svg"
            fill
            alt="Connecting"
            className="object-contain dark:hidden"
          />
          <Image
            src="/images/1-light.svg"
            fill
            alt="Connecting"
            className="object-contain hidden dark:block"
          />
        </div>
      </div>
    </div>
  );
};

export default Heroes;
