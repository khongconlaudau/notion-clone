"use client";

import React, { useEffect, useState } from "react";
import { SettingModel } from "../modals/SettingModel";

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
    </>
  );
};

export default ModelProvider;
