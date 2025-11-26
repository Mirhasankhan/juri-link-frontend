"use client";

import { CheckCircle, Loader2 } from "lucide-react";
import {
  useCheckoutSessionMutation,
  usePlansQuery,
} from "@/redux/features/subscription/subscription.api";
import Container from "@/utils/Container";

export default function SubscriptionPlans() {
  const { data: response, isLoading } = usePlansQuery("");
  const [subscribe, { isLoading: isCheckoutLoading }] =
    useCheckoutSessionMutation();

  if (isLoading) {
    return <p className="text-center py-20">Loading plans...</p>;
  }

  const plans = response?.data || [];

  const handleSubscribe = async (priceId: string) => {
    try {
      const response = await subscribe({ priceId });
      const url = response?.data?.data?.url;
      if (!url) return;

      window.open(url, "_blank");
    } catch (error) {
      console.error("Subscription failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] py-16 px-4">
      <Container>
        <h1 className="text-4xl text-center font-extrabold text-gray-800 mb-4">
          Choose the Right Plan
        </h1>
        <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
          Get listed, get noticed, and connect with clients faster. Flexible
          plans tailored for legal professionals.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan: any) => (
            <div
              key={plan.priceId}
              className="relative rounded-3xl p-6 h-[450px] shadow-xl cursor-pointer transform transition-all duration-300 bg-white hover:scale-105 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {plan.title}
                </h3>
                <div className="text-primary font-extrabold text-4xl mb-4">
                  ${plan.price}
                  <span className="text-lg font-medium text-gray-500">
                    {plan.type === "Monthly"
                      ? "/month"
                      : plan.type === "Quarterly"
                      ? "/3 months"
                      : "/year"}
                  </span>
                </div>
                <ul className="text-left space-y-3 mb-6">
                  {plan.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleSubscribe(plan.priceId)}
                className="w-full py-3 rounded-xl font-semibold text-white bg-primary hover:bg-blue-600 transition-all text-lg"
              >
                {isCheckoutLoading ? (
                  <Loader2 className="animate-spin"></Loader2>
                ) : (
                  "Buy Plan"
                )}
              </button>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
