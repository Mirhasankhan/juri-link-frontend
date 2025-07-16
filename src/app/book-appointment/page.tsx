
"use client"
import  { useState } from 'react';
import { Check, Calendar, User, FileText, Grid3X3 } from 'lucide-react';
import CategoriesStep from '@/components/booking/CategoriesStep';
import ServicesStep from '@/components/booking/ServicesStep';
import DateTimeStep from '@/components/booking/DateTimeStep';
import UserDetailsStep from '@/components/booking/UserDetailsStep';
import SummaryStep from '@/components/booking/SummaryStep';


interface BookingData {
  category: string;
  service: string;
  date: string;
  timeSlot: string;
  userName: string;
  userEmail: string;
  phone: string;
  price: number;
}

const BookAppointment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    category: '',
    service: '',
    date: '',
    timeSlot: '',
    userName: '',
    userEmail: '',
    phone: '',
    price: 0
  });

  const steps = [
    { id: 1, title: 'Categories', icon: Grid3X3, description: 'Choose category' },
    { id: 2, title: 'Services', icon: FileText, description: 'Select service' },
    { id: 3, title: 'Date & Time', icon: Calendar, description: 'Pick date & slot' },
    { id: 4, title: 'Your Details', icon: User, description: 'Personal info' },
    { id: 5, title: 'Summary', icon: Check, description: 'Confirm booking' }
  ];

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const updateBookingData = (newData: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...newData }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <CategoriesStep onNext={nextStep} onSelect={(category) => updateBookingData({ category })} />;
      case 2:
        return <ServicesStep category={bookingData.category} onNext={nextStep} onSelect={(service, price) => updateBookingData({ service, price })} />;
      case 3:
        return <DateTimeStep onNext={nextStep} onSelect={(date, timeSlot) => updateBookingData({ date, timeSlot })} />;
      case 4:
        return <UserDetailsStep onNext={nextStep} onSubmit={(userDetails) => updateBookingData(userDetails)} />;
      case 5:
        return <SummaryStep bookingData={bookingData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 p-2 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Book Your Appointment</h1>
          <p className="text-gray-600 text-lg">Follow the simple steps to schedule your service</p>
        </div>
        
        <div className="md:flex gap-8 max-w-6xl mx-auto">
          {/* Sidebar Navigation */}
          <div className="w-full mb-6 md:w-80 bg-white rounded-2xl shadow-xl p-6 h-fit md:sticky top-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Booking Steps</h2>
            <div className="space-y-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                const isAccessible = currentStep >= step.id;
                
                return (
                  <div
                    key={step.id}
                    className={`relative flex items-center p-4 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-primary text-white shadow-lg transform scale-105' 
                        : isCompleted
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : isAccessible
                        ? 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        : 'bg-gray-50 text-gray-400'
                    }`}
                  >
                    {/* Step Number/Icon */}
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full mr-4 ${
                      isActive 
                        ? 'bg-white/20' 
                        : isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-white shadow-sm'
                    }`}>
                      {isCompleted ? (
                        <Check size={20} />
                      ) : (
                        <Icon size={20} className={isActive ? 'text-white' : 'text-gray-600'} />
                      )}
                    </div>
                    
                    {/* Step Info */}
                    <div className="flex-1">
                      <h3 className={`font-semibold ${isActive ? 'text-white' : ''}`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm ${
                        isActive ? 'text-white/80' : isCompleted ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                    
                    {/* Connection Line */}
                    {index < steps.length - 1 && (
                      <div className={`absolute left-10 top-16 w-0.5 h-8 ${
                        currentStep > step.id ? 'bg-green-300' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-2xl shadow-xl p-3 md:p-8">
            <div className="animate-fade-in">
              {renderStepContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;