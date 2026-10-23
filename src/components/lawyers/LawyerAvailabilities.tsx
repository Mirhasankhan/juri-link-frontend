import {
  useAvailabilitySlotsQuery,
  useDeleteSlotMutation,
} from "@/redux/features/availability/availability.api";
import { Loader, Clock } from "lucide-react";
import React, { useState, useMemo } from "react";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import UpdateSlotModal from "../profile/UpdateSlotModal";
import AddSlotModal from "../profile/AddNewSlotModal";
import { SkeletonCard } from "../shared/Skeleton";

interface Slot {
  id: string;
  startTime: string;
  endTime: string;
}

interface DayAvailability {
  dayOfWeek: number;
  slots: Slot[];
}

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const LawyerAvailabilities: React.FC = () => {
  const { data: availabilitySlots, isLoading } = useAvailabilitySlotsQuery("");
  const [deleteSlot] = useDeleteSlotMutation();
  const [deletingSlotId, setDeletingSlotId] = useState<string | null>(null);

  const availability: DayAvailability[] = availabilitySlots?.data || [];

  const mergedAvailability: Record<number, Slot[]> = useMemo(() => {
    const map: Record<number, Slot[]> = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
    };
    availability.forEach((curr) => {
      if (!map[curr.dayOfWeek]) map[curr.dayOfWeek] = [];
      map[curr.dayOfWeek].push(...curr.slots);
    });
    return map;
  }, [availability]);


  const handleDelete = async (slotId: string) => {
    setDeletingSlotId(slotId);
    try {
      const response: any = await deleteSlot(slotId);
      if (response?.data) {
        toast.success(response.data.message || "Slot deleted successfully");
      } else {
        toast.error(response?.error?.message || "Failed to delete slot");
      }
    } catch {
      toast.error("Failed to delete slot");
    } finally {
      setDeletingSlotId(null);
    }
  };

  return (
    <div className="space-y-4">


      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4.5">
          {Array.from({ length: 6 }).map((_, idx) => (
            <SkeletonCard height={160} key={idx} />
          ))}
        </div>
      )}

      {/* 7 Days Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
          const slots = mergedAvailability[dayIndex] || [];
          const hasSlots = slots.length > 0;

          return (
            <div
              key={dayIndex}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between transition-all hover:border-slate-300 hover:shadow-sm"
            >
              <div>
                <div className="flex justify-between items-center pb-3 mb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">
                      {dayNames[dayIndex]}
                    </h3>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        hasSlots
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {hasSlots
                        ? `${slots.length} ${slots.length === 1 ? "slot" : "slots"}`
                        : "Off"}
                    </span>
                  </div>

                  <AddSlotModal dayOfWeek={dayIndex} />
                </div>

                <div className="space-y-2">
                  {slots.map((slot) => (
                    <div
                      key={slot.id}
                      className="group flex justify-between items-center bg-slate-50/80 hover:bg-white border border-slate-200/70 hover:border-slate-300 text-slate-800 font-medium px-3.5 py-2.5 rounded-xl text-xs transition-all shadow-2xs"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Clock size={13} className="text-primary shrink-0" />
                        <span className="font-semibold text-slate-900 truncate">
                          {slot.startTime} – {slot.endTime}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                        <UpdateSlotModal
                          slotId={slot.id}
                          startTime={slot.startTime}
                          endTime={slot.endTime}
                          dayName={dayNames[dayIndex]}
                        />
                        {deletingSlotId === slot.id ? (
                          <Loader className="animate-spin text-slate-400 w-3.5 h-3.5" />
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleDelete(slot.id)}
                            className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 p-1 rounded-md transition-colors"
                            title="Delete slot"
                          >
                            <FiTrash2 size={13} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {!hasSlots && (
                    <div className="py-6 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50/40 flex flex-col items-center justify-center">
                      <p className="text-xs text-slate-400 font-medium">
                        No active time slots
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LawyerAvailabilities;
