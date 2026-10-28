"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import SectionHeader from "@/components/ui-custom/SectionHeader";
import { agents } from "@/data/agents";
import { z } from "zod";

const LeafletMap = dynamic(
  () => import("@/components/ui-custom/LeafletMap"),
  { ssr: false }
);

// Metadata for client components must be exported from a separate file or parent layout.
// Using head metadata via document title for client component pages.

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  propertyType: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const topAgents = agents.slice(0, 3);

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    const result = contactSchema.safeParse(data);
    if (!result.success) return;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-navy py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-brand-gold uppercase tracking-[0.2em] text-sm font-semibold mb-4">
            Get in Touch
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Shefa Real Estate
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Whether you have a question about a listing, need a valuation, or
            want to schedule a viewing, our team is here to help.
          </p>
        </div>
      </section>

      {/* Two Column Layout */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* LEFT: Contact Form */}
            <div>
              <h2 className="font-display text-2xl font-bold text-brand-navy mb-6">
                Send Us a Message
              </h2>

              {submitted ? (
                <div className="bg-brand-cream rounded-xl p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 mx-auto flex items-center justify-center mb-4 animate-fadeInUp">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-brand-navy mb-2">
                    Message Received!
                  </h3>
                  <p className="text-brand-slate">
                    Thank you for reaching out. A member of our team will
                    respond within 2 business hours during working days.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-brand-navy mb-1.5">
                      Full Name *
                    </label>
                    <input
                      {...register("name", {
                        required: "Name is required",
                        minLength: { value: 2, message: "Min 2 characters" },
                      })}
                      type="text"
                      placeholder="Your full name"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-brand-navy mb-1.5">
                        Email Address *
                      </label>
                      <input
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Invalid email",
                          },
                        })}
                        type="email"
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email.message}
                        </p>
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
                          minLength: {
                            value: 7,
                            message: "Enter a valid phone number",
                          },
                        })}
                        type="tel"
                        placeholder="+971 50 123 4567"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Inquiry Type */}
                  <div>
                    <label className="block text-sm font-medium text-brand-navy mb-1.5">
                      Inquiry Type *
                    </label>
                    <select
                      {...register("inquiryType", {
                        required: "Please select an inquiry type",
                      })}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none bg-white"
                    >
                      <option value="">Select inquiry type</option>
                      <option value="buying">Buying a Property</option>
                      <option value="selling">Selling a Property</option>
                      <option value="renting">Renting a Property</option>
                      <option value="valuation">Property Valuation</option>
                      <option value="investment">Investment Advisory</option>
                      <option value="general">General Inquiry</option>
                    </select>
                    {errors.inquiryType && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.inquiryType.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Property Type (optional) */}
                    <div>
                      <label className="block text-sm font-medium text-brand-navy mb-1.5">
                        Property Type
                      </label>
                      <select
                        {...register("propertyType")}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none bg-white"
                      >
                        <option value="">Any (optional)</option>
                        <option value="apartment">Apartment</option>
                        <option value="villa">Villa</option>
                        <option value="penthouse">Penthouse</option>
                        <option value="townhouse">Townhouse</option>
                        <option value="office">Office</option>
                        <option value="land">Land</option>
                        <option value="retail">Retail Space</option>
                      </select>
                    </div>

                    {/* Budget Range (optional) */}
                    <div>
                      <label className="block text-sm font-medium text-brand-navy mb-1.5">
                        Budget Range
                      </label>
                      <select
                        {...register("budget")}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none bg-white"
                      >
                        <option value="">Any (optional)</option>
                        <option value="under-1m">Under AED 1M</option>
                        <option value="1m-3m">AED 1M - 3M</option>
                        <option value="3m-5m">AED 3M - 5M</option>
                        <option value="5m-10m">AED 5M - 10M</option>
                        <option value="10m-25m">AED 10M - 25M</option>
                        <option value="25m+">AED 25M+</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-brand-navy mb-1.5">
                      Message *
                    </label>
                    <textarea
                      {...register("message", {
                        required: "Message is required",
                        minLength: {
                          value: 10,
                          message: "Min 10 characters",
                        },
                      })}
                      rows={5}
                      placeholder="Tell us about your requirements..."
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none resize-none"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-brand-gold text-white rounded-lg font-semibold text-lg hover:bg-brand-gold-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>

            {/* RIGHT: Office Info + Map */}
            <div className="space-y-6">
              {/* Office Card */}
              <div className="bg-brand-cream rounded-xl p-6 md:p-8 space-y-5">
                <h3 className="font-display text-xl font-bold text-brand-navy">
                  Our Office
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-brand-navy">Address</p>
                      <p className="text-brand-slate text-sm">
                        Office 2105, Bay Square Building 13,
                        <br />
                        Business Bay, Dubai, UAE
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-brand-navy">Phone</p>
                      <Link
                        href="tel:+97143857700"
                        className="text-brand-slate text-sm hover:text-brand-gold transition-colors"
                      >
                        +971 4 385 7700
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-brand-navy">WhatsApp</p>
                      <Link
                        href="https://wa.me/971501237700"
                        target="_blank"
                        className="text-brand-slate text-sm hover:text-brand-gold transition-colors"
                      >
                        +971 50 123 7700
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-brand-navy">Email</p>
                      <Link
                        href="mailto:info@shefa.ae"
                        className="text-brand-slate text-sm hover:text-brand-gold transition-colors"
                      >
                        info@shefa.ae
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-brand-navy">
                        Working Hours
                      </p>
                      <p className="text-brand-slate text-sm">
                        Mon&ndash;Thu: 9:00 AM &ndash; 7:00 PM
                        <br />
                        Fri: 9:00 AM &ndash; 12:00 PM, 2:00 PM &ndash; 6:00 PM
                        <br />
                        Sat: 10:00 AM &ndash; 5:00 PM
                        <br />
                        Sun: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <LeafletMap
                lat={25.186}
                lng={55.2617}
                zoom={15}
                markerText="Shefa Real Estate - Bay Square, Business Bay"
                height="350px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Agent Cards */}
      <section className="py-16 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="Direct Contact"
            title="Speak to an Agent"
            subtitle="Reach out directly to one of our senior consultants."
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {topAgents.map((agent) => (
              <div
                key={agent.id}
                className="bg-white rounded-xl p-5 shadow-card flex items-center gap-4"
              >
                <Image
                  src={agent.photo}
                  alt={agent.name}
                  width={64}
                  height={64}
                  className="rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-brand-navy text-sm truncate">
                    {agent.name}
                  </h4>
                  <p className="text-brand-slate text-xs truncate">
                    {agent.title}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Link
                      href={`tel:${agent.phone}`}
                      className="flex items-center gap-1 px-3 py-1.5 bg-brand-navy text-white rounded-lg text-xs font-medium hover:bg-brand-navy-800 transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      Call
                    </Link>
                    <Link
                      href={`https://wa.me/${agent.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 transition-colors"
                    >
                      <MessageCircle className="w-3 h-3" />
                      WhatsApp
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
