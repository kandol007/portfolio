"use client";

import React from "react";
import { MapPin, Phone, Mail, Linkedin, Instagram, Twitter, Github } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative z-50 bg-transparent backdrop-blur-sm text-white py-12 px-6 w-full border-t border-white/10 shadow-inner">
      {/* === Uniformly Aligned Section Starts === */}
      <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300 text-sm">
        {/* About + Social */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl text-left font-bold text-white">
            <span className="text-indigo-500">Ritik Kumar</span>
            <span className="text-white"> | Turning Ideas into Interactive Interfaces</span>
          </h3>
          <p className="leading-relaxed text-left">
            Weaves code into captivating interfaces, transforming wild ideas into sleek, intuitive, and interactive digital realities with flair.
          </p>
          <div className="flex text-left space-x-4 pt-2">
            <Link href="https://www.linkedin.com/in/ritik-kumar-279314166?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank">
              <Linkedin className="w-5 h-5 hover:text-indigo-400" />
            </Link>
            <Link href="https://www.instagram.com/kandol_rk?igsh=YTQxY2hvajEwamV4&utm_source=qr" target="_blank">
              <Instagram className="w-5 h-5 hover:text-pink-400" />
            </Link>
            <Link href="https://x.com/imrj1006?s=21" target="_blank">
              <Twitter className="w-5 h-5 hover:text-sky-400" />
            </Link>
            <Link href="https://github.com/kandol007" target="_blank">
              <Github className="w-5 h-5 hover:text-indigo-400" />
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-end text-right gap-4">
  <h4 className="text-xl font-semibold text-white">Contact</h4>
  <ul className="space-y-3">
    <li className="flex items-start gap-3 justify-end text-sm text-gray-300">
      <MapPin className="w-5 h-5 text-indigo-500 mt-1" />
      <span>Meerut, Uttar Pradesh, India. (250002)</span>
    </li>
    <li className="flex items-start gap-3 justify-end text-sm text-gray-300">
      <Phone className="w-5 h-5 text-indigo-500 mt-1" />
      <span>(+91)7078594541</span>
    </li>
    <li className="flex items-start gap-3 justify-end text-sm text-gray-300">
      <Mail className="w-5 h-5 text-indigo-500 mt-1" />
      <span>ritikkandolrk@gmail.com</span>
    </li>
  </ul>
</div>
      </div>
      {/* === Uniformly Aligned Section Ends === */}

      {/* Copyright */}
      <div className="text-center text-gray-200 mt-10">
           <p className="text-sm">© 2025 Ritik Kumar. All rights reserved.</p>
       </div>
   </footer>
  );
};

export default Footer;
