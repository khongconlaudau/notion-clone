"use client";

import React, { useEffect, useState } from "react";
import { SettingModel } from "../modals/SettingModel";
import { CoverImageModel } from "../modals/CoverImageModel";

const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <SettingModel />
      <CoverImageModel />
    </>
  );
};

export default ModelProvider;
