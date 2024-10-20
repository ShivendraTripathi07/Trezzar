import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct category={"airpodes"} heading={"Top Airpodes"} />
      <HorizontalCardProduct
        category={"televisions"}
        heading={"Popular TV's"}
      />
      <VerticalCardProduct
        category={"mobiles"}
        heading={"Top Quality Mobiles"}
      />
      <VerticalCardProduct
        category={"earphones"}
        heading={"Top Quality Earphones"}
      />
      <VerticalCardProduct category={"Mouse"} heading={"Top Mouse"} />
      <VerticalCardProduct category={"watches"} heading={"Top Watches"} />

      {/* Add All other 13 products */}
    </div>
  );
};

export default Home;
