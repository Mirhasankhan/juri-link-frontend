import Container from "@/utils/Container";
import logo from "../../../assets/logo1.avif";
import NavMenu from "./NavMenu";
import SmallDeviceMenu from "./SmallDeviceMenu";
import Link from "next/link";

const Header = () => {
  return (
    <div className="bg-white">
      <Container>
        <div className="flex justify-between items-center py-2">
          <Link href="/" className="flex items-center gap-1">
            <img
              className="h-16 w-16 rounded-full"
              src={logo.src}
              alt="GlamVibe logo"
            />
            <div className="dark:text-black">
              <h1
                style={{
                  fontFamily: "'Satisfy', cursive",
                }}
                className="text-2xl font-medium"
              >
                Glam<span className="text-primary">Vibe</span>
              </h1>
              <p className="text-gray-600 font-medium text-sm">Spa Beauty</p>
            </div>
          </Link>

          <div>
            <NavMenu></NavMenu>
            <SmallDeviceMenu></SmallDeviceMenu>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
