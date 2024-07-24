import Footer from "@/components/Footer";
import Hero from "@/components/Home/Hero";
import Navigation from "@/components/Home/Navigation";
import OfferInfo from "@/components/Home/OfferInfo";
import TrainingInfo from "@/components/Home/TrainingInfo";

export default function Home() {
  return (
    <div className=" flex flex-col mx-auto overflow-x-hidden h-full gap-10">
      <Navigation />
      <Hero />
      <OfferInfo />
      <TrainingInfo />
      <Footer/>
    </div>
  );
}
