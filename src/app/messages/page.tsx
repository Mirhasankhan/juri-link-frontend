"use client";

import { Suspense } from "react";
import { ChatContent } from "@/components/message/ChatContent";
import { Loader2 } from "lucide-react";

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto my-6 p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 size={36} className="text-primary animate-spin mb-3" />
          <p className="text-slate-500 text-sm">Loading messages...</p>
        </div>
      }
    >
      <div className="max-w-7xl mx-auto my-2 md:my-5 px-2 sm:px-4">
        <ChatContent />
      </div>
    </Suspense>
  );
}
