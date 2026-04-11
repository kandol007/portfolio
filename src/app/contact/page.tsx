"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquareText, Github } from "lucide-react";
import dynamic from "next/dynamic";

const StarBackground = dynamic(() => import("@/components/StarBackground"), { ssr: false });

export default function ContactPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [formData, setFormData] = useState({ name: "", email: "", message: "", website: "" });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: "" });
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({ type: 'success', message: "Thank you! Your message has been sent." });
        setFormData({ name: "", email: "", message: "", website: "" });
        setTimeout(() => {
          setStatus({ type: null, message: "" });
        }, 4000);
      } else {
        setStatus({ type: 'error', message: data.error || "Failed to send message. Please try again." });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus({ type: 'error', message: "An unexpected error occurred." });
    } finally {
      setIsSubmitting(false);
    }
  }


  return (
    <div className="relative min-h-screen bg-transparent text-white">
      <StarBackground />

      <div className="max-w-4xl mx-auto px-4 py-24">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Contact Me</h1>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Have a question, proposal, or just want to say hi? I&apos;m always open to new opportunities and collaboration.
          </p>

          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <motion.div whileHover={{ scale: 1.05 }} className="relative z-[40] flex flex-col items-center bg-transparent backdrop-blur-sm p-6 rounded-xl border-l-4 border-indigo-500">
              <Mail className="w-6 h-6 text-indigo-400 mb-2" />
              <span className="text-sm text-gray-300">ritikkandolrk@gmail.com</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="relative z-[40] flex flex-col items-center bg-transparent backdrop-blur-sm p-6 rounded-xl border-l-4 border-indigo-500">
              <Phone className="w-6 h-6 text-indigo-400 mb-2" />
              <span className="text-sm text-gray-300">(+91) 7078594541</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="relative z-[40] flex flex-col items-center bg-transparent backdrop-blur-sm p-6 rounded-xl border-l-4 border-indigo-500">
              <MapPin className="w-6 h-6 text-indigo-400 mb-2" />
              <span className="text-sm text-gray-300">Meerut, Uttar Pradesh</span>
            </motion.div>
            <motion.a
              href="https://github.com/kandol007"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="relative z-[40] flex flex-col items-center bg-transparent backdrop-blur-sm p-6 rounded-xl border-l-4 border-indigo-500 cursor-pointer"
            >
              <Github className="w-6 h-6 text-indigo-400 mb-2" />
              <span className="text-sm text-gray-300">kandol007</span>
            </motion.a>
          </div>

          {/* WhatsApp Button */}
          <div className="relative z-[40] mb-12 text-center">
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="https://wa.me/917078594541"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full shadow-md"
            >
              <MessageSquareText className="w-5 h-5" /> Chat on WhatsApp
            </motion.a>
          </div>

          {/* Embedded Map */}
          <div className="mb-16 overflow-hidden rounded-xl shadow-lg border border-gray-800">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14022.414223327916!2d77.69268405!3d28.9844615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c63eb2c168aeb%3A0x1d8b5e27db4ebfb7!2sMeerut%2C%20Uttar%20Pradesh%20250002!5e0!3m2!1sen!2sin!4v1719677777777"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-[40] space-y-6 bg-transparent backdrop-blur-sm  p-8 rounded-xl shadow-md"
          >
            <div>
              <label className="block text-sm text-gray-400 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>

            {/* Honeypot field for bots */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-lg text-white font-medium ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </motion.button>

            {status.message && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-sm mt-2 ${status.type === 'error' ? 'text-red-400' : 'text-green-400'}`}
              >
                {status.message}
              </motion.p>
            )}
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}
