"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ShoppingCart, User, ShoppingBag, Shield, MessageCircle, Zap, ChevronDown, Star, X, HelpCircle, FileText, Menu, Check } from "lucide-react";
import { DiscordIcon } from "@/components/ui/discord-icon";
import { useState, useEffect } from "react";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll event
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

    // Run once at start
    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const faqItems = [
    {
      question: "Is BloxMania a trusted place to buy digital goods?",
      answer: "Yes! BloxMania is a safe and reliable marketplace for purchasing a variety of in-game items for titles such as Roblox, Fortnite and more. With thousands of successful orders, quick delivery, secure payments, and fantastic customer support, BloxMania ensures a smooth and trustworthy buyer experience."
    },
    {
      question: "How do I receive my purchase?",
      answer: "Receiving your purchase is fast and simple! After completing your payment, our automated system will process your order and deliver your items to the email you used during checkout. You'll receive a confirmation email containing your order as well as a set of instructions on how to redeem your items subject to the game you made the purchase for. We strongly advise you check out the purchasing guide which explains the delivery process in greater detail."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept a wide range of payment options, including Apple Pay, Google Pay, credit/debit cards, and other secure payment systems. All transactions are processed through trusted payment gateways to ensure your financial information remains secure."
    },
    {
      question: "Is my purchase secure and safe?",
      answer: "Absolutely! We use industry-standard security measures to protect your information. All transactions are encrypted, and we never store sensitive payment data. Your safety and security are our top priorities."
    },
    {
      question: "Do you offer refunds?",
      answer: "Since all items are digital goods, we do not offer refunds once an order has been delivered. However, if there is an issue such as an item not being received due to an error on our end, our support team is available 24/7 to assist. If a refund is necessary, it will be processed according to our policy."
    }
  ];

  return (
    <div className="min-h-screen text-white relative" style={{ backgroundImage: `url('/slam.png')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      {/* Header */}
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
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              />
            </div>

            {/* Center: Mobile Logo / Desktop Navigation */}
            <div className="flex justify-center flex-1 min-w-0">
              {/* Mobile Logo - Center on mobile */}
              <img 
                src="/BM.png" 
                alt="BM Logo" 
                className="md:hidden h-12 w-auto cursor-pointer" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
                <div className="flex items-center space-x-1 lg:space-x-2 text-gray-300 hover:text-white cursor-pointer transition-all duration-300 whitespace-nowrap group flex-shrink-0">
                  <a href="/guarantee" className="flex items-center space-x-1 lg:space-x-2">
                    <div className="relative">
                      <Shield className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" />
                      <Check className="absolute inset-0 w-2.5 h-2.5 lg:w-3 lg:h-3 xl:w-3.5 xl:h-3.5 text-gray-300 group-hover:text-white transition-colors m-auto" />
                    </div>
                    <span className="text-base lg:text-lg xl:text-xl relative">
                      Our Guarantee
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ffd800] transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                </div>
                <div className="flex items-center space-x-1 lg:space-x-2 text-gray-300 hover:text-white cursor-pointer transition-all duration-300 whitespace-nowrap group flex-shrink-0">
                  <a href="https://discord.gg/bloxmania" className="flex items-center space-x-1 lg:space-x-2">
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
              <img src="/BM.png" alt="BM Logo" className="h-12 w-auto" />
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
                <a href="/guarantee" className="flex items-center space-x-4 text-gray-300 hover:text-white cursor-pointer transition-all duration-300 group py-6 border-b border-gray-700">
                  <div className="relative">
                    <Shield className="w-8 h-8" />
                    <Check className="absolute inset-0 w-4 h-4 text-gray-300 group-hover:text-white transition-colors m-auto" />
                  </div>
                  <span className="text-xl font-medium">Our Guarantee</span>
                </a>
                <a href="https://discord.gg/bloxmania" className="flex items-center space-x-4 text-gray-300 hover:text-white cursor-pointer transition-all duration-300 group py-6 border-b border-gray-700">
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

      {/* Hero Section */}
      <section
        className="relative py-24 pt-32"
      >
        <div className="relative container mx-auto px-4 text-center" style={{ paddingTop: '35px' }}>
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-center mb-6">
              <img src="/ratingz.png" alt="Rating" className="h-12 w-auto transition-all duration-300 transform scale-110 hover:scale-125 drop-shadow-[0_0_10px_rgba(255,216,0,0.5)] cursor-pointer" />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Instantly Buy Your Favorite Items - Fast,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 animate-pulse bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-[length:200%_200%] animate-gradient">
                Safe, and Easy!
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-4xl mx-auto">
              BloxMania is the fastest, cheapest, and safest shop for digital goods, with instant delivery. Our{" "}
              <span className="text-[#ffd800] font-semibold">automated system</span> ensures you receive your items securely and swiftly!
            </p>
            <Button size="lg" className="bg-[#ffd800] hover:bg-[#e6c200] text-white px-10 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
              SHOP NOW
            </Button>
            
            {/* Trusted by Top Creators Section */}
            <div className="mt-16">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
                Trusted by <span className="text-[#ffd800]">Top</span> Creators
              </h3>
              
              {/* Animated Creator Reel */}
              <div className="relative overflow-hidden creator-reel-container">
                <div className="flex animate-scroll space-x-12">
                  {/* First set of images */}
                  {[
                    { image: '/Creators/Ali-A.png', name: 'Ali-A', subs: '19.6M', channel: 'https://www.youtube.com/@AliA' },
                    { image: '/Creators/CaseOh.png', name: 'CaseOh', subs: '8M', channel: 'https://www.youtube.com/@caseoh_' },
                    { image: '/Creators/DanTDM.png', name: 'DanTDM', subs: '29M', channel: 'https://www.youtube.com/@DanTDM' },
                    { image: '/Creators/Flamingo.png', name: 'Flamingo', subs: '13M', channel: 'https://www.youtube.com/@Flamingo' },
                    { image: '/Creators/KreekCraft.png', name: 'KreekCraft', subs: '12M', channel: 'https://www.youtube.com/@KreekCraft' },
                    { image: '/Creators/LanasLife.png', name: 'LanasLife', subs: '7.5M', channel: 'https://www.youtube.com/@Lanaslifeee' },
                    { image: '/Creators/SypherPK.png', name: 'SypherPK', subs: '10.6M', channel: 'https://www.youtube.com/@SypherPK' },
                    { image: '/Creators/TypicalGamer.png', name: 'TypicalGamer', subs: '15M', channel: 'https://www.youtube.com/@TypicalGamer' }
                  ].map((creator, index) => (
                    <div key={`first-${index}`} className="flex-shrink-0 text-center">
                      <a href={creator.channel} target="_blank" rel="noopener noreferrer">
                        <img
                          src={creator.image}
                          alt={creator.name}
                          className="w-20 h-20 md:w-24 md:h-24 mb-1 transition-all duration-300 transform hover:scale-110 cursor-pointer"
                        />
                      </a>
                      <p className="text-sm text-white font-medium whitespace-nowrap">{creator.name}</p>
                      <div className="flex items-center justify-center space-x-1 mt-1">
                        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        <span className="text-xs text-white">{creator.subs}</span>
                      </div>
                    </div>
                  ))}
                  
                  {/* Duplicate set for seamless loop */}
                  {[
                    { image: '/Creators/Ali-A.png', name: 'Ali-A', subs: '19.6M', channel: 'https://www.youtube.com/@AliA' },
                    { image: '/Creators/CaseOh.png', name: 'CaseOh', subs: '8M', channel: 'https://www.youtube.com/@caseoh_' },
                    { image: '/Creators/DanTDM.png', name: 'DanTDM', subs: '29M', channel: 'https://www.youtube.com/@DanTDM' },
                    { image: '/Creators/Flamingo.png', name: 'Flamingo', subs: '13M', channel: 'https://www.youtube.com/@Flamingo' },
                    { image: '/Creators/KreekCraft.png', name: 'KreekCraft', subs: '12M', channel: 'https://www.youtube.com/@KreekCraft' },
                    { image: '/Creators/LanasLife.png', name: 'LanasLife', subs: '7.5M', channel: 'https://www.youtube.com/@Lanaslifeee' },
                    { image: '/Creators/SypherPK.png', name: 'SypherPK', subs: '10.6M', channel: 'https://www.youtube.com/@SypherPK' },
                    { image: '/Creators/TypicalGamer.png', name: 'TypicalGamer', subs: '15M', channel: 'https://www.youtube.com/@TypicalGamer' }
                  ].map((creator, index) => (
                    <div key={`second-${index}`} className="flex-shrink-0 text-center">
                      <a href={creator.channel} target="_blank" rel="noopener noreferrer">
                        <img
                          src={creator.image}
                          alt={creator.name}
                          className="w-20 h-20 md:w-24 md:h-24 mb-1 transition-all duration-300 transform hover:scale-110 cursor-pointer"
                        />
                      </a>
                      <p className="text-white font-medium whitespace-nowrap">{creator.name}</p>
                      <div className="flex items-center justify-center space-x-1 mt-1">
                        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        <span className="text-xs text-white">{creator.subs}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Games */}
      <section className="py-16" style={{ marginTop: '-60px' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Supported Titles</h2>
          <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="rounded-xl p-8 hover:bg-[#2d3142] transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg hover:shadow-xl relative group overflow-hidden border border-transparent hover:border-[#ffd800] shadow-[0_0_20px_rgba(255,216,0,0.3)] hover:shadow-[0_0_30px_rgba(255,216,0,0.5)]" style={{ backgroundImage: 'url(/widget-backing.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
              <div className="relative z-10">
                <img
                  src="/grow.png"
                  alt="Grow A Garden"
                  className="w-40 h-40 mx-auto rounded-xl mb-6 shadow-md transition-all duration-300 group-hover:blur-sm"
                />
                <h3 className="text-xl font-semibold transition-all duration-300 group-hover:blur-sm">Grow A Garden</h3>
              </div>
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">Coming Soon</h3>
                  <p className="text-gray-300">Stay tuned for updates!</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl p-8 hover:bg-[#2d3142] transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg hover:shadow-xl relative group overflow-hidden border border-transparent hover:border-[#ffd800] shadow-[0_0_20px_rgba(255,216,0,0.3)] hover:shadow-[0_0_30px_rgba(255,216,0,0.5)]" style={{ backgroundImage: 'url(/widget-backing.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
              <div className="relative z-10">
                <img
                  src="https://ext.same-assets.com/85213452/990301288.jpeg"
                  alt="Pet Simulator 99"
                  className="w-40 h-40 mx-auto rounded-xl mb-6 shadow-md transition-all duration-300 group-hover:blur-sm"
                />
                <h3 className="text-xl font-semibold transition-all duration-300 group-hover:blur-sm">Pet Simulator 99</h3>
              </div>
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">Coming Soon</h3>
                  <p className="text-gray-300">Stay tuned for updates!</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl p-8 hover:bg-[#2d3142] transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg hover:shadow-xl relative group overflow-hidden border border-transparent hover:border-[#ffd800] shadow-[0_0_20px_rgba(255,216,0,0.3)] hover:shadow-[0_0_30px_rgba(255,216,0,0.5)]" style={{ backgroundImage: 'url(/widget-backing.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
              <div className="relative z-10">
                <img
                  src="/fortnite.png"
                  alt="Fortnite"
                  className="w-40 h-40 mx-auto rounded-xl mb-6 shadow-md transition-all duration-300 group-hover:blur-sm"
                />
                <h3 className="text-xl font-semibold transition-all duration-300 group-hover:blur-sm">Fortnite</h3>
              </div>
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">Coming Soon</h3>
                  <p className="text-gray-300">Stay tuned for updates!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20" style={{ backgroundImage: "url(/okok1.png)", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Featured Items</h2>
            <Button variant="outline" className="border-[#ffd800] text-[#ffd800] hover:bg-[#ffd800] hover:text-black transition-all duration-300 cursor-pointer">
              View all →
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[
              { name: "10 Trillion Sheckles", price: "$15.99", image: "/10T.jpg" },
              { name: "Raccoon", price: "$12.99", image: "/RACCOON.jpg" },
              { name: "Fennec Fox", price: "$24.99", image: "/FENNEC.jpg" },
              { name: "Disco Bee", price: "$17.99", image: "/DISCO-BEE.jpg" },
              { name: "Dragonfly", price: "$12.99", image: "/DRAGONFLY.jpg" }
            ].map((item) => (
              <Card key={item.name} className="border-[#333441] hover:border-[#ffd800] transition-all duration-300 transform hover:scale-105 hover:shadow-xl h-full flex flex-col" style={{ backgroundImage: "url(/widget-backing.png)", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
                <CardContent className="p-4 sm:p-6 lg:p-8 flex-1 flex flex-col">
                  <div className="relative group flex-1 flex flex-col justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 mx-auto rounded-xl mb-4 sm:mb-6 transition-all duration-300 group-hover:brightness-110 object-cover"
                    />
                  </div>
                  <div className="text-center mt-auto">
                    <h3 className="font-semibold text-white mb-2 text-sm sm:text-base lg:text-lg line-clamp-2">{item.name}</h3>
                    <p className="text-[#ffd800] font-bold text-base sm:text-lg lg:text-xl">{item.price}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20" style={{ backgroundImage: "url(/okok2.png)", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#4791f0] mb-8 drop-shadow-[0_0_10px_#4791f0]">Customer Reviews & Ratings</h2>
            <div className="flex flex-col items-center justify-center space-y-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold">
                  Trusted by over <span className="text-[#4791f0]">10,000</span> Happy Customers
                </h3>
              </div>
              <div className="bg-[#1d1e26] p-8 rounded-xl shadow-lg border-2 border-[#4791f0] hover:border-[#4791f0] transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(71,145,240,0.3)] cursor-pointer">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-3xl font-bold text-[#4791f0]">5.0</span>
                  <span className="text-gray-300 text-lg">out of 5.0</span>
                </div>
                <div className="flex space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={`rating-${i}`} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-400 font-semibold">Excellent</p>
                <p className="text-sm text-gray-400">Based on 2000+ reviews</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                text: "Great seller communication! Just as described. Perfect!",
                rating: 5,
                time: "Past 6 months"
              },
              {
                text: "Trustworthy Seller! I had zero problems receiving exactly what I paid for.",
                rating: 5,
                time: "Past year"
              },
              {
                text: "Delivery was rapid, lovely seller and the items were as described.",
                rating: 5,
                time: "Past month"
              },
              {
                text: "really good and trustworthy! totally worth it! great communication",
                rating: 5,
                time: "Past 6 months"
              }
            ].map((review, index) => (
              <Card key={`review-${index}`} className="bg-[#1d1e26] border-[#4791f0] hover:border-[#4791f0] transition-all duration-300 hover:shadow-lg transform hover:scale-105 hover:shadow-[0_0_20px_rgba(71,145,240,0.3)]">
                <CardContent className="p-6">
                  <div className="flex space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={`review-${index}-star-${i}`}
                        className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic text-sm leading-relaxed">"{review.text}"</p>
                  <div className="text-sm">
                    <p className="text-[#4791f0] font-semibold">Customer</p>
                    <p className="text-gray-400">{review.time}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20" style={{ backgroundImage: "url(/okok1.png)", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why Choose BloxMania?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-yellow-600 to-orange-600 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <Zap className="w-12 h-12 text-white mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Fast and Reliable</h3>
              <p className="text-white/90 leading-relaxed">
                Our automated system ensures your items are delivered almost instantly. Our dedicated team is
                here to ensure your order is delivered as fast as possible.
              </p>
            </div>
            <div className="bg-gradient-to-br from-red-600 to-pink-600 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <Shield className="w-12 h-12 text-white mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Secure Transactions</h3>
              <p className="text-white/90 leading-relaxed">
                We use trusted payment systems to keep your data safe and secure.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-600 to-teal-600 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <MessageCircle className="w-12 h-12 text-white mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">24/7 Support</h3>
              <p className="text-white/90 leading-relaxed">
                Our dedicated support team is always here to help you. If you ever have an issue,
                join our discord and we will assist you right away.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20" style={{ backgroundImage: "url(/okok2.png)", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {faqItems.map((item, index) => (
              <Collapsible
                key={`faq-${index}`}
                open={openFaq === index}
                onOpenChange={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full"
              >
                <div className="faq-item bg-[#1d1e26] border border-[#333441] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <CollapsibleTrigger className="w-full text-left focus:outline-none">
                    <div className="p-6 hover:bg-[#2d3142] transition-colors duration-200">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg text-white pr-4 flex-1 leading-tight">{item.question}</h3>
                        <ChevronDown 
                          className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                            openFaq === index ? 'rotate-180' : ''
                          }`} 
                        />
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="overflow-hidden">
                    <div className="px-6 pb-6 pt-2 faq-content-enter">
                      <div className="border-t border-[#333441] pt-4">
                        <p className="text-gray-300 leading-relaxed text-base whitespace-normal break-words">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1d1e26] py-16 border-t border-[#333441]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-[#ffd800] mb-4">Social Media</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">
                  <a href="https://www.tiktok.com/@blox.maniastore?_t=ZN-8xlRMRiC6Ok&_r=1">TikTok</a>
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  <a href="https://discord.gg/bloxmania">Discord</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#ffd800] mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Contact Us</li>
                <li className="hover:text-white cursor-pointer transition-colors">FAQ</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#ffd800] mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Terms Of Service</li>
                <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-white cursor-pointer transition-colors">Refund Policy</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-[#333441] text-center text-gray-400 text-sm">
            <p>© 2025 BloxMania</p>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      {showChat && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-[#252730] border border-[#333441] rounded-lg shadow-2xl z-50">
          <div className="bg-[#59bab9] text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Chat Support</h3>
            <X className="w-5 h-5 cursor-pointer" onClick={() => setShowChat(false)} />
          </div>
          <div className="p-4 h-80 flex items-center justify-center text-gray-400">
            <p>Chat support coming soon!</p>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 bg-[#ffd800] hover:bg-[#e6c200] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-40 cursor-pointer"
      >
        <MessageCircle className="w-6 h-6" />
        <Badge className="absolute -top-2 -right-2 bg-red-500 text-xs">1</Badge>
      </button>
    </div>
  );
}
