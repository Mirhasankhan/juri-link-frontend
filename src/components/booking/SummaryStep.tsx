"use client";
import { useCreateBookingMutation } from "@/redux/features/bookings/bookingsApi";
import { BookingData } from "@/types/common";
import {
  Check,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  DollarSign,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface SummaryStepProps {
  bookingData: BookingData;
}

const SummaryStep: React.FC<SummaryStepProps> = ({ bookingData }) => {
  const router = useRouter();
  const [createBooking, { isLoading }] = useCreateBookingMutation();
  const handleConfirmBooking = async () => {
    const boking = {
      serviceId: bookingData?.service,
      price: bookingData?.price,
      date: bookingData?.date,
      startTime: bookingData?.timeSlot,
      phone: bookingData?.phone,
    };
    const response :any= await createBooking(boking);
    if (response.data) {
      router.push("/");
      toast.success("Booking Confirmed");
    }
    else if (response.error) {
        toast.error(response.error.data.message);
      }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="text-green-600" size={32} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Booking Summary
        </h2>
        <p className="text-gray-600">
          Please review your appointment details before confirming
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-3 md:p-8 space-y-6">
        <div className="bg-white rounded-xl p-2 md:p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Service Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Category</p>
              <p className="font-medium text-gray-800">Category Asbe</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Service</p>
              <p className="font-medium text-gray-800">Service Asbe</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl md:p-6 p-2 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Date & Time
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="text-blue-600" size={20} />
              <div>
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-medium text-gray-800">
                  {formatDate(bookingData.date)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="text-blue-600" size={20} />
              <div>
                <p className="text-sm text-gray-600">Time</p>
                <p className="font-medium text-gray-800">
                  {bookingData.timeSlot}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl md:p-6 p-2 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Contact Information
          </h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <User className="text-blue-600" size={20} />
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium text-gray-800">
                  {bookingData.userName}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-blue-600" size={20} />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-800">
                  {bookingData.userEmail}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-blue-600" size={20} />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium text-gray-800">{bookingData.phone}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl md:p-6 p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DollarSign className="text-green-600" size={24} />
              <span className="text-lg font-semibold text-gray-800">
                Total Amount
              </span>
            </div>
            <span className="text-2xl font-bold text-green-600">
              ${bookingData.price}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <button
          onClick={handleConfirmBooking}
          className="w-full bg-primary py-3 rounded-full text-white"
        >
          {isLoading ? (
            <Loader2 className="animate-spin mx-auto"></Loader2>
          ) : (
            "Confirm Booking"
          )}
        </button>
      </div>

      {/* <div className="text-center text-sm text-gray-500 pt-4">
        <p>
          By confirming this booking, you agree to our terms and conditions.
        </p>
        <p>You will receive a confirmation email with appointment details.</p>
      </div> */}
    </div>
  );
};

export default SummaryStep;
