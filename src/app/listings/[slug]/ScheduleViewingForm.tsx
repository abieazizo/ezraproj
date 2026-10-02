"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const viewingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number")
    .regex(/^[+]?[\d\s()-]+$/, "Please enter a valid phone number"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  message: z.string().optional(),
});

type ViewingFormData = z.infer<typeof viewingSchema>;

const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
];

interface ScheduleViewingFormProps {
  propertyTitle: string;
}

export default function ScheduleViewingForm({
  propertyTitle,
}: ScheduleViewingFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ViewingFormData>({
    resolver: zodResolver(viewingSchema),
  });

  const onSubmit = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitted(true);
  };

  // Get tomorrow's date as minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  if (submitted) {
    return (
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="text-center py-6">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="font-display text-xl font-bold text-brand-navy mb-2">
            Viewing Requested
          </h3>
          <p className="text-sm text-brand-slate leading-relaxed">
            Thank you for your interest. Our agent will contact you shortly to
            confirm your viewing of{" "}
            <span className="font-semibold text-brand-navy">
              {propertyTitle}
            </span>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Calendar className="w-5 h-5 text-brand-gold" />
        <h3 className="font-display text-xl font-bold text-brand-navy">
          Schedule a Viewing
        </h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div className="space-y-1.5">
          <label
            htmlFor="viewing-name"
            className="block text-sm font-medium text-brand-navy"
          >
            Full Name
          </label>
          <input
            id="viewing-name"
            type="text"
            placeholder="Your full name"
            {...register("name")}
            className={cn(
              "w-full px-4 py-2.5 border rounded-lg text-sm text-brand-navy placeholder:text-brand-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold transition-all",
              errors.name ? "border-red-400" : "border-gray-200"
            )}
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label
            htmlFor="viewing-phone"
            className="block text-sm font-medium text-brand-navy"
          >
            Phone Number
          </label>
          <input
            id="viewing-phone"
            type="tel"
            placeholder="+971 50 123 4567"
            {...register("phone")}
            className={cn(
              "w-full px-4 py-2.5 border rounded-lg text-sm text-brand-navy placeholder:text-brand-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold transition-all",
              errors.phone ? "border-red-400" : "border-gray-200"
            )}
          />
          {errors.phone && (
            <p className="text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Date */}
        <div className="space-y-1.5">
          <label
            htmlFor="viewing-date"
            className="block text-sm font-medium text-brand-navy"
          >
            Preferred Date
          </label>
          <input
            id="viewing-date"
            type="date"
            min={minDate}
            {...register("date")}
            className={cn(
              "w-full px-4 py-2.5 border rounded-lg text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold transition-all",
              errors.date ? "border-red-400" : "border-gray-200"
            )}
          />
          {errors.date && (
            <p className="text-xs text-red-500">{errors.date.message}</p>
          )}
        </div>

        {/* Time */}
        <div className="space-y-1.5">
          <label
            htmlFor="viewing-time"
            className="block text-sm font-medium text-brand-navy"
          >
            Preferred Time
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-slate-400 pointer-events-none" />
            <select
              id="viewing-time"
              {...register("time")}
              className={cn(
                "w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm text-brand-navy bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold transition-all appearance-none cursor-pointer",
                errors.time ? "border-red-400" : "border-gray-200"
              )}
              defaultValue=""
            >
              <option value="" disabled>
                Select a time
              </option>
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
          {errors.time && (
            <p className="text-xs text-red-500">{errors.time.message}</p>
          )}
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <label
            htmlFor="viewing-message"
            className="block text-sm font-medium text-brand-navy"
          >
            Message{" "}
            <span className="text-brand-slate font-normal">(optional)</span>
          </label>
          <textarea
            id="viewing-message"
            rows={3}
            placeholder="Any special requests or questions..."
            {...register("message")}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-brand-navy placeholder:text-brand-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold transition-all resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full py-3 bg-brand-gold text-white font-semibold rounded-lg transition-colors duration-200",
            isSubmitting
              ? "opacity-60 cursor-not-allowed"
              : "hover:bg-brand-gold-400"
          )}
        >
          {isSubmitting ? "Submitting..." : "Request Viewing"}
        </button>
      </form>
    </div>
  );
}
