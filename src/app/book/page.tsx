import Container from "@/utils/Container";
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
            <h1 className="font-medium">Book Consulation</h1>
            <p>with sarah johnson</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BookingPage;
