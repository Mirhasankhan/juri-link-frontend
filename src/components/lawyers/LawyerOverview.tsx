import Container from "@/utils/Container";
import { Clock, MapPin, Star, Video } from "lucide-react";
import Image from "next/image";

const LawyerOverview = () => {
    return (
         <div className="bg-primary py-12">
      <Container>
        <div className="grid grid-cols-2 md:mx-16 text-white gap-6 ">
          <Image
            alt=""
            height={200}
            width={700}
            className="border-2 rounded-xl"
            src="https://images.unsplash.com/photo-1682687220795-796d3f6f7000?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D"
          ></Image>
          <div>
            <h1 className="text-4xl font-semibold">Sarah Johnson</h1>
            <h1 className="text-xl font-semibold pt-2">Corporate Law</h1>
            <div className="flex items-center mt-4 gap-2">
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white bg-opacity-15">
                <Clock size={20}></Clock>
                <p>12 years of experience</p>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white bg-opacity-15">
                <MapPin size={20}></MapPin>
                <p>New York City</p>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white bg-opacity-15">
                <Video size={20}></Video>
                <p>Online Consulation</p>
              </div>
            </div>
            <div className="flex items-center mt-4 gap-2">
              <div className="flex items-center gap-4 px-6 py-2 rounded-xl bg-white bg-opacity-15">
                <div className="flex gap-1">
                  <Star size={18} className="text-orange-500"></Star>
                  <Star size={18} className="text-orange-500"></Star>
                  <Star size={18} className="text-orange-500"></Star>
                  <Star size={18} className="text-orange-500"></Star>
                  <Star size={18} className="text-orange-500"></Star>
                </div>
                <div>
                  <h1 className="text-2xl font-semibold">4.5</h1>
                  <p>(10 reviews)</p>
                </div>
              </div>
              <div className=" px-6 py-2 text-center rounded-xl bg-white bg-opacity-15">
                <h1 className="text-2xl font-semibold">$430</h1>
                <p>Fees</p>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button className="bg-green-600 w-full py-2 rounded-[4px] text-white font-medium">
                View Details
              </button>
              <button className="text-red-600 border-red-600 border  w-full py-2 rounded-[4px]  font-medium">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
    );
};

export default LawyerOverview;