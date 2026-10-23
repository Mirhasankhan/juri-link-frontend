"use client";

import { CheckCircle, Loader2 } from "lucide-react";
import {
  useCheckoutSessionMutation,
  usePlansQuery,
} from "@/redux/features/subscription/subscription.api";
import { useState } from "react";
import { SkeletonCard } from "@/components/shared/Skeleton";

export default function LawyerPremiumPage() {
  const { data: response, isLoading } = usePlansQuery("");
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);
  const [subscribe, { isLoading: isCheckoutLoading }] =
    useCheckoutSessionMutation();

  const plans = response?.data || [];

  // Find if lawyer already has an active subscription
  const activePlan = plans.find((p: any) => p.userSubscription !== null);

  const handleSubscribe = async (priceId: string) => {
    try {
      setLoadingPriceId(priceId);
      const res: any = await subscribe({ priceId });
      const url = res?.data?.data?.url || res?.data?.url;
      if (url) window.open(url, "_blank");
    } catch (error) {
      console.error("Subscription failed:", error);
    } finally {
      setLoadingPriceId(null);
    }
  };

  const handleCancel = async (subscriptionPayId: string) => {
    console.log("Cancel subscription:", subscriptionPayId);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              Premium Membership
            </h1>
            {activePlan && (
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                Active: {activePlan.title}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Upgrade your plan to boost profile visibility, access verified badges, and reach more clients
          </p>
        </div>
      </div>

      {/* Plans Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, idx) => (
            <SkeletonCard height={420} key={idx} />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan: any) => {
            const isSubscribed = plan.userSubscription !== null;
            const disableBuy = activePlan && !isSubscribed;

            return (
              <div
                key={plan.priceId}
                className={`
                  relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between
                  transition-all duration-200 border
                  ${isSubscribed
                    ? "bg-white border-2 border-primary shadow-xs"
                    : "bg-white border-slate-200/90 shadow-xs hover:border-slate-300"
                  }
                `}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-900">
                      {plan.title}
                    </h3>
                    {isSubscribed && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-semibold text-xs">
                        Current Plan
                      </span>
                    )}
                  </div>

                  <div className="mb-6">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                      ${plan.price}
                    </span>
                    <span className="text-sm font-medium text-slate-500 ml-1.5">
                      {plan.type === "Monthly"
                        ? "/month"
                        : plan.type === "Quarterly"
                          ? "/quarter"
                          : "/year"}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features?.map((feature: string, idx: number) => (
                      <li
                        key={idx}
                        className="flex items-start text-xs sm:text-sm text-slate-700"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 mr-2.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  {isSubscribed ? (
                    <button
                      onClick={() =>
                        handleCancel(plan.userSubscription.subscriptionPayId)
                      }
                      className="w-full py-3 rounded-xl font-semibold text-xs sm:text-sm text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
                    >
                      Cancel Subscription
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSubscribe(plan.priceId)}
                      disabled={disableBuy || isCheckoutLoading}
                      className={`
                        w-full py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-150 flex items-center justify-center gap-2
                        ${disableBuy
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                          : "bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20 active:scale-95"
                        }
                      `}
                    >
                      {loadingPriceId === plan.priceId ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <span>Choose {plan.title}</span>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
