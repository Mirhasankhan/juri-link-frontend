import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

const ClientReviews = () => {
  return (
    <div className="my-8 border rounded-[6px] p-6">
      <div className="flex items-center pb-4 gap-2">
        <Star className="text-primary"></Star>{" "}
        <h1 className="text-xl font-medium">Client Reviews (5 reviews)</h1>
      </div>
      <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 p-5 rounded-xl">
        <div className="flex gap-2">
          <Image
            alt=""
            height={20}
            width={20}
            className="h-12 w-12 rounded-full"
            src="https://scontent.fdac198-1.fna.fbcdn.net/v/t39.30808-1/504350602_122104897436893339_8375063795311844718_n.jpg?stp=dst-jpg_s240x240_tt6&_nc_cat=103&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeFB39oeP6FIJhuJBwl_cXPaJ1j9k0Q6w1onWP2TRDrDWtG4zxw5wkMZz7SMxO4E1_YY6cWCwmDoXuMZ9xfQ9OYT&_nc_ohc=bzXKj9uhkSoQ7kNvwHu700g&_nc_oc=AdmstQyYYUxB_hlKtIyY6XrN_rNCFZ5GUhSgOnN_rcINSqW4f-M_U6IlelsLeYJouO4&_nc_zt=24&_nc_ht=scontent.fdac198-1.fna&_nc_gid=EAWCkx2DcE05-Ea14-f-_A&oh=00_AfQ6UCwcKMGNM9Cb2CN2Hjo9rMQv_9sYmIax62usFWXTsg&oe=688EC178"
          ></Image>
          <div>
            <h1 className="font-medium pb-1">John Martin</h1>
            <div className="flex gap-1">
              <Star size={15} className="text-orange-500"></Star>
              <Star size={15} className="text-orange-500"></Star>
              <Star size={15} className="text-orange-500"></Star>
              <Star size={15} className="text-orange-500"></Star>
              <Star size={15} className="text-orange-500"></Star>

            </div>
          </div>
        </div>
        <p className="mt-2 text-gray-500">Sarah provided exceptional legal guidance during our company acquisition. Her attention to detail and strategic thinking were invaluable.</p>
     <small className="text-gray-500 pt-2">2 weeks ago</small>
      </div>
    </div>
  );
};

export default ClientReviews;
