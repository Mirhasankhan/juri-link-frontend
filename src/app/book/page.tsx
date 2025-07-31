import Container from "@/utils/Container";
import { Calendar, Clock, Video } from "lucide-react";
import Image from "next/image";

const BookingPage = () => {
  return (
    <div className="bg-gradient-to-br from-purple-50 p-2 via-blue-50 to-indigo-100 ">
      <Container>
        <div className="flex items-center gap-1">
          <Image
            alt=""
            height={200}
            width={700}
            className="border-2 h-16 w-16 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1682687220795-796d3f6f7000?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D"
          ></Image>
          <div>
            <h1 className="font-medium text-primary">Book Consulation</h1>
            <small>with sarah johnson</small>
          </div>
        </div>
        <div className="grid grid-cols-3 my-6 gap-6">
          <div className="col-span-2">
            <div className="border bg-white p-6 rounded-[6px]">
              <div className="flex items-center gap-1">
                <Calendar className="text-primary"></Calendar>
                <p className="font-medium">Select a date</p>
              </div>
              <input
                className="w-full border rounded-[4px] mt-2 p-1"
                placeholder="pick a date
              "
                type="date"
                name=""
                id=""
              />
            </div>
            <div className="border mt-4 bg-white p-6 rounded-[6px]">
              <div className="flex items-center pb-2 gap-1">
                <Clock className="text-primary"></Clock>
                <p className="font-medium">Select time</p>
              </div>
              <div className="grid grid-cols-3 gap-5">
                <h1 className="border w-full text-center font-medium py-1 rounded-[4px]">
                  10 AM
                </h1>
                <h1 className="border w-full text-center font-medium py-1 rounded-[4px]">
                  10 AM
                </h1>
                <h1 className="border w-full text-center font-medium py-1 rounded-[4px]">
                  10 AM
                </h1>
                <h1 className="border w-full text-center font-medium py-1 rounded-[4px]">
                  10 AM
                </h1>
                <h1 className="border w-full text-center font-medium py-1 rounded-[4px]">
                  10 AM
                </h1>
                <h1 className="border w-full text-center font-medium py-1 rounded-[4px]">
                  10 AM
                </h1>
              </div>
            </div>
            <div className="border mt-4 bg-white p-6 rounded-[6px]">
              <h1 className="font-medium pb-2">Consultation Type</h1>
              <div className="flex gap-5">
                <div className="flex border items-center w-full p-3 gap-2">
                  <input
                    className="border rounded-full"
                    type="checkbox"
                    name=""
                    id=""
                  />
                  <Video className="text-primary rotate-360"></Video>
                  <div>
                    <div className="flex flex-col leading-none">
                      <p className="font-medium m-0 p-0">Online</p>
                      <small className="text-gray-500 m-0 p-0">
                        video call Consultation
                      </small>
                    </div>
                  </div>
                </div>
                <div className="flex border items-center w-full p-3 gap-2">
                  <input
                    className="border rounded-full"
                    type="checkbox"
                    name=""
                    id=""
                  />
                  <Video className="text-primary rotate-360"></Video>
                  <div>
                    <div className="flex flex-col leading-none">
                      <p className="font-medium m-0 p-0">In Person</p>
                      <small className="text-gray-500 m-0 p-0">
                        offline visit
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border mt-4 bg-white p-6 rounded-[6px]">
              <h1 className="font-medium pb-2">Select area of law</h1>
              <select className="w-full p-2 rounded-[4px] border" name="" id="">
                <option value="">Family Law</option>
                <option value="">Corporate Law</option>
                <option value="">Business Law</option>
              </select>
            </div>
            <div className="border mt-4 bg-white p-6 rounded-[6px]">
              <h1 className="font-medium pb-4">Your Information</h1>
              <div className="flex gap-4">
                <input
                  placeholder="enter your name"
                  className="input-design"
                  type="text"
                />
                <input
                  placeholder="enter your email"
                  className="input-design"
                  type="email"
                />
              </div>
              <input
                placeholder="enter your phone"
                className="input-design mt-2"
                type="number"
              />
              <textarea
                placeholder="give a brief of your requirement"
                className="input-design mt-2"
                name=""
                id=""
              ></textarea>
            </div>
          </div>

          <div className="col-span-1 sticky top-8 max-h-80 bg-red-950">sdfds</div>
        </div>
      </Container>
    </div>
  );
};

export default BookingPage;
