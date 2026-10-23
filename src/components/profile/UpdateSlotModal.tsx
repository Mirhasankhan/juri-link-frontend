"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { generateTimeOptions, timeToMinutes } from "@/utils/isOverlap";
import { useUpdateSlotMutation } from "@/redux/features/availability/availability.api";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";

interface UpdateSlotModalProps {
  slotId: string;
  startTime: string;
  endTime: string;
  dayName?: string;
}

const UpdateSlotModal: React.FC<UpdateSlotModalProps> = ({
  slotId,
  startTime,
  endTime,
  dayName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [timeOptions, setTimeOptions] = useState<string[]>([]);

  const [updateSlot, { isLoading }] = useUpdateSlotMutation();

  // 1) build options once
  useEffect(() => {
    setTimeOptions(generateTimeOptions());
  }, []);

  // helper to normalize an incoming time string to an option in timeOptions
  const normalizeToOption = (value: string) => {
    if (!value || timeOptions.length === 0) return "";
    // exact match first
    const exact = timeOptions.find((t) => t === value);
    if (exact) return exact;

    // match by minutes (handles slightly different formatting)
    try {
      const target = timeToMinutes(value);
      const byMinutes = timeOptions.find((t) => timeToMinutes(t) === target);
      if (byMinutes) return byMinutes;
    } catch {
      /* fallthrough */
    }

    // fallback: leave empty so select will show first option only if needed
    return "";
  };

  // 2) set start/end only after timeOptions available OR when props change
  useEffect(() => {
    if (timeOptions.length === 0) return;
    const normalizedStart = normalizeToOption(startTime);
    const normalizedEnd = normalizeToOption(endTime);

    // if normalization fails (""), fallback to original prop if it's already valid, else first option
    setStart(normalizedStart || startTime || timeOptions[0]);
    setEnd(normalizedEnd || endTime || timeOptions[0]);
    setError(null);
  }, [timeOptions, startTime, endTime]);

  // 3) when opening the dialog, make sure we reset to the (normalized) defaults
  useEffect(() => {
    if (!isOpen) return;
    if (timeOptions.length === 0) return; // options not ready yet
    const normalizedStart = normalizeToOption(startTime);
    const normalizedEnd = normalizeToOption(endTime);
    setStart(normalizedStart || startTime || timeOptions[0]);
    setEnd(normalizedEnd || endTime || timeOptions[0]);
    setError(null);
  }, [isOpen, timeOptions, startTime, endTime]);

  // change detection
  const isChanged = useMemo(() => {
    return start !== startTime || end !== endTime;
  }, [start, end, startTime, endTime]);

  const handleUpdate = async () => {
    setError(null);

    if (timeToMinutes(start) >= timeToMinutes(end)) {
      setError("Start time must be earlier than end time");
      return;
    }

    const payload = { slotId, slot: { startTime: start, endTime: end } };
    const response: any = await updateSlot(payload);
    if (response.data) {
      toast.success(response.data.message || "Slot updated successfully");
      setIsOpen(false);
    } else {
      setError(response.error?.data?.message || "Update failed");
      toast.error(response?.error?.data?.message || "Update failed");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="text-slate-400 hover:text-primary hover:bg-primary/10 p-1 rounded-md transition-colors"
          title="Edit slot"
        >
          <FiEdit size={13} />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xl">
        <DialogHeader className="text-left">
          <DialogTitle className="text-base sm:text-lg font-bold text-slate-900">
            Edit Time Slot
          </DialogTitle>
          <p className="text-xs text-slate-500 mt-0.5">
            {dayName ? (
              <>
                Update consultation hours for{" "}
                <span className="font-semibold text-slate-700">{dayName}</span>
              </>
            ) : (
              "Update consultation start and end time"
            )}
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
            className="px-4 py-2 text-xs font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl shadow-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleUpdate}
            disabled={isLoading || !isChanged}
          >
            {isLoading ? "Updating..." : "Update Slot"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSlotModal;
