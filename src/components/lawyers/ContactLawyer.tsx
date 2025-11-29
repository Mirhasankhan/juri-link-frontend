import { GraduationCap, Mail, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNextPlayer } from "reactnextplayer";

const ContactLawyer = ({ lawyer }: { lawyer: any }) => {
  const router = useRouter();
  const handleMessage = () => {
    router.push(`/messages?receiverId=${lawyer._id}`);
  };
  const handleBook = () => {
    router.push(`/book?lawyerId=${lawyer._id}`);
  };

  return (
    <div>
      <div className="w-full mx-auto pb-12">
        <h1 className="text-xl font-medium pb-4">Introduction Video </h1>
        <ReactNextPlayer
          src={
            lawyer?.introVideo ||
            "https://ik.imagekit.io/rfdbp4s3w/Lovable%202.0%20is%20here.%20Multiplayer%20vibe%20coding.%20Smarter%20&%20more%20secure..mp4"
          }
          controls
          autoplay={true}
          muted={false}
          loop={false}
          height={300}
          contextMenu={false}
          className="w-full rounded-2xl"
          color="#ff0000"
          ambientGlow
        />
      </div>
      <div className="border rounded-[6px] ">
        <div className="bg-secondary rounded-t-[5px] text-white py-8 text-center">
          <h1 className="text-5xl font-semibold">${lawyer?.fee}</h1>
          <h1 className="text-2xl font-semibold py-1">Book Consultation</h1>
          <p>Get personalized guidance from our expert</p>
        </div>
        <div className="p-5">
          <button
            onClick={() => handleMessage()}
            className="text-white mt-3 bg-secondary border  w-full py-2 rounded-[8px]  font-medium"
          >
            Send Message
          </button>

          <div className="flex items-center gap-2 pt-6">
            <div className="p-2 bg-blue-100 rounded-full">
              <Mail size={25} className="text-blue-800"></Mail>
            </div>
            <div>
              <small>Email</small>
              <p className="font-medium">{lawyer?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <div className="p-2 bg-blue-100 rounded-full">
              <Phone size={25} className="text-blue-800"></Phone>
            </div>
            <div>
              <small>Phone</small>
              <p className="font-medium">01781654814</p>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <div className="p-2 bg-blue-100 rounded-full">
              <GraduationCap
                size={25}
                className="text-blue-800"
              ></GraduationCap>
            </div>
            <div>
              <small>Institution</small>
              <p className="font-medium">{lawyer?.institute}</p>
            </div>
          </div>

          <button
            onClick={() => handleBook()}
            className="text-secondary mt-3 bg-white border-secondary border  w-full py-2 rounded-[8px]  font-medium"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactLawyer;
