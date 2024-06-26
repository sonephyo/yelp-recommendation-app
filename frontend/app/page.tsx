import Hero from "@/components/Home/Hero";
import Navigation from "@/components/Home/Navigation";
import OfferInfo from "@/components/Home/OfferInfo";

export default function Home() {
  return (
    <div className=" flex flex-col mx-auto overflow-x-hidden h-full">
      <Navigation />
      <Hero />
      <OfferInfo />
    </div>
  );
}
