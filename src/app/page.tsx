"use client";

import { useContext, useEffect, useState } from "react";
import Browse from "./component/BrowsFeatures/Browse";
import GridComponent from "./component/Furniture/Furniture";
import Hero from "./component/HeroSection/Hero";
import ShopingCard from "./component/ShopingCard/ShopingCard";
import { StoreData } from "./store/StoreContext";
import axios from "axios";

export default function Home() {
  let { GetUser, user } = useContext(StoreData);

  useEffect(() => {

    GetUser();
  }, []);

  return (
    <div className="relative max-w-[1440px] mx-[auto]">
      <Hero />
      <Browse />
      <ShopingCard />
      <GridComponent />
    </div>
  );
}
