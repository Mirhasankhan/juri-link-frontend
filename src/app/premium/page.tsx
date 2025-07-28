"use client";
import { useState } from "react";
import { CheckCircle, Star, XCircle } from "lucide-react";

const plans = [
  {
    id: "monthly",
    name: "Monthly",
    price: "$19",
    duration: "/month",
    features: [
      "Lawyer profile on Juri.Link",
      "Client booking system",
      "Basic email support",
    ],
  },
  {
    id: "quarterly",
    name: "Quarterly",
    price: "$49",
    duration: "/3 months",
    features: [
      "Everything in Monthly",
      "Priority search listing",
      "Calendar sync",
    ],
  },
  {
    id: "yearly",
    name: "Yearly",
    price: "$169",
    duration: "/year",
    features: [
      "Everything in Quarterly",
      "Featured on homepage",
      "Dedicated legal support",
    ],
    recommended: true,
  },
];

export default function SubscriptionPlans() {
  const [active, setActive] = useState("monthly");
  const [subscriptionActive, setSubscriptionActive] = useState(true); // track active sub status

  const cancelSubscription = () => {
    // Simulate canceling logic
    setSubscriptionActive(false);
    alert("Subscription has been canceled.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Choose the Right Plan</h1>
        <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
          Get listed, get noticed, and connect with clients faster. Flexible plans tailored for legal professionals.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => {
            const isActive = active === plan.id && subscriptionActive;

            return (
              <div
                key={plan.id}
                onClick={() => {
                  setActive(plan.id);
                  setSubscriptionActive(true);
                }}
                className={`relative rounded-3xl p-6 h-[450px] shadow-xl cursor-pointer transform transition-all duration-300 flex flex-col justify-between
                  ${
                    isActive
                      ? "bg-white scale-105 border-2 border-primary"
                      : "bg-gray-100 hover:scale-105"
                  }`}
              >
                {plan.recommended && (
                  <div className="absolute top-3 right-3 text-xs bg-gradient-to-r from-primary to-purple-600 text-white px-3 py-1 rounded-full font-semibold shadow">
                    <Star size={14} className="inline-block mr-1 mb-0.5" />
                    Recommended
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                  <div className="text-primary font-extrabold text-4xl mb-4">
                    {plan.price}
                    <span className="text-lg font-medium text-gray-500">{plan.duration}</span>
                  </div>
                  <ul className="text-left space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto space-y-3">
                  <button
                    className={`w-full py-2 rounded-xl font-semibold tracking-wide text-lg transition-all ${
                      isActive
                        ? "bg-primary text-white"
                        : "bg-white text-primary border border-blue-500 hover:bg-blue-50"
                    }`}
                  >
                    {isActive ? "Active Plan" : "Choose Plan"}
                  </button>

                  {isActive && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        cancelSubscription();
                      }}
                      className="flex items-center justify-center gap-2 w-full py-2 rounded-xl font-medium text-red-600 border border-red-400 bg-red-50 hover:bg-red-100 transition-all"
                    >
                      <XCircle className="w-5 h-5" />
                      Cancel Subscription
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
