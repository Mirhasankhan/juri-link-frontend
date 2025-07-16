"use client";

import { useMyBookingsQuery } from "@/redux/features/bookings/bookingsApi";
import { TService } from "@/types/common";
import Loading from "./Loading";

const Completed = () => {
  const { data, isLoading } = useMyBookingsQuery("");
  const completed = data?.result?.filter(
    (booking: { status: string }) => booking.status == "COMPLETED"
  );

  return (
    <div className="border p-6 mt-6 rounded-xl">
      <h1 className="font-medium">Completed Appointments</h1>
      <p className="pb-4 text-sm">Your appointment history</p>
      <div>
        {completed?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completed?.map((c: TService) => (
              <div
                className="border rounded-xl p-4 flex justify-between"
                key={c.id}
              >
                <div>
                  <h1 className="font-medium">{c.service.serviceName}</h1>
                  <p>{c.date}</p>
                  <h1 className="pt-6 font-medium">Start Time:</h1>
                  <p>{c.startTime}</p>
                </div>
                <div>
                  <h1 className="border py-1 px-3 text-xs rounded-full">
                    {c.status}
                  </h1>
                  <h1 className="pt-8 font-medium">Fee</h1>
                  <p className="font-medium text-primary">{c.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>{isLoading ? <Loading></Loading> : "No Completed Bookings Found"}</>
        )}
      </div>
    </div>
  );
};

export default Completed;
