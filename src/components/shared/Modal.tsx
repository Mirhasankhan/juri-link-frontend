'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

export default function StripeConnectModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const handleConnect = () => {
    // Redirect to your Stripe Connect endpoint
    window.location.href = "/api/stripe/connect";
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle>Connect Your Account to Get Paid</DialogTitle>
          <DialogDescription>
            Link your Stripe account to start receiving payments directly from clients.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 bg-white text-sm text-muted-foreground py-2">
          <ul className="list-disc list-inside">
            <li>Receive instant payouts</li>
            <li>Access detailed payment history</li>
            <li>Secure and compliant setup via Stripe</li>
          </ul>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2 pt-4">
          <button  className="w-full sm:w-auto" onClick={handleConnect}>
            Connect Stripe Account
          </button>
          <button  className="w-full sm:w-auto" onClick={onClose}>
            Skip for Now
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
