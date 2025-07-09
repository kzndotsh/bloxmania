import Header from "@/components/Header";
import { Shield, Check, Zap, Tag, MessageCircle, Star } from "lucide-react";

export default function GuaranteePage() {
  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center px-4 py-16" style={{ backgroundImage: "url(/okok1.png)", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
      <Header />
      <div className="max-w-2xl w-full text-center mb-12 pt-32">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <span className="font-semibold text-gray-200 text-lg">Excellent</span>
          <span className="flex items-center text-[#ffd800] font-bold text-lg"><Star className="w-5 h-5 mr-1 fill-[#ffd800]" />5.0</span>
          <span className="text-gray-400 text-lg">out of 5</span>
          <span className="text-green-400 font-semibold text-lg">Trusted</span>
        </div>
        
        {/* Icons positioned around the heading */}
        <div className="relative">
          {/* Left side icons in organic formation */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/3 -translate-x-[28rem]">
            <div className="flex flex-col items-center space-y-24">
              <img src="/ICON1.png" alt="Icon 1" className="w-24 h-24 opacity-60 transform -translate-x-8 drop-shadow-[0_0_20px_rgba(251,146,60,0.6)]" />
              <div className="flex space-x-32">
                <img src="/ICON2.png" alt="Icon 2" className="w-24 h-24 opacity-60 transform translate-y-4 drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]" />
                <img src="/ICON3.png" alt="Icon 3" className="w-24 h-24 opacity-60 transform -translate-y-2 drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]" />
              </div>
            </div>
          </div>
          
          {/* Right side icons in organic formation */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/3 translate-x-[28rem]">
            <div className="flex flex-col items-center space-y-24">
              <img src="/ICON4.png" alt="Icon 4" className="w-24 h-24 opacity-60 transform translate-x-8 drop-shadow-[0_0_20px_rgba(255,216,0,0.6)]" />
              <div className="flex space-x-32">
                <img src="/ICON5.png" alt="Icon 5" className="w-24 h-24 opacity-60 transform -translate-y-4 drop-shadow-[0_0_20px_rgba(34,197,94,0.6)]" />
                <img src="/ICON6.png" alt="Icon 6" className="w-24 h-24 opacity-60 transform translate-y-2 drop-shadow-[0_0_20px_rgba(239,68,68,0.6)]" />
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight relative z-10">
            Your Satisfaction, Our <span className="underline decoration-[#ffd800]">Promise</span>
          </h1>
        </div>
        
        <p className="text-lg text-gray-300 mb-6">
          At BloxMania, we're dedicated to delivering joy straight to your gaming experience. When you make a purchase, you want it quick, easy, and secure—and that's exactly what we deliver!
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#3b82f6]/90 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-[#3b82f6]/30 hover:border-[#3b82f6]/60 cursor-default"><Zap className="w-5 h-5 mr-2" /> Fast Delivery</span>
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#ffd800]/90 text-[#181926] font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-[#ffd800]/30 hover:border-[#ffd800]/60 cursor-default"><Tag className="w-5 h-5 mr-2" /> Best Prices</span>
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#3b82f6]/90 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-[#3b82f6]/30 hover:border-[#3b82f6]/60 cursor-default"><MessageCircle className="w-5 h-5 mr-2" /> 24/7 Support</span>
        </div>
      </div>
      <div className="max-w-3xl w-full bg-[#23243a] rounded-2xl shadow-xl pt-6 pb-8 px-8 md:pt-8 md:pb-12 md:px-12 flex flex-col items-center border-2 border-white/15 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer">
        <div className="relative mb-4">
          <Shield className="w-12 h-12 text-[#ffd800]" />
          <Check className="absolute inset-0 w-6 h-6 text-[#ffd800] m-auto" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#ffd800]">Our Guarantee</h2>
        <p className="text-gray-200 text-lg mb-6 text-center">
          We promise a smooth, secure, and reliable experience every time you shop with BloxMania. If you ever have an issue with your order, our support team is available 24/7 to help you resolve it quickly.
        </p>
        <ul className="text-left text-gray-300 space-y-3 mb-6">
          <li><b>Flawless Delivery:</b> We ensure your items are delivered securely and efficiently every time.</li>
          <li><b>Best Prices:</b> We constantly monitor the market to ensure you get the best deals.</li>
          <li><b>24/7 Support:</b> Our friendly team is always here to help, day or night.</li>
          <li><b>Secure Payments:</b> All transactions are processed through trusted gateways like Stripe, Apple Pay, and Google Pay.</li>
          <li><b>Refund Policy:</b> If you don't receive your order due to an error on our end, you'll get a full refund according to our policy.</li>
        </ul>
        <div className="text-sm text-gray-400 text-center">
          BloxMania operates independently and is not affiliated with Roblox Corporation or any game publishers. All trademarks are property of their respective owners.
        </div>
      </div>
      
      {/* New section with controller image and promotional text */}
      <div className="max-w-6xl w-full mt-6 lg:mt-12 flex flex-col lg:flex-row items-center gap-0 lg:gap-12">
        {/* Controller Image */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <img 
            src="/controller.png" 
            alt="Gaming Controller" 
            className="w-96 h-96 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] object-contain transition-all duration-300 transform hover:scale-105 drop-shadow-[0_0_1px_rgba(255,255,255,0.3)] cursor-pointer"
          />
        </div>
        
        {/* Promotional Text */}
        <div className="flex-1 text-center lg:text-left">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-white leading-tight">
            Why Wait? Join the Thousands of Happy <span className="text-[#ffd800]">BloxMania</span> Customers Today!
          </h3>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            With BloxMania, you're not just buying items - you're joining a community that's all about fast, secure, and happy transactions. So go ahead, make that purchase, and let us show you how we do it!
          </p>
          <button className="bg-[#ffd800] hover:bg-[#e6c200] text-black font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
            Shop Now!
          </button>
        </div>
      </div>
    </div>
  );
} 