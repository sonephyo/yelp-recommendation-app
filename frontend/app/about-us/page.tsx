import Footer from "@/components/Footer";
import Hero from "@/components/Home/Hero";
import Navigation from "@/components/Home/Navigation";
import OfferInfo from "@/components/Home/OfferInfo";
import TrainingInfo from "@/components/Home/TrainingInfo";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" flex flex-col mx-auto overflow-x-hidden h-full gap-10">
      <Navigation />
      <AboutUs />
    </div>
  );
}

const AboutUs = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Meet the Developers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Developer 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Image
              src="/pics/soneyImage.jpg"
              alt="Shoes"
              height="500"
              width="500"
            />
            <h3 className="text-xl font-semibold text-center text-gray-800">
              FullStack Developer - Phone Pyae Sone Phyo
            </h3>
            <p className="text-center text-gray-600 mb-4">
              B.S. in Software Engineering (Math minor)
            </p>
            <p className="text-gray-700 mb-4">
              Phone Pyae Sone Phyo worked as the full-stack developer, focusing
              on the frontend UI/UX, Google Maps API integration, and creating
              custom markers. They designed the user flow, optimized the search
              functionality, and handled backend tasks, including setting up API
              endpoints and integrating MongoDB for online use. Additionally,
              Phone set up Docker deployment files and contributed to the
              optimization of the recommendation algorithm by using pretrained
              data.
            </p>
          </div>

          {/* Developer 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Image
              src="/pics/sauravImage.JPG"
              alt="Shoes"
              height="500"
              width="500"
            />
            <h3 className="text-xl font-semibold text-center text-gray-800">
              Recommendation System Developer - Saurav
            </h3>
            <p className="text-center text-gray-600 mb-4">
              B.S. in Computer Science
            </p>
            <p className="text-gray-700 mb-4">
              John Doe played a key role in setting up the database and
              implementing the recommendation algorithm used for generating JSON
              files. They helped create the pretrained data files and ensured
              seamless integration with the backend system to support the
              recommendation functionality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
