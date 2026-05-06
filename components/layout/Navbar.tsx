"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Search, ShoppingBag, User, Menu, X } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const navItems = [
  {
    title: "Shop By",
    sections: [
      {
        title: "Shop by Space",
        links: [
          { label: "Living Room", href: "#living", image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=400&auto=format&fit=crop" },
          { label: "Bedroom", href: "#bedroom", image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=400&auto=format&fit=crop" },
          { label: "Dining Room", href: "#dining", image: "https://images.unsplash.com/photo-1577113398331-d843d3341a63?q=80&w=400&auto=format&fit=crop" },
          { label: "Kids Room", href: "#kids", image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=400&auto=format&fit=crop" },
          { label: "Outdoor", href: "#outdoor", image: "https://images.unsplash.com/photo-1591825729269-caeb96ae0804?q=80&w=400&auto=format&fit=crop" },
          { label: "Office Space", href: "#office", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400&auto=format&fit=crop" },
        ],
      },
      {
        title: "Shop by Mood",
        links: [
          { label: "Calm Luxury", href: "#calm", image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=400&auto=format&fit=crop" },
          { label: "Modern Minimal", href: "#minimal", image: "https://images.unsplash.com/photo-1512918766675-21d740c04944?q=80&w=400&auto=format&fit=crop" },
          { label: "Hotel Luxury", href: "#hotel", image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=400&auto=format&fit=crop" },
          { label: "Scandinavian Calm", href: "#scandi", image: "https://images.unsplash.com/photo-1556020685-ae41abfc9365?q=80&w=400&auto=format&fit=crop" },
          { label: "Earthy Natural", href: "#earthy", image: "https://images.unsplash.com/photo-1513519247388-19345420bd33?q=80&w=400&auto=format&fit=crop" },
          { label: "Royal Classic", href: "#royal", image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=400&auto=format&fit=crop" },
        ],
      },
      {
        title: "Our World",
        links: [
          { label: "Blogs", href: "#blogs", image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=400&auto=format&fit=crop" },
          { label: "Design Stories", href: "#stories", image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=400&auto=format&fit=crop" },
        ]
      }
    ],
  },
  {
    title: "Design My Room",
    sections: [
      {
        title: "AI Tools",
        links: [
          { label: "Start Style Quiz", href: "#quiz", image: "https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?q=80&w=400&auto=format&fit=crop" },
          { label: "AI Room Scan", href: "#scan", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=400&auto=format&fit=crop" },
          { label: "Visual Search", href: "#search", image: "https://images.unsplash.com/photo-1616489953149-755e74c0e927?q=80&w=400&auto=format&fit=crop" },
        ],
      },
    ],
  },
];

const topLinks = [
  { label: "Upload Your Room", href: "#upload" },
  { label: "Trade / Designers", href: "#trade" },
  { label: "Store Visit", href: "#store" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [menuTimeout, setMenuTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleMouseEnter = (title: string) => {
    if (menuTimeout) clearTimeout(menuTimeout);
    setActiveMenu(title);
  };

  const handleMouseLeave = () => {
    // 100ms is now enough because the menu is a child of the hover zone
    const timeout = setTimeout(() => {
      setActiveMenu(null);
    }, 100);
    setMenuTimeout(timeout);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen || isCartOpen || isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen, isCartOpen, isSearchOpen]);

  return (
    <>
      <nav 
      className={`fixed top-0 left-0 w-full z-[7000] transition-[background-color,backdrop-filter,border-color] duration-500 px-6 md:px-12 py-2 ${
        isMobileMenuOpen || scrolled ? "bg-[var(--color-sage)] backdrop-blur-2xl border-b border-black/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-display text-2xl tracking-tight z-[1001] text-white">
          <span className="font-bold">FAB</span>
          <span className="font-normal text-black">MY</span>
          <span className="font-bold text-[var(--color-terracotta)]">HOME</span>
        </Link>

        {/* Central Navigation (Desktop) */}
        <div className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <div 
              key={item.title}
              onMouseEnter={() => handleMouseEnter(item.title)}
              onMouseLeave={handleMouseLeave}
              className="py-4"
            >
              <div className={`group flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.2em] cursor-pointer transition-none ${
                activeMenu === item.title 
                  ? "text-[var(--color-terracotta)]" 
                  : (scrolled ? "text-white" : "text-white/70 hover:text-[var(--color-terracotta)]")
              }`}>
                {item.title}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 opacity-50 ${activeMenu === item.title ? "rotate-180" : ""}`} />
              </div>

              {/* Nested Mega Menu - Edge-to-edge background with centered content */}
              <AnimatePresence>
                {activeMenu === item.title && (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 w-screen z-[1000] pt-4 pointer-events-auto"
                  >
                    <div className="bg-white border-t border-black/5 shadow-2xl overflow-hidden">
                      <div className="max-w-7xl mx-auto py-12 px-6 md:px-12 flex flex-wrap justify-center gap-12 md:gap-24 lg:gap-32">
                      {item.sections.map((section) => (
                        <div key={section.title} className="space-y-6 min-w-[200px]">
                          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-black/30 border-b border-black/5 pb-2">
                            {section.title}
                          </p>
                          <div className="grid grid-cols-1 gap-4">
                            {section.links.map((link) => (
                              <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setActiveMenu(null)}
                                className="group flex items-center gap-4 transition-all"
                              >
                                <div className="w-16 h-16 overflow-hidden rounded-none bg-gray-100 shrink-0">
                                  <img 
                                    src={link.image} 
                                    alt={link.label} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                  />
                                </div>
                                <span className="text-[14px] font-medium text-black hover:text-[var(--color-terracotta)] transition-colors">
                                  {link.label}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          ))}

          {topLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${scrolled ? "text-white/80 hover:text-[var(--color-terracotta)]" : "text-white/60 hover:text-[var(--color-terracotta)]"}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Action Icons */}
        <div className={`flex items-center gap-3 md:gap-4 z-[1001] ${scrolled ? "text-white" : "text-white/90"}`}>
          {[
            { icon: Search, label: "Search", onClick: () => setIsSearchOpen(!isSearchOpen) },
            { icon: ShoppingBag, label: "Cart", onClick: () => setIsCartOpen(true) }
          ].map(({ icon: Icon, label, onClick }) => (
            <motion.button
              key={label}
              onClick={onClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-none bg-transparent transition-colors relative group cursor-pointer hover:text-[var(--color-terracotta)]"
            >
              <Icon className="h-4 w-4 md:h-[18px] md:w-[18px] stroke-[1.5]" />
              <span className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity hidden md:block whitespace-nowrap font-bold bg-white text-black px-2 py-1 rounded-none shadow-xl border border-black/5 z-50">
                {label}
              </span>
            </motion.button>
          ))}

          {/* Profile Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsProfileOpen(true)}
            onMouseLeave={() => setIsProfileOpen(false)}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-none bg-transparent transition-colors relative group cursor-pointer hover:text-[var(--color-terracotta)]"
            >
              <User className="h-4 w-4 md:h-[18px] md:w-[18px] stroke-[1.5]" />
            </motion.button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="absolute top-full right-0 w-48 bg-white border border-black/5 shadow-2xl overflow-hidden z-[1002]"
                >
                  <div className="flex flex-col">
                    <Link href="#signin" className="px-6 py-4 text-[12px] font-bold uppercase tracking-widest text-black hover:text-[var(--color-terracotta)] hover:bg-[var(--color-alabaster)] transition-colors">
                      Sign In
                    </Link>
                    <Link href="#signup" className="px-6 py-4 text-[12px] font-bold uppercase tracking-widest text-black/50 hover:text-[var(--color-terracotta)] hover:bg-[var(--color-alabaster)] transition-colors border-t border-black/5">
                      Sign Up
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Hamburger Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-none transition-all duration-300 bg-transparent text-white hover:text-[var(--color-terracotta)]"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Search Dropdown */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-full left-0 w-full z-[999] bg-white border-b border-black/5 shadow-2xl overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex items-center justify-between gap-8">
              <div className="flex-1 flex items-center gap-4 border-b border-black/10 py-2">
                <Search className="text-black/40 h-5 w-5" />
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Search products, rooms, styles..."
                  className="w-full bg-transparent border-none outline-none text-xl font-display text-black placeholder:text-black/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="text-black/60 hover:text-black transition-colors uppercase text-[12px] font-bold tracking-widest flex items-center gap-2 cursor-pointer"
              >
                Close <X className="h-4 w-4" />
              </button>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="w-full px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-4 gap-12 bg-white border-t border-black/5"
            >
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30">Suggestions</p>
                <div className="flex flex-col gap-3">
                  {["Living Room Sets", "Velvet Sofas", "Minimalist Bedroom", "Calm Luxury Mood"].map(s => (
                    <button key={s} className="text-left text-black/60 hover:text-[var(--color-terracotta)] transition-colors text-sm font-medium cursor-pointer">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-x-12 gap-y-6 items-center justify-start">
                {["Curtains", "Bedding", "Furniture", "Wallpaper", "Rugs", "Decor", "Lighting", "Art"].map((cat) => (
                  <button 
                    key={cat}
                    className="text-[11px] font-black uppercase tracking-[0.3em] text-black/40 hover:text-[var(--color-terracotta)] transition-all duration-300 group"
                  >
                    <span className="group-hover:translate-x-1 inline-block transition-transform">{cat}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-[var(--color-sage)] z-[6000] lg:hidden flex flex-col pt-32 px-8 overflow-y-auto pb-20"
          >
            <div className="flex flex-col gap-12">
              {navItems.map((item) => (
                <div key={item.title} className="space-y-6">
                  <p className="text-white/40 text-[12px] uppercase tracking-[0.5em] font-black border-b border-white/5 pb-3">
                    {item.title}
                  </p>
                  <div className="grid grid-cols-1 gap-8">
                    {item.sections.map((section) => (
                      <div key={section.title} className="space-y-6">
                        <p className="text-white text-lg font-display font-bold tracking-tight">{section.title}</p>
                        <div className="flex flex-col gap-4">
                          {section.links.map((link) => (
                            <Link 
                              key={link.label} 
                              href={link.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="text-white/70 text-lg font-sans font-light tracking-wide hover:text-[var(--color-terracotta)] transition-colors"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[8000]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 h-full w-[85vw] md:w-[25%] bg-white z-[9000] shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-4 md:px-8 py-2.5 flex items-center justify-between border-b border-black/5 bg-white">
                <h2 className="font-display text-lg font-black uppercase tracking-[0.2em] text-black">Your Cart</h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:rotate-90 transition-transform duration-300 text-black"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 text-center text-black overflow-y-auto">
                <div className="w-12 h-12 bg-[var(--color-alabaster)] rounded-none flex items-center justify-center mb-4">
                  <ShoppingBag size={24} className="text-black/40" />
                </div>
                <h3 className="font-sans text-base font-bold mb-1 uppercase tracking-wider">Your cart is empty</h3>
                <p className="font-sans text-[10px] text-black/50 mb-6 max-w-[180px] leading-relaxed">
                  Start styling your room to see items appear here.
                </p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="font-sans text-[10px] font-black uppercase tracking-[0.2em] border-b-2 border-black pb-1 hover:text-[var(--color-terracotta)] hover:border-[var(--color-terracotta)] transition-all"
                >
                  Design Your Room
                </button>
              </div>

              <div className="p-4 md:p-6 border-t border-black/5 bg-white">
                <div className="flex items-center justify-between mb-6 text-black">
                  <span className="font-sans text-[9px] font-black uppercase tracking-[0.3em] text-black/40">Subtotal</span>
                  <span className="font-sans text-lg font-bold tracking-tighter">₹0.00</span>
                </div>
                <button className="w-full bg-black text-white font-sans font-bold uppercase tracking-[0.2em] py-4 text-[10px] rounded-none hover:bg-[var(--color-midnight)] transition-colors opacity-50 cursor-not-allowed">
                  Checkout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
