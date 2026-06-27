import React from "react";
import facebook from "@assets/facebook.png";
import instagram from "@assets/instagram.png";
import tiktok from "@assets/tiktok.png";
import whatsapp from "@assets/whatsapp.png";
import youtube from "@assets/youtube.png";
export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <a href="tel:+923001234567">📞 +92 300 123 4567</a>
        <a href="mailto:info@ffkitchen.pk">✉️ info@ffkitchen.pk</a>
      </div>
      <div className="topbar-right">
        <a href="#" className="social-btn" title="Facebook">
          <img className="social-btn-img" src={facebook} alt="" />
        </a>
        <a href="#" className="social-btn" title="Instagram">
          <img className="social-btn-img" src={instagram} alt="" />
        </a>
        <a href="#" className="social-btn" title="WhatsApp">
          <img className="social-btn-img" src={whatsapp} alt="" />
        </a>
        <a href="#" className="social-btn" title="YouTube">
          <img className="social-btn-img" src={youtube} alt="" />
        </a>
        <a href="#" className="social-btn" title="TikTok">
          <img className="social-btn-img" src={tiktok} alt="" />
        </a>
      </div>
    </div>
  );
}
