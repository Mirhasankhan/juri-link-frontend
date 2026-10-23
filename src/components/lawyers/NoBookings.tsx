import { Calendar, Users, Clock } from "lucide-react";


const NoBookings = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] px-4">
      {/* Animated Icon Container */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
        <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-full shadow-lg">
          <Calendar size={80} className="text-blue-600" strokeWidth={1.5} />
        </div>      
      </div>

      {/* Main Content */}
      <div className="text-center max-w-md space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Your Schedule is Clear
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          No upcoming consultations at the moment. Your calendar is ready for
          new appointments!
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 gap-4 mt-10 mb-8 max-w-2xl w-full">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-[8px]">
              <Users size={24} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">
                Connect with Clients
              </h3>
              <p className="text-sm text-gray-600">
                Build your client base and grow your practice
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3">
            <div className="bg-purple-100 p-2 rounded-[8px]">
              <Clock size={24} className="text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">
                Flexible Scheduling
              </h3>
              <p className="text-sm text-gray-600">
                Manage your time on your own terms
              </p>
            </div>
          </div>
        </div>
      </div>

  

      {/* Bottom Hint */}
      <p className="text-sm text-gray-500 mt-8 text-center">
        💡 Tip: Keep your availability updated to receive more bookings
      </p>
    </div>
  );
};

export default NoBookings;
