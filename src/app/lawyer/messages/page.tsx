"use client";

import { Suspense } from "react";
import { ChatContent } from "@/components/message/ChatContent";
import { Loader2 } from "lucide-react";

export default function LawyerMessagesPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center flex flex-col items-center justify-center">
          <Loader2 size={36} className="text-primary animate-spin mb-3" />
          <p className="text-xs text-slate-500">Loading client messages...</p>
        </div>
      }
    >
      <div className="max-w-7xl mx-auto">
        <ChatContent />
      </div>
    </Suspense>
  );
}
