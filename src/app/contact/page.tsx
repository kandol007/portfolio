"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquareText } from "lucide-react";
import StarBackground from "@/components/StarBackground"; // Adjust path if needed


export default function ContactPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 4000);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

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
          <h1 className="text-4xl font-bold text-center mb-6">Contact Me</h1>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Have a question, proposal, or just want to say hi? I&apos;m always open to new opportunities and collaboration.
          </p>

          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            <motion.div whileHover={{ scale: 1.05 }} className="relative z-[50] flex flex-col items-center bg-transparent backdrop-blur-sm p-6 rounded-xl border-l-4 border-indigo-500">
              <Mail className="w-6 h-6 text-indigo-400 mb-2" />
              <span className="text-sm text-gray-300">ritikkandolrk@gmail.com</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="relative z-[50] flex flex-col items-center bg-transparent backdrop-blur-sm p-6 rounded-xl border-l-4 border-indigo-500">
              <Phone className="w-6 h-6 text-indigo-400 mb-2" />
              <span className="text-sm text-gray-300">(+91) 7078594541</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="relative z-[50] flex flex-col items-center bg-transparent backdrop-blur-sm p-6 rounded-xl border-l-4 border-indigo-500">
              <MapPin className="w-6 h-6 text-indigo-400 mb-2" />
              <span className="text-sm text-gray-300">Meerut, Uttar Pradesh</span>
            </motion.div>
          </div>

          {/* WhatsApp Button */}
          <div className="relative z-[50] mb-12 text-center">
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
            className="relative z-[50] space-y-6 bg-transparent backdrop-blur-sm  p-8 rounded-xl shadow-md"
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium"
            >
              Send Message
            </motion.button>

            {submitted && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-green-400 mt-2"
              >
                Thank you! Your message has been sent.
              </motion.p>
            )}
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}
