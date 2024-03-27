import Navbar from "@/components/navbar";
import StoreCategories from "./store-categories";
import Hero from "./Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <StoreCategories />
    </>
  );
}
