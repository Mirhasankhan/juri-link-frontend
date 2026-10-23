"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { generateTimeOptions, timeToMinutes } from "@/utils/isOverlap";
import { FiPlus } from "react-icons/fi";
import { useCreateSlotMutation } from "@/redux/features/availability/availability.api";
import { toast } from "react-toastify";

interface AddSlotModalProps {
  dayOfWeek: number;
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

const AddSlotModal: React.FC<AddSlotModalProps> = ({ dayOfWeek }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [timeOptions, setTimeOptions] = useState<string[]>([]);

  const [addSlot, { isLoading }] = useCreateSlotMutation();

  useEffect(() => {
    setTimeOptions(generateTimeOptions());
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    if (timeOptions.length === 0) return;

    setStart(timeOptions[0]);
    setEnd(timeOptions[1]);
    setError(null);
  }, [isOpen, timeOptions]);

  const handleCreate = async () => {
    setError(null);

    if (timeToMinutes(start) >= timeToMinutes(end)) {
      setError("Start time must be earlier than end time.");
      return;
    }

    const data = {
      slot: {
        dayOfWeek,
        startTime: start,
        endTime: end,
      },
    };

    const response: any = await addSlot(data);

    if (response.data) {
      toast.success(response.data.message || "Slot added successfully");
      setIsOpen(false);
    } else {
      toast.error(response.error?.data?.message || "Failed to add slot");
      setError(response.error?.data?.message || "Failed to add slot");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:text-primary/90 bg-primary/10 hover:bg-primary/15 px-2.5 py-1 rounded-lg transition-colors"
          title={`Add slot for ${dayNames[dayOfWeek]}`}
        >
          <FiPlus size={13} />
          <span>Add</span>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xl">
        <DialogHeader className="text-left">
          <DialogTitle className="text-base sm:text-lg font-bold text-slate-900">
            Add Time Slot
          </DialogTitle>
          <p className="text-xs text-slate-500 mt-0.5">
            Set available consultation hours for{" "}
            <span className="font-semibold text-slate-700">{dayNames[dayOfWeek]}</span>
          </p>
        </DialogHeader>

        <div className="space-y-4 my-2">
          <div className="grid grid-cols-2 gap-3 items-center">
            <div>
              <label className="block text-[11px] font-bold  tracking-wider text-slate-500 mb-1.5">
                Start Time
              </label>
              <select
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              >
                {timeOptions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold  tracking-wider text-slate-500 mb-1.5">
                End Time
              </label>
              <select
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              >
                {timeOptions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <p className="text-xs font-medium text-rose-600 bg-rose-50 border border-rose-200/60 rounded-lg p-2.5">
              {error}
            </p>
          )}
        </div>

        <DialogFooter className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
          <button
            type="button"
            className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>

          <button
            type="button"
            className="px-4 py-2 text-xs font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl shadow-xs transition-colors disabled:opacity-60"
            onClick={handleCreate}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Slot"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSlotModal;
