import profielImage from "../../assets/expert2.jpg";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const Reviews = ({ service }: { service: any }) => {
  return (
    <div>
      {service?.result?.review?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {service?.result?.review?.map((ser: any) => (
            <div className="bg-white p-2 rounded-xl" key={ser.id}>
              <div className=" flex mt-2 justify-between items-center">
                <div className="flex gap-1 items-center">
                  <img
                    className="rounded-full h-8 w-8"
                    src={ser.user.profileImage || profielImage}
                  
                    alt=""
                  />
                  <h1 className="text-xl font-medium">{ser?.user?.username}</h1>
                </div>
                 <Rating style={{ maxWidth: 100 }} value={ser.rating} />
              </div>
              <h1 className="py-1">{ser.comment}</h1>
              <small>6 July, 2025</small>
            </div>
          ))}
        </div>
      ) : (
        "no review found"
      )}
    </div>
  );
};

export default Reviews;
