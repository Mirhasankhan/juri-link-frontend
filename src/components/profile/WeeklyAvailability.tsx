"use client";
import { useSetAvailabilityMutation } from "@/redux/features/availability/availability.api";
import {
  generateTimeOptions,
  isOverlap,
  timeToMinutes,
} from "@/utils/isOverlap";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const WeeklyAvailabilityPage = () => {
  const [createAvailability, { isLoading }] = useSetAvailabilityMutation();

  const [availability, setAvailability] = useState<
    Record<
      string,
      {
        active: boolean;
        slots: { start: string; end: string; error?: string }[];
      }
    >
  >({});
  const [timeOptions, setTimeOptions] = useState<string[]>([]);

  useEffect(() => {
    setTimeOptions(generateTimeOptions());

    const init: any = {};
    days.forEach((d) => {
      init[d] = { active: true, slots: [{ start: "9:00 AM", end: "5:00 PM" }] };
    });
    setAvailability(init);
  }, []);

  const updateSlot = (
    day: string,
    idx: number,
    field: "start" | "end",
    value: string
  ) => {
    setAvailability((prev) => {
      const updated = { ...prev };
      updated[day] = { ...updated[day], slots: [...updated[day].slots] };
      updated[day].slots[idx] = { ...updated[day].slots[idx], [field]: value };

      // Validate this slot
      const slot = updated[day].slots[idx];
      if (timeToMinutes(slot.start) >= timeToMinutes(slot.end)) {
        updated[day].slots[idx].error =
          "Start time must be earlier than end time";
      } else {
        updated[day].slots[idx].error = undefined;
      }

      // Validate conflicts
      for (let i = 0; i < updated[day].slots.length; i++) {
        const s1: any = updated[day].slots[i];
        s1.errorConflict = undefined; // reset
        for (let j = 0; j < updated[day].slots.length; j++) {
          if (i === j) continue; // skip itself
          const s2 = updated[day].slots[j];
          if (isOverlap(s1.start, s1.end, s2.start, s2.end)) {
            s1.errorConflict = "This slot conflicts with another slot";
            break; // no need to check further
          }
        }
      }

      return updated;
    });
  };

  const addSlot = (day: string) => {
    setAvailability((prev) => {
      const updated = { ...prev };
      updated[day] = { ...updated[day], slots: [...updated[day].slots] };
      updated[day].slots.push({ start: "6:00 PM", end: "8:00 PM" });
      return updated;
    });
  };

  const removeSlot = (day: string, idx: number) => {
    setAvailability((prev) => {
      const updated = { ...prev };
      updated[day] = { ...updated[day], slots: [...updated[day].slots] };
      updated[day].slots.splice(idx, 1);
      return updated;
    });
  };

  const toggleDay = (day: string) => {
    setAvailability((prev) => {
      const updated = { ...prev };
      updated[day] = { ...updated[day] };
      updated[day].active = !updated[day].active;
      return updated;
    });
  };

  const validateSlots = () => {
    for (const d of days) {
      const obj: any = availability[d];
      if (!obj.active) continue;
      for (const slot of obj.slots) {
        if (!slot.start || !slot.end || slot.error || slot.errorConflict)
          return false;
      }
    }
    return true;
  };

  const isSubmitDisabled =
    Object.keys(availability).length === 0 || !validateSlots();

  const handleSubmit = async () => {
    const formatted = Object.entries(availability).flatMap(
      ([dayName, data]) => {
        if (!data.active) return [];
        const dayIndex = days.indexOf(dayName);
        return data.slots.map((slot) => ({
          dayOfWeek: dayIndex,
          slots: [{ startTime: slot.start, endTime: slot.end }],
        }));
      }
    );

    
    const data = { availability: formatted };  
    const response = await createAvailability(data);
    if(response.data){
      toast.success(response.data.message)
    }
  };

  if (Object.keys(availability).length === 0 || timeOptions.length === 0)
    return null;

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-900">Set Initial Weekly Availability</h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Configure your working days and default consultation hours to activate your calendar
        </p>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
        {days.map((day) => (
          <div
            key={day}
            className={`p-4 rounded-xl border transition-all ${
              availability[day]?.active
                ? "bg-white border-slate-200/90 shadow-2xs"
                : "bg-slate-50/60 border-slate-200/50 opacity-70"
            }`}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-bold text-slate-900">{day}</h3>
              <label className="cursor-pointer flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">
                  {availability[day]?.active ? "Available" : "Off"}
                </span>
                <input
                  type="checkbox"
                  checked={availability[day]?.active || false}
                  onChange={() => toggleDay(day)}
                  className="accent-primary w-4 h-4 rounded cursor-pointer"
                />
              </label>
            </div>

            {availability[day]?.active &&
              availability[day].slots.map((slot: any, idx) => (
                <div key={idx} className="mb-2.5">
                  <div className="flex gap-2 items-center">
                    <select
                      value={slot.start}
                      onChange={(e) =>
                        updateSlot(day, idx, "start", e.target.value)
                      }
                      className="bg-slate-50 text-slate-800 text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
                    >
                      {timeOptions.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>

                    <span className="text-xs text-slate-400 font-medium">—</span>

                    <select
                      value={slot.end}
                      onChange={(e) =>
                        updateSlot(day, idx, "end", e.target.value)
                      }
                      className="bg-slate-50 text-slate-800 text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
                    >
                      {timeOptions.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>

                    {idx > 0 && (
                      <button
                        type="button"
                        onClick={() => removeSlot(day, idx)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors text-xs"
                        title="Remove time slot"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Error messages */}
                  {slot.error && (
                    <p className="text-rose-600 text-[11px] mt-1 font-medium">{slot.error}</p>
                  )}
                  {slot.errorConflict && (
                    <p className="text-rose-600 text-[11px] mt-1 font-medium">{slot.errorConflict}</p>
                  )}
                </div>
              ))}

            {availability[day]?.active && (
              <button
                type="button"
                onClick={() => addSlot(day)}
                className="text-primary hover:text-primary/80 text-xs font-semibold mt-1 inline-flex items-center gap-1"
              >
                + Add Time Window
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="pt-2">
        <button
          type="button"
          disabled={isSubmitDisabled || isLoading}
          onClick={handleSubmit}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm text-white font-semibold bg-primary shadow-xs transition-all ${
            isSubmitDisabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-primary/90"
          }`}
        >
          {isLoading ? "Saving Availability..." : "Save & Activate Schedule"}
        </button>
      </div>
    </div>
  );
};

export default WeeklyAvailabilityPage;
