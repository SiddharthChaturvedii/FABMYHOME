import Link from "next/link";
import { footerLinks } from "@/data/navigation";

export default function Footer() {
  return (
    <footer className="bg-[#B6D0D2] text-white pt-20 md:pt-32 pb-12 px-6 md:px-12 relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-gradient-to-br from-white to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 md:gap-16 lg:gap-8 mb-20">
          
          {/* Section 1: Logo & Tagline */}
          <div className="col-span-1 md:col-span-full lg:col-span-1 flex flex-col items-start md:items-center lg:items-start text-left md:text-center lg:text-left">
            <Link href="/" className="font-display text-3xl md:text-4xl tracking-tight text-white inline-block mb-6">
              <span className="font-bold">FAB</span>
              <span className="font-normal text-black">MY</span>
              <span className="font-bold text-[var(--color-terracotta)]">HOME</span>
            </Link>
            <p className="font-sans text-white text-lg md:text-xl leading-relaxed font-light italic max-w-sm md:max-w-2xl lg:max-w-xs">
              India&apos;s first AI-assisted interior styling platform. <br className="hidden md:block lg:hidden" />
              <span className="text-white">We believe every room has a story to tell.</span>
            </p>
          </div>

          {/* Sections 2, 3, 4: List Sections */}
          <div className="col-span-1 md:col-span-full lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12 pt-12 md:pt-0 border-t border-white/5 md:border-t-0">
            {/* Shop by Space */}
            <div className="flex flex-col text-left">
              <h3 className="font-sans font-black uppercase tracking-[0.3em] text-[11px] text-[var(--color-terracotta)] mb-6 h-4">
                Shop by Space
              </h3>
              <ul className="space-y-3 md:space-y-1.5 mt-2">
                {footerLinks.categories.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="font-sans text-[13px] font-medium text-white hover:text-[#ff6b00] transition-all duration-300 tracking-wide block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Services */}
            <div className="flex flex-col text-left">
              <h3 className="font-sans font-black uppercase tracking-[0.3em] text-[11px] text-[var(--color-terracotta)] mb-6 h-4">
                Our Services
              </h3>
              <ul className="space-y-3 md:space-y-1.5 mt-2">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="font-sans text-[13px] font-medium text-white hover:text-[#ff6b00] transition-all duration-300 tracking-wide block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* The Company */}
            <div className="flex flex-col text-left">
              <h3 className="font-sans font-black uppercase tracking-[0.3em] text-[11px] text-[var(--color-terracotta)] mb-6 h-4">
                The Company
              </h3>
              <ul className="space-y-3 md:space-y-1.5 mt-2">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="font-sans text-[13px] font-medium text-white hover:text-[#ff6b00] transition-all duration-300 tracking-wide block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section 5: Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-6 md:gap-8 text-center lg:text-left">
          <div className="flex gap-8 md:gap-10 justify-center lg:justify-start">
            <Link href="#" className="font-sans text-[11px] uppercase tracking-[0.2em] font-bold text-white hover:text-[#ff6b00] transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="font-sans text-[11px] uppercase tracking-[0.2em] font-bold text-white hover:text-[#ff6b00] transition-colors">
              Terms of Service
            </Link>
          </div>
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] font-bold text-white/70">
            © {new Date().getFullYear()} FABMYHOME Luxury Interiors. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
