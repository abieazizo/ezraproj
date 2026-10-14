"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle } from "lucide-react";

const valuationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number")
    .regex(/^[+\d\s()-]+$/, "Please enter a valid phone number"),
  propertyType: z.string().min(1, "Please select a property type"),
  address: z.string().min(5, "Please enter your property address"),
  bedrooms: z.string().min(1, "Please select the number of bedrooms"),
  estimatedValue: z.string().optional(),
});

type ValuationFormData = z.infer<typeof valuationSchema>;

export default function ValuationForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ValuationFormData>({
    resolver: zodResolver(valuationSchema),
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl p-12 shadow-card text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 mx-auto flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="font-display text-2xl font-bold text-brand-navy mb-2">
          Valuation Request Received
        </h3>
        <p className="text-brand-slate">
          Thank you! One of our property valuers will contact you within 24
          hours with a comprehensive market assessment of your property.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-xl p-6 md:p-10 shadow-card space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-brand-navy mb-1.5">
            Full Name *
          </label>
          <input
            {...register("name", { required: "Name is required", minLength: 2 })}
            type="text"
            placeholder="John Smith"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-shadow"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-brand-navy mb-1.5">
            Email Address *
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
            })}
            type="email"
            placeholder="john@example.com"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-shadow"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-brand-navy mb-1.5">
            Phone Number *
          </label>
          <input
            {...register("phone", {
              required: "Phone is required",
              minLength: { value: 7, message: "Enter a valid phone number" },
            })}
            type="tel"
            placeholder="+971 50 123 4567"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-shadow"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium text-brand-navy mb-1.5">
            Property Type *
          </label>
          <select
            {...register("propertyType", {
              required: "Please select a property type",
            })}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-shadow bg-white"
          >
            <option value="">Select type</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="penthouse">Penthouse</option>
            <option value="townhouse">Townhouse</option>
            <option value="office">Office</option>
            <option value="land">Land</option>
            <option value="retail">Retail Space</option>
          </select>
          {errors.propertyType && (
            <p className="text-red-500 text-xs mt-1">
              {errors.propertyType.message}
            </p>
          )}
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-brand-navy mb-1.5">
          Property Address *
        </label>
        <input
          {...register("address", {
            required: "Address is required",
            minLength: { value: 5, message: "Enter a valid address" },
          })}
          type="text"
          placeholder="e.g. Tower A, Dubai Marina, Dubai"
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-shadow"
        />
        {errors.address && (
          <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium text-brand-navy mb-1.5">
            Bedrooms *
          </label>
          <select
            {...register("bedrooms", {
              required: "Please select bedrooms",
            })}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-shadow bg-white"
          >
            <option value="">Select</option>
            <option value="studio">Studio</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4 Bedrooms</option>
            <option value="5">5 Bedrooms</option>
            <option value="6+">6+ Bedrooms</option>
          </select>
          {errors.bedrooms && (
            <p className="text-red-500 text-xs mt-1">
              {errors.bedrooms.message}
            </p>
          )}
        </div>

        {/* Estimated Value */}
        <div>
          <label className="block text-sm font-medium text-brand-navy mb-1.5">
            Estimated Value (AED)
          </label>
          <select
            {...register("estimatedValue")}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-shadow bg-white"
          >
            <option value="">Select range (optional)</option>
            <option value="under-1m">Under AED 1,000,000</option>
            <option value="1m-3m">AED 1,000,000 - 3,000,000</option>
            <option value="3m-5m">AED 3,000,000 - 5,000,000</option>
            <option value="5m-10m">AED 5,000,000 - 10,000,000</option>
            <option value="10m-20m">AED 10,000,000 - 20,000,000</option>
            <option value="20m-50m">AED 20,000,000 - 50,000,000</option>
            <option value="50m+">AED 50,000,000+</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-brand-gold text-white rounded-lg font-semibold text-lg hover:bg-brand-gold-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Request Free Valuation"}
      </button>

      <p className="text-xs text-brand-slate text-center">
        By submitting this form, you agree to be contacted by Shefa Real Estate
        regarding your property valuation. We respect your privacy and will never
        share your information with third parties.
      </p>
    </form>
  );
}
