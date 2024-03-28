import Navbar from "@/components/navbar";
import StoreCategories from "./store-categories";
import Hero from "./Hero";
import ExploreProducts from "./explore-products";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <StoreCategories />
      <ExploreProducts />
      <Footer />
    </>
  );
}
