"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useWithdrawRequestMutation } from "@/redux/features/earnings/earnings.api";
import { toast } from "react-toastify";
import { Loader2, ExternalLink, AlertCircle } from "lucide-react";

interface WithdrawModalProps {
  currentEarnings: number;
  trigger?: React.ReactNode;
}

export default function WithdrawModal({
  currentEarnings = 0,
  trigger,
}: WithdrawModalProps) {
  const [open, setOpen] = useState(false);
  const [amountStr, setAmountStr] = useState("");
  const [stripeLink, setStripeLink] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [withdrawRequest, { isLoading }] = useWithdrawRequestMutation();

  const handleMax = () => {
    setAmountStr(currentEarnings.toFixed(2));
    setError(null);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setAmountStr("");
      setError(null);
      setStripeLink("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const amount = parseFloat(amountStr);

    if (!amount || isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount greater than $0");
      return;
    }

    if (amount > currentEarnings) {
      setError(
        `Amount exceeds your available balance ($${currentEarnings.toLocaleString()})`
      );
      return;
    }

    try {
      const response: any = await withdrawRequest({ amount });

      if (response?.data?.success || response?.data?.statusCode === 200) {
        toast.success(
          response.data.message || "Withdrawal request submitted successfully"
        );
        handleOpenChange(false);
      } else if (response?.error?.status === 403) {
        setError("Your account is not connected with Stripe payouts.");
        setStripeLink(
          response.error.data?.message || "https://dashboard.stripe.com"
        );
      } else {
        const msg =
          response?.error?.data?.message || "Failed to process withdrawal";
        setError(msg);
        toast.error(msg);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
      toast.error("Failed to request payout");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <button
            type="button"
            disabled={currentEarnings <= 0}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-primary hover:bg-primary/95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Withdraw
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-white rounded-2xl p-6 border border-slate-200 shadow-xl">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-lg font-bold text-slate-900">
            Withdraw Funds
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            Enter the amount to transfer to your connected bank account.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* Available balance preview */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-medium text-slate-600">
              Available Balance
            </span>
            <span className="text-base font-bold text-slate-900">
              ${currentEarnings.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          {/* Amount input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">
                Amount (USD)
              </label>
              <button
                type="button"
                onClick={handleMax}
                disabled={currentEarnings <= 0}
                className="text-xs font-semibold text-primary hover:underline disabled:opacity-40"
              >
                Max
              </button>
            </div>

            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-base">
                $
              </span>
              <input
                type="number"
                step="0.01"
                min="1"
                max={currentEarnings}
                value={amountStr}
                onChange={(e) => {
                  setAmountStr(e.target.value);
                  setError(null);
                }}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-2.5 text-base font-semibold rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 placeholder:text-slate-300"
                required
                autoFocus
              />
            </div>
          </div>

          {/* Error Message */}
          {error && !stripeLink && (
            <p className="text-xs text-rose-600 font-medium">{error}</p>
          )}

          {/* Stripe Connect Link if 403 */}
          {stripeLink && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
              <div className="flex items-start gap-2">
                <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800">
                  Your account is not connected with Stripe. Please complete Stripe setup to receive payouts.
                </p>
              </div>
              <a
                href={stripeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 transition-colors"
              >
                <span>Connect Stripe Account</span>
                <ExternalLink size={13} />
              </a>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              disabled={isLoading}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !amountStr || parseFloat(amountStr) <= 0}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-primary hover:bg-primary/95 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xs"
            >
              {isLoading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Confirm Withdrawal</span>
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
