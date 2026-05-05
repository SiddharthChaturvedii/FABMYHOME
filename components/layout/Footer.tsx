import Link from "next/link";
import { footerLinks } from "@/data/navigation";

export default function Footer() {
  return (
    <footer className="bg-[#0a2e2e] text-white pt-24 pb-12 px-6 md:px-12 relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-gradient-to-br from-white to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Section: Brand & Tagline */}
        <div className="mb-20 text-center md:text-left">
          <Link href="/" className="font-display text-3xl md:text-4xl tracking-tight text-white inline-block mb-6">
            <span className="font-bold">FAB</span>
            <span className="font-normal text-white/40">MY</span>
            <span className="font-bold text-[var(--color-terracotta)]">HOME</span>
          </Link>
          <p className="font-sans text-white/80 text-xl md:text-2xl leading-relaxed max-w-2xl font-light italic">
            India&apos;s first AI-assisted interior styling platform. <br className="hidden md:block" />
            <span className="text-white/40">We believe every room has a story to tell.</span>
          </p>
        </div>

        {/* Middle Section: Links Grid (Below Logo as per diagram) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24 mb-20 border-t border-white/5 pt-16">
          {/* Shop by Space */}
          <div>
            <h3 className="font-sans font-black uppercase tracking-[0.3em] text-[11px] text-[var(--color-terracotta)] mb-8">
              Shop by Space
            </h3>
            <ul className="space-y-4">
              {footerLinks.categories.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="font-sans text-[15px] font-medium text-white/50 hover:text-white transition-all duration-300 tracking-wide block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="font-sans font-black uppercase tracking-[0.3em] text-[11px] text-[var(--color-terracotta)] mb-8">
              Our Services
            </h3>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="font-sans text-[15px] font-medium text-white/50 hover:text-white transition-all duration-300 tracking-wide block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* The Company */}
          <div>
            <h3 className="font-sans font-black uppercase tracking-[0.3em] text-[11px] text-[var(--color-terracotta)] mb-8">
              The Company
            </h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="font-sans text-[15px] font-medium text-white/50 hover:text-white transition-all duration-300 tracking-wide block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-10">
            <Link href="#" className="font-sans text-[11px] uppercase tracking-[0.2em] font-bold text-white/30 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="font-sans text-[11px] uppercase tracking-[0.2em] font-bold text-white/30 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] font-bold text-white/20">
            © {new Date().getFullYear()} FABMYHOME Luxury Interiors. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
