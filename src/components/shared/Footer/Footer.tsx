import { Mail, MapPin, Phone } from "lucide-react";
import footerImg from "../../../assets/footer.avif";
import logo from "../../../assets/logo1.avif";
const Footer = () => {
  return (
    <div
      className="h-full md:h-[650px] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${footerImg.src})` }}
    >
      <div className="bg-[#222a3d] flex flex-col items-center w-full h-full bg-opacity-95 text-white">
        <div className="flex flex-col items-center py-8">
          <div className="flex  items-center gap-1 ">
            <img className="h-16 rounded-full" src={logo.src} alt="GlamVibe logo" />
            <div className="text-white">
              <h1 className="text-2xl font-medium">GlamVibe</h1>
              <p>Spa Beauty</p>
            </div>
          </div>
          <h1 className="py-4 text-xl font-medium">
            Sign Up To Get Latest Updates
          </h1>
          <div className="bg-black bg-opacity-50 p-2">
            <input
              type="text"
              className="bg-black bg-opacity-10 focus:outline-none pr-24"
              placeholder="Your email address...."
            />
            <button className="bg-primary py-3 px-6 rounded-xl text-sm font-medium ">
              Subscribe Now
            </button>
          </div>
        </div>
        <div className="md:flex gap-12 mt-8">
          <div>
            <h1 className="text-xl font-medium pb-3">About Us</h1>
            <p>
              We consistently showed year on year growth and <br /> is now a
              chain of 118+ branches in california and <br /> Northern & Central
              Zone and worldwide.
            </p>
            <p>
              The most innovative products tested & approvby <br /> the greatest
              names in hairdressing.
            </p>
          </div>
          <div>
            <h1 className="text-xl font-medium pb-3">Recent News</h1>
            <div className="flex items-center gap-3">
              <img src={logo.src} className="h-16 rounded-full w-16" alt="" />
              <div>
                <p className="text-sm">January 13, 2020</p>
                <h1>Maintaining Health and Beauty <br /> Through Spas</h1>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <img src={logo.src} className="h-16 rounded-full w-16" alt="" />
              <div>
                <p className="text-sm">January 13, 2020</p>
                <h1>Maintaining Health and Beauty <br /> Through Spas</h1>
              </div>
            </div>
           
          </div>
          <div>
            <h1 className="text-xl font-medium pb-3">Get in touch</h1>
            <div className="flex items-center gap-2 pb-6 border-b">
              <MapPin className="text-primary " />
              <h1>
                4789 Melmorn Street, Zakila Ton <br />
                Mashintron Town
              </h1>
            </div>
            <div className="flex items-center gap-2 py-6 border-b">
              <Mail className="text-primary " />
              <h1>info@example.com</h1>
            </div>
            <div className="flex items-center gap-2 py-6 border-b pt-3">
              <Phone className="text-primary " />
              <h1>(+01) 123 456 7890</h1>
            </div>
          </div>
        </div>
        <h1 className="mt-auto pb-3">
          Copyright © 2025 Hair salone Theme by Mir Hasan
        </h1>
      </div>
    </div>
  );
};

export default Footer;
