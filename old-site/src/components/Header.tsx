"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, User, ShoppingBag, Shield, Check, MessageCircle, FileText, Menu, X } from "lucide-react";
import { DiscordIcon } from "./ui/discord-icon";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
        setIsAtTop(false);
      } else {
        setScrolled(false);
        setIsAtTop(true);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-md border-b border-[#333441]/50 shadow-md'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {/* Left: Mobile Menu Button / Desktop Logo */}
            <div className="flex items-center flex-shrink-0">
              {/* Mobile Menu Button - Left on mobile */}
              <button
                className="md:hidden text-gray-300 hover:text-white transition-colors p-2 cursor-pointer"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="w-8 h-8" />
              </button>
              {/* Desktop Logo - Left on desktop */}
              <img 
                src="/BM.png" 
                alt="BM Logo" 
                className="hidden md:block h-12 lg:h-14 xl:h-16 w-auto cursor-pointer flex-shrink-0" 
                onClick={() => router.push('/')}
              />
            </div>
            {/* Center: Mobile Logo / Desktop Navigation */}
            <div className="flex justify-center flex-1 min-w-0">
              {/* Mobile Logo - Center on mobile */}
              <img 
                src="/BM.png" 
                alt="BM Logo" 
                className="md:hidden h-12 w-auto cursor-pointer" 
                onClick={() => router.push('/')}
              />
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center justify-center space-x-4 lg:space-x-6 xl:space-x-8 2xl:space-x-12 min-w-0">
                <div className="flex items-center space-x-1 lg:space-x-2 text-gray-300 hover:text-white cursor-pointer transition-all duration-300 whitespace-nowrap group flex-shrink-0">
                  <ShoppingBag className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" />
                  <span className="text-base lg:text-lg xl:text-xl relative">
                    Shop Now
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ffd800] transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </div>
                <div className={`flex items-center space-x-1 lg:space-x-2 cursor-pointer transition-all duration-300 whitespace-nowrap group text-gray-300 hover:text-white flex-shrink-0`}>
                  {pathname === "/guarantee" ? (
                    <>
                      <div className="relative">
                        <Shield className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-white" />
                        <Check className="absolute inset-0 w-2.5 h-2.5 lg:w-3 lg:h-3 xl:w-3.5 xl:h-3.5 text-white m-auto" />
                      </div>
                      <span className="text-base lg:text-lg xl:text-xl relative text-white">
                        Our Guarantee
                      </span>
                    </>
                  ) : (
                    <a href="/guarantee" className="flex items-center space-x-1 lg:space-x-2">
                      <div className="relative">
                        <Shield className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" />
                        <Check className="absolute inset-0 w-2.5 h-2.5 lg:w-3 lg:h-3 xl:w-3.5 xl:h-3.5 text-gray-300 group-hover:text-white transition-colors m-auto" />
                      </div>
                      <span className="text-base lg:text-lg xl:text-xl relative">
                        Our Guarantee
                      </span>
                    </a>
                  )}
                </div>
                <div className="flex items-center space-x-1 lg:space-x-2 text-gray-300 hover:text-white cursor-pointer transition-all duration-300 whitespace-nowrap group flex-shrink-0">
                  <a href="https://discord.gg/bloxmania" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 lg:space-x-2">
                    <DiscordIcon className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" />
                    <span className="text-base lg:text-lg xl:text-xl relative">
                      Daily Giveaways
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ffd800] transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                </div>
                <div className="flex items-center space-x-1 lg:space-x-2 text-gray-300 hover:text-white cursor-pointer transition-all duration-300 whitespace-nowrap group flex-shrink-0">
                  <FileText className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" />
                  <span className="text-base lg:text-lg xl:text-xl relative">
                    Purchasing Guide
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ffd800] transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </div>
              </nav>
            </div>
            {/* Right: User actions */}
            <div className="flex items-center justify-end space-x-2 lg:space-x-4 flex-shrink-0">
              <ShoppingCart className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 text-gray-300 hover:text-white cursor-pointer transition-colors p-1" />
              <User className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 text-gray-300 hover:text-white cursor-pointer transition-colors p-1" />
            </div>
          </div>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 md:hidden">
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <img src="/BM.png" alt="BM Logo" className="h-12 w-auto cursor-pointer" onClick={() => router.push('/')} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            {/* Mobile Menu Items */}
            <nav className="flex-1 p-6">
              <div className="space-y-6">
                <div className="flex items-center space-x-4 text-gray-300 hover:text-white cursor-pointer transition-all duration-300 group py-6 border-b border-gray-700">
                  <ShoppingBag className="w-8 h-8" />
                  <span className="text-xl font-medium">Shop Now</span>
                </div>
                {pathname === "/guarantee" ? (
                  <div className="flex items-center space-x-4 text-white cursor-default transition-all duration-300 group py-6 border-b border-gray-700">
                    <div className="relative">
                      <Shield className="w-8 h-8 text-white" />
                      <Check className="absolute inset-0 w-4 h-4 text-white m-auto" />
                    </div>
                    <span className="text-xl font-medium relative text-white">
                      Our Guarantee
                    </span>
                  </div>
                ) : (
                  <a href="/guarantee" className="flex items-center space-x-4 text-gray-300 hover:text-white cursor-pointer transition-all duration-300 group py-6 border-b border-gray-700">
                    <div className="relative">
                      <Shield className="w-8 h-8" />
                      <Check className="absolute inset-0 w-4 h-4 text-gray-300 group-hover:text-white transition-colors m-auto" />
                    </div>
                    <span className="text-xl font-medium relative">
                      Our Guarantee
                    </span>
                  </a>
                )}
                <a href="https://discord.gg/bloxmania" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 text-gray-300 hover:text-white cursor-pointer transition-all duration-300 group py-6 border-b border-gray-700">
                  <DiscordIcon className="w-8 h-8" />
                  <span className="text-xl font-medium">Daily Giveaways</span>
                </a>
                <div className="flex items-center space-x-4 text-gray-300 hover:text-white cursor-pointer transition-all duration-300 group py-6 border-b border-gray-700">
                  <FileText className="w-8 h-8" />
                  <span className="text-xl font-medium">Purchasing Guide</span>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
} 