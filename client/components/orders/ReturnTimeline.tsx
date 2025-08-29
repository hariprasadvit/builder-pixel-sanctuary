import React from "react";
import { CheckCircle, Clock, Package, Truck } from "lucide-react";

interface Step {
  label: string;
  completed?: boolean;
  current?: boolean;
  note?: string;
}

interface ReturnTimelineProps {
  steps: Step[];
}

export default function ReturnTimeline({ steps }: ReturnTimelineProps) {
  return (
    <div className="space-y-3">
      {steps.map((s, i) => (
        <div key={i} className="flex items-start gap-3">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center ${s.completed ? "bg-green-100" : s.current ? "bg-blue-100" : "bg-gray-100"}`}
          >
            {s.completed ? (
              <CheckCircle className="w-4 h-4 text-green-600" />
            ) : (
              <Clock className="w-4 h-4 text-gray-500" />
            )}
          </div>
          <div className="flex-1">
            <p
              className={`text-sm ${s.completed ? "text-gray-900" : s.current ? "text-blue-700" : "text-gray-600"}`}
            >
              {s.label}
            </p>
            {s.note && <p className="text-xs text-gray-500">{s.note}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
