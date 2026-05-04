import Link from "next/link";
import { footerLinks } from "@/data/navigation";

export default function Footer() {
  return (
    <footer className="bg-[#124444] text-[var(--color-alabaster)] pt-32 pb-16 px-6 md:px-12 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-gradient-to-br from-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand Column */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h2 className="font-display text-4xl font-bold mb-8 tracking-wider">FABMYHOME</h2>
            <p className="font-sans text-[var(--color-alabaster)]/60 text-lg leading-relaxed max-w-xs font-light italic">
              India&apos;s first AI-assisted interior styling platform. 
              We believe every room has a story to tell.
            </p>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-sans font-bold uppercase tracking-[0.2em] text-[13px] text-[var(--color-terracotta)] mb-8">
              Shop by Space
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.categories.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="font-sans text-[14px] font-light text-white/50 hover:text-[var(--color-terracotta)] transition-all duration-300 tracking-wide">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans font-bold uppercase tracking-[0.2em] text-[13px] text-[var(--color-terracotta)] mb-8">
              Our Services
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="font-sans text-[14px] font-light text-white/50 hover:text-[var(--color-terracotta)] transition-all duration-300 tracking-wide">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans font-bold uppercase tracking-[0.2em] text-[13px] text-[var(--color-terracotta)] mb-8">
              The Company
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="font-sans text-[14px] font-light text-white/50 hover:text-[var(--color-terracotta)] transition-all duration-300 tracking-wide">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-8">
            <Link href="#" className="font-sans text-sm text-white/30 hover:text-white transition-colors font-light">
              Privacy Policy
            </Link>
            <Link href="#" className="font-sans text-sm text-white/30 hover:text-white transition-colors font-light">
              Terms of Service
            </Link>
          </div>
          <p className="font-sans text-sm text-white/30 font-light">
            © {new Date().getFullYear()} FABMYHOME Luxury Interiors. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
