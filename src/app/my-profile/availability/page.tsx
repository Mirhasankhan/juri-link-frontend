"use client";

import { useState } from "react";
import dayjs from "dayjs";
import { Plus, Trash2 } from "lucide-react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const DAYS = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday"
];

// Generate 15-minute interval times
const generateTimes = () => {
  const times: string[] = [];
  let hour = 0;

  while (hour < 24) {
    for (let m of [0, 15, 30, 45]) {
      const time = dayjs().hour(hour).minute(m).format("hh:mm A");
      times.push(time);
    }
    hour++;
  }

  return times;
};

const TIME_OPTIONS = generateTimes();

export default function AvailabilityBuilder() {
  const [entries, setEntries] = useState<
    { dayOfWeek: number; slot: { startTime: string; endTime: string } }[]
  >([]);
  const [error, setError] = useState("");

  const addSlot = (day: number) => {
    setEntries([
      ...entries,
      {
        dayOfWeek: day,
        slot: { startTime: "09:00 AM", endTime: "10:00 AM" },
      },
    ]);
    setError("");
  };

  const updateSlot = (
    index: number,
    key: "startTime" | "endTime",
    value: string
  ) => {
    const updated = [...entries];
    updated[index].slot[key] = value;
    setEntries(updated);
    validate(updated);
  };

  const removeSlot = (index: number) => {
    const updated = entries.filter((_, i) => i !== index);
    setEntries(updated);
    validate(updated);
  };

  // Validate overlaps + duplicate
  const validate = (list: typeof entries) => {
    for (let i = 0; i < list.length; i++) {
      const curr = list[i];
      const currStart = dayjs(curr.slot.startTime, "h:mm A");
      const currEnd = dayjs(curr.slot.endTime, "h:mm A");

      for (let j = 0; j < list.length; j++) {
        if (i === j) continue;
        const other = list[j];
        if (other.dayOfWeek !== curr.dayOfWeek) continue;

        const otherStart = dayjs(other.slot.startTime, "h:mm A");
        const otherEnd = dayjs(other.slot.endTime, "h:mm A");

        if (
          curr.slot.startTime === other.slot.startTime &&
          curr.slot.endTime === other.slot.endTime
        ) {
          setError("Duplicate slot detected!");
          return;
        }

        if (currStart.isBefore(otherEnd) && otherStart.isBefore(currEnd)) {
          setError("Overlapping time slots detected!");
          return;
        }
      }
    }
    setError("");
  };

  const canSubmit = () => {
    const daysCovered = new Set(entries.map((e) => e.dayOfWeek));
    return daysCovered.size === 7 && !error;
  };

  const onSubmit = () => {
    const formatted = entries.map(e => ({
      dayOfWeek: e.dayOfWeek,
      slots: [{ ...e.slot }]
    }));

    console.log("FINAL DATA", formatted);
    alert("Check your console");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Provider Availability</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DAYS.map((day, dayIndex) => (
          <div
            key={dayIndex}
            className="p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg">{day}</h3>

              <Plus
                onClick={() => addSlot(dayIndex)}
                className="text-blue-600 cursor-pointer hover:text-blue-800"
                size={22}
              />
            </div>

            {entries.map((entry, index) => {
              if (entry.dayOfWeek !== dayIndex) return null;

              return (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50 mt-2"
                >
                  {/* Start Time */}
                  <Select
                    value={entry.slot.startTime}
                    onValueChange={(val) =>
                      updateSlot(index, "startTime", val)
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Start" />
                    </SelectTrigger>
                    <SelectContent className="max-h-64 overflow-y-auto">
                      {TIME_OPTIONS.map((t) => (
                        <SelectItem value={t} key={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <span className="font-semibold text-gray-600">→</span>

                  {/* End Time */}
                  <Select
                    value={entry.slot.endTime}
                    onValueChange={(val) =>
                      updateSlot(index, "endTime", val)
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="End" />
                    </SelectTrigger>
                    <SelectContent className="max-h-64 overflow-y-auto">
                      {TIME_OPTIONS.map((t) => (
                        <SelectItem value={t} key={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Trash2
                    size={20}
                    className="text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() => removeSlot(index)}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {error && (
        <p className="text-red-600 text-center font-semibold mt-4 text-lg">
          {error}
        </p>
      )}

      <button
        disabled={!canSubmit()}
        onClick={onSubmit}
        className={`mt-6 w-full py-3 rounded-lg text-white text-lg ${
          canSubmit()
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Save Availability
      </button>
    </div>
  );
}
