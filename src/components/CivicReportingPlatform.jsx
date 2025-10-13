// import React, { useState, useEffect } from 'react';
// import { 
//   MapPin, 
//   Users, 
//   CheckCircle, 
//   AlertTriangle, 
//   Camera, 
//   TrendingUp, 
//   Shield, 
//   Droplets, 
//   Car, 
//   Trash2, 
//   Lightbulb, 
//   TreePine, 
//   Building,
//   Star,
//   ArrowRight,
//   Play,
//   Eye,
//   Award,
//   Zap,
//   Globe,
//   Target,
//   Sparkles,
//   Settings,
//   Clock,
//   Layers,
//   BarChart3,
//   Smartphone,
//   Monitor
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from "react-i18next";
// import i18n from "../i18n"; // import i18n instance




// const PremiumGovCivicPlatform = () => {
//   const { t } = useTranslation(); 
//   const [activeCard, setActiveCard] = useState(null);
//   const [scrollY, setScrollY] = useState(0);
//   const [isVisible, setIsVisible] = useState({});
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleScroll = () => setScrollY(window.scrollY);
//     const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    
//     window.addEventListener('scroll', handleScroll);
//     window.addEventListener('mousemove', handleMouseMove);
    
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
//           }
//         });
//       },
//       { threshold: 0.1, rootMargin: '50px' }
//     );

//     const sections = document.querySelectorAll('[id]');
//     sections.forEach(section => observer.observe(section));

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       window.removeEventListener('mousemove', handleMouseMove);
//       observer.disconnect();
//     };
//   }, []);

//    const toggleLanguage = () => {
//     const newLang = i18n.language === "en" ? "hi" : "en";
//     i18n.changeLanguage(newLang);
//   };


//   const issueCategories = [
//     {
//       icon: Car,
     
//       title: t("Transportation Infrastructure"),
//       description: t("Advanced reporting system for road conditions, traffic"),
//       color: "from-blue-600 via-blue-700 to-indigo-900",
//       bgGradient: "from-blue-50 via-blue-100 to-indigo-100",
//       stats: "2,847 resolved",
//       impact: "93% completion rate",
      
//     },
//     {
//       icon: Droplets,
     
// title: t("Water & Sanitation"),
//       description: t("Comprehensive water management system addressing supply, quality"),

//       color: "from-cyan-500 via-teal-600 to-blue-800",
//       bgGradient: "from-cyan-50 via-teal-100 to-blue-100",
//       stats: "1,892 resolved",
//       impact: "87% completion rate",
      
//     },
//     {
//       icon: Trash2,
     
//  title: t("Smart Waste Management"),
//       description: t("Intelligent waste collection and recycling programs with IoT-enabled monitoring systems"),
//       bgGradient: "from-emerald-50 via-green-100 to-teal-100",
//       stats: "3,563 resolved",
//       impact: "91% completion rate",
      
//     },
//     {
//       icon: Lightbulb,
//       title: t("Smart Lighting & Safety"),
//       description: t("AI-powered street lighting and public safety infrastructure with energy optimization"),
//       color: "from-amber-500 via-orange-600 to-red-700",
//       bgGradient: "from-amber-50 via-orange-100 to-red-100",
//       stats: "1,674 resolved",
//       impact: "89% completion rate",
      
//     },
//     {
//       icon: TreePine,
//       title: t("Environmental Protection"),
//       description:t("Sustainable urban development with green initiatives and environmental monitoring"),
//       color: "from-green-500 via-emerald-600 to-teal-800",
//       bgGradient: "from-green-50 via-emerald-100 to-teal-100",
//       stats: "929 resolved",
//       impact: "85% completion rate",
      
//     },
//     {
//       icon: Building,
//       title: t("Public Infrastructure"),
//       description: t("Modern infrastructure development with accessibility and community-focused design"),
//       color: "from-purple-600 via-violet-700 to-indigo-800",
//       bgGradient: "from-purple-50 via-violet-100 to-indigo-100",
//       stats: "1,238 resolved",
//       impact: "96% completion rate",
      
//     }
//   ];

//   const processSteps = [
//     {
      
//       title: t("Smart Issue Detection"),
//       description: t("AI-powered analysis with photo recognition, GPS tagging, and automated categorization through our mobile-first platform"),
//       icon: Smartphone,
//       color: "from-blue-500 via-purple-600 to-indigo-700",
      
//     },
//     {
      
//       title: t("Intelligent Verification"),
//       description: t("Machine learning algorithms verify reports, assess priority levels, and route to appropriate government departments instantly"),
//       icon: Layers,
//       color: "from-indigo-500 via-blue-600 to-cyan-700",
      
//     },
//     {
      
//       title: t("Real-time Assignment"),
//       description: t("Dynamic workflow management assigns issues to qualified teams with performance tracking and accountability metrics"),
//       icon: Settings,
//       color: "from-purple-500 via-pink-600 to-red-700",
      
//     },
//     {
      
//       title: t("Transparent Resolution"),
//       description: t("Live progress tracking with photo updates, citizen feedback integration, and completion verification systems"),
//       icon: Monitor,
//       color: "from-green-500 via-teal-600 to-blue-700",
      
//     }
//   ];

//   const stats = [
//     { number: "2,567", label: t("Issues Reported"), icon: AlertTriangle, color: "from-red-500 via-pink-600 to-purple-700", bg: "from-red-50 to-pink-100" },
//     { number: "2,234+", label: t("Successfully Resolved"), icon: CheckCircle, color: "from-green-500 via-emerald-600 to-teal-700", bg: "from-green-50 to-emerald-100" },
//     { number: "1,643", label: t("Active Citizens"), icon: Users, color: "from-blue-500 via-indigo-600 to-purple-700", bg: "from-blue-50 to-indigo-100" },
//     { number: "91%", label: t("Resolution Rate"), icon: TrendingUp, color: "from-purple-500 via-violet-600 to-indigo-700", bg: "from-purple-50 to-violet-100" }
//   ];

//   const governmentFeatures = [
//     {
//       icon: Shield,
//       title: t("Enterprise Security"),
//       description: t("Military-grade encryption with multi-factor authentication, ensuring complete data protection and privacy compliance"),
//       color: "from-blue-600 via-indigo-700 to-purple-800",
//       bgGradient: "from-blue-50 via-indigo-100 to-purple-100",
      
//     },
//     {
//       icon: Eye,
//       title: t("Live Transparency Dashboard"), 
//       description: t("Real-time analytics with interactive visualizations, progress tracking, and performance metrics for complete visibility"),
//       color: "from-green-600 via-emerald-700 to-teal-800",
//       bgGradient: "from-green-50 via-emerald-100 to-teal-100",
      
//     },
//     {
//       icon: Globe,
//       title: t("Multi-Platform Integration"),
//       description: t("Seamless connectivity across government systems, social media, and mobile platforms for comprehensive coverage"),
//       color: "from-purple-600 via-pink-700 to-red-800",
//       bgGradient: "from-purple-50 via-pink-100 to-red-100",
      
//     },
//     {
//       icon: BarChart3,
//       title: t("Advanced Analytics"),
//       description: t("AI-powered insights with predictive modeling, trend analysis, and data-driven decision support systems"),
//       color: "from-orange-600 via-red-700 to-pink-800",
//       bgGradient: "from-orange-50 via-red-100 to-pink-100",
      
//     },
//     {
//       icon: Target,
//       title: t("Precision Targeting"),
//       description: t("GPS-accurate location mapping with geofencing, demographic analysis, and contextual information systems"),
//       color: "from-cyan-600 via-blue-700 to-indigo-800",
//       bgGradient: "from-cyan-50 via-blue-100 to-indigo-100",
      
//     },
//     {
//       icon: Award,
//       title: t("Performance Excellence"),
//       description: t("Comprehensive KPI tracking with automated reporting, quality assurance, and continuous improvement frameworks"),
//       color: "from-yellow-600 via-orange-700 to-red-800",
//       bgGradient: "from-yellow-50 via-orange-100 to-red-100",
      
//     }
//   ];
// const testimonials = [
//   {
//     name: "Dr. Rajesh Kumar",
//     role: "Municipal Commissioner",
//     image: "/man1.jpg", // ✅ must start with /
//     text: "This revolutionary platform has transformed our governance model. Response times reduced by 80%, citizen satisfaction at all-time high.",
//     rating: 4,
//     department: "jharkhand Municipal Corporation",
//     city: "jharkhand",
//   },
//   {
//     name: "Priya Sharma",
//     role: "Housewife",
//     image: "/women.jpg", // ✅ fixed path
//     text: "The AI-powered analytics provide unprecedented insights into urban challenges. A game-changer for smart city initiatives.",
//     rating: 5,
//     department: "warrior Women",
//     city: "Dhanbad",
//   },
//   {
//     name: "Anil Deshmukh",
//     role: "Farmer",
//     image: "/man2.jpg", // ✅ fixed path
//     text: "Real-time transparency and citizen engagement have revolutionized our administrative efficiency and public trust.",
//     rating: 4,
//     department: " Ranchi Citizen",
//     city: " Ranchi",
//   },
// ];

//   return (
//     <div className="min-h-screen bg-white overflow-hidden">
//      <div className="min-h-screen bg-white overflow-hidden">
//   <style jsx>{`
//     @keyframes slide-in {
//       from { opacity: 0; transform: translateY(40px); }
//       to { opacity: 1; transform: translateY(0); }
//     }
//     .animate-slide-in { animation: slide-in 0.8s ease-out forwards; }
//     .glass-morphism {
//       background: rgba(255, 255, 255, 0.1);
//       backdrop-filter: blur(12px);
//       border: 1px solid rgba(255, 255, 255, 0.15);
//     }
//   `}</style>
//   <button
//           onClick={toggleLanguage}
//           className="mb-4 px-3 py-1 bg-white text-blue-700 rounded font-semibold"
//         >
//           {i18n.language === "en" ? "हिंदी" : "English"}
//         </button>
// <section
//   className="relative min-h-screen bg-gray-900 flex items-center"
//   id="hero"
// >
//   {/* Background Slideshow */}
//   <div className="absolute inset-0 w-full mt-12 h-full overflow-hidden">
//     {["/min2.jpeg", "/hero-img2.avif", "/hero-img5.webp", "/hero-img6.jpg"].map(
//       (src, i) => (
//         <img
//           key={i}
//           src={src}
//           alt={`Jharkhand Digital ${i + 1}`}
//           className="slideshow-img absolute inset-0 w-full h-full object-cover object-center opacity-0 transition-opacity duration-[2000ms]"
//         />
//       )
//     )}
//   </div>

//   {/* Dark Overlay */}
//   <div className="absolute inset-0 bg-black/40"></div>

//   {/* Gradient Overlay */}
//   <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 via-blue-500/10 to-gray-500/10">
//     <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/10 to-indigo-500/10"></div>
//   </div>

//   {/* Content (unchanged) */}
//   <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20">
//     <div className="grid lg:grid-cols-2 gap-12 items-center">
//       {/* Left side (Text) */}
//       <div className="space-y-8 animate-slide-in">
//         <div className="inline-flex items-center glass-morphism px-5 py-3 rounded-xl text-white shadow-md">
//           <Shield className="w-4 h-4 mr-2 text-blue-400" />
//           <span className="font-semibold">
//             🇮🇳 Government of Jharkhand Digital Platform
//           </span>
//         </div>

//         <h1 className="text-3xl lg:text-5xl pb-10 font-bold leading-tight text-white/80">
//           Digital Jharkhand <br />
//           <span className="text-gray-200">Revolution</span>
//         </h1>

//         <p className="text-lg text-white leading-relaxed font-light max-w-xl">
//           Experience the future of civic engagement through our AI-powered
//           platform. Report issues instantly and track resolutions in real-time.
//         </p>
// <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
//   <div className="inline-flex items-start gap-3 bg-white/10 p-4 rounded-lg shadow-sm max-w-max">
//     <MapPin className="w-5 h-5 text-green-400 mt-1" />
//     <div>
//       <p className="text-white font-semibold text-sm">Coverage Across Jharkhand</p>
//       <p className="text-gray-200 text-xs">All major cities and districts included</p>
//     </div>
//   </div>
// <div className="inline-flex items-start gap-3 bg-white/10 p-4 rounded-lg shadow-sm max-w-max">
//   <Clock className="w-5 h-5 text-yellow-400 mt-1" />
//   <div>
//     <p className="text-white font-semibold text-sm">Citizen-Centric Services</p>
//     <p className="text-gray-200 text-xs">Simplifying access to government facilities for all residents</p>
//   </div>
// </div>

// <div className="inline-flex items-start gap-3 bg-white/10 p-4 rounded-lg shadow-sm max-w-max">
//   <Clock className="w-5 h-5 text-yellow-400 mt-1" />
//   <div>
//     <p className="text-white font-semibold text-sm">Transparent Governance</p>
//     <p className="text-gray-200 text-xs">Ensuring accountability and efficiency across Jharkhand</p>
//   </div>
// </div>


//   <div className="inline-flex items-start gap-3 bg-white/10 p-4 rounded-lg shadow-sm max-w-max">
//     <Star className="w-5 h-5 text-indigo-400 mt-1" />
//     <div>
//       <p className="text-white font-semibold text-sm">High Success Rate</p>
//       <p className="text-gray-200 text-xs">Government initiatives executed effectively</p>
//     </div>
//   </div>
// </div>


//         <div className="grid grid-cols-3 gap-8 pt-10">
//           <div className="text-center">
//             <div className="text-3xl font-bold text-white">2,234+</div>
//             <div className="text-gray-200 text-sm">Issues Resolved</div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-bold text-white">10+</div>
//             <div className="text-gray-200 text-sm">Smart Cities</div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-bold text-white">91%</div>
//             <div className="text-gray-200 text-sm">Success Rate</div>
//           </div>
//         </div>
//       </div>

//       {/* Right side empty (kept for layout) */}
//       <div></div>
//     </div>
//   </div>
// </section>


// </div>

//       {/* Premium Stats Section */}
//       <section className="py-24 bg-[#f0f6fa]  relative" id="stats">
//         <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 via-blue-500/5 to-gray-500/5"></div>
        
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <div className="text-5xl mb-6"></div>
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">Platform Impact Metrics</h2>
//             <p className="text-xl text-gray-600">Real-time performance dashboard</p>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {stats.map((stat, index) => (
//               <div 
//                 key={index} 
//                 className={``}
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className={`relative bg-gradient-to-br ${stat.bg} p-8 rounded-3xl shadow-xl transition-all border border-gray-200/50`}>
//                   <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${stat.color} rounded-2xl mb-6 shadow-lg  transition-transform`}>
//                     <stat.icon className="w-10 h-10 text-white" />
//                   </div>
//                   <div className="text-4xl font-bold text-gray-900 mb-3  transition-colors">{stat.number}</div>
//                   <div className="text-gray-600 font-medium text-lg">{stat.label}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       {/* Process Section (Gov Style with Image Slots) */}
// <section className="relative py-24" id="process">
//   {/* Background with Black Overlay */}
//   <div className="absolute inset-0">
//     <img
//       src="/jh-img.jpg" // Use any Jharkhand gov / civic styled background
//       alt="Government Background"
//       className="w-full h-full object-cover"
//     />
//     {/* Translucent black layer */}
//     <div className="absolute inset-0 bg-black opacity-60"></div>
//   </div>

//   {/* Content */}
//   <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//     {/* Header */}
//     <div className="text-center mb-16">
//       {/* Tricolor Strip */}
//       <div className="flex w-40 mx-auto mb-6 rounded overflow-hidden shadow-md">
//         <div className="flex-1 h-2 bg-[#FF9933]"></div>
//         <div className="flex-1 h-2 bg-white"></div>
//         <div className="flex-1 h-2 bg-[#138808]"></div>
//       </div>

//       <h2 className="text-4xl pt-10 md:text-5xl font-bold text-white">
//         How Our AI-Enabled System Works
//       </h2>
//     </div>

//     {/* Process Steps */}
//     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
//       {processSteps.map((step, index) => (
//         <div
//           key={index}
//           className="bg-white/90 border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all backdrop-blur-sm"
//         >
//           <div className="text-center space-y-6">
//             {/* Step Number */}
//             <div className="text-5xl font-bold text-gray-300">{step.step}</div>

//             {/* Icon */}
//             <div
//               className="w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-md"
//               style={{
//                 backgroundColor: index % 2 === 0 ? "#FF9933" : "#138808",
//               }}
//             >
//               <step.icon className="w-8 h-8 text-white" />
//             </div>

//             {/* Title & Description */}
//             <h3 className="text-lg font-semibold text-gray-900">
//               {step.title}
//             </h3>
//             <p className="text-sm text-gray-600 leading-relaxed">
//               {step.description}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// </section>


     
//   {/* Issue Categories (Gov Style with Tricolor Banner) */}
// <section className="py-24 bg-[#f0f6fa] relative" id="categories">
//   <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//     {/* Header with Tricolor Banner */}
//     <div className="text-center mb-16">
//       {/* 🇮🇳 Tricolor Banner */}
//       <div className="flex w-40 mx-auto mb-6 rounded overflow-hidden shadow-sm">
//         <div className="flex-1 h-2 bg-[#FF9933]"></div> {/* Saffron */}
//         <div className="flex-1 h-2 bg-white"></div>     {/* White */}
//         <div className="flex-1 h-2 bg-[#138808]"></div> {/* Green */}
//       </div>

//       <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//         Citizen Service <span className="text-[#000080]">Categories</span>
//       </h2>
//       <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
//         Officially recognized issue categories to help citizens report and track
//         urban problems effectively.
//       </p>
//     </div>

//     {/* Categories Grid */}
//     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//       {issueCategories.map((category, index) => (
//         <div
//           key={index}
//           className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
//         >
//           {/* Icon with Indian flag accents */}
//           <div
//             className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
//             style={{
//               backgroundColor: index % 2 === 0 ? "#FF9933" : "#138808",
//             }}
//           >
//             <category.icon className="w-7 h-7 text-white" />
//           </div>

//           {/* Title & Description */}
//           <h3 className="text-xl font-semibold text-gray-900 mb-3">
//             {category.title}
//           </h3>
//           <p className="text-gray-700 text-sm leading-relaxed mb-6">
//             {category.description}
//           </p>

//           {/* Official-style button */}
//           <button
//             onClick={() => navigate("/citizen-login")}
//             className="w-full bg-[#000080] text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-900 transition-colors"
//           >
//             Report Issue
//           </button>
//         </div>
//       ))}
//     </div>
//   </div>
// </section>


// {/* Government Features Section */}
// <section className="py-24 bg-[#dff2f7] relative overflow-hidden" id="features">
//   {/* Gradient Overlay */}
//   <div className="absolute inset-0 bg-[#dff2f7]"></div>

//   <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//     {/* Section Heading */}
//     <div className="text-center mb-16">
//       <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
//         Platform <span className="text-red-950">Features</span>
//       </h2>
//       <p className="text-lg text-red-950 max-w-3xl mx-auto leading-relaxed">
//         Built to support citizens with transparency, accountability and efficiency.
//       </p>
//     </div>

//     {/* Features Grid */}
//     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
//       {governmentFeatures.map((feature, index) => (
//         <div
//           key={index}
//           className="bg-gray-800/80 rounded-xl p-8 shadow border border-gray-700 hover:border-green-500 transition-all"
//         >
//           <div className="flex flex-col items-center text-center space-y-5">
//             {/* Icon */}
//             <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-md flex items-center justify-center shadow`}>
//               <feature.icon className="w-7 h-7 text-white" />
//             </div>

//             {/* Title */}
//             <h3 className="text-lg font-semibold text-white">
//               {feature.title}
//             </h3>

//             {/* Description */}
//             <p className="text-white text-sm leading-relaxed">
//               {feature.description}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// </section>


//       {/* Premium Testimonials */}
// <section className="py-24 bg-[#f0f6fa] relative" id="testimonials">
//   <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-blue-500/5 to-cyan-500/5"></div>
  
//   <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//     <div className="text-center mb-20">
//       <h2 className="text-5xl md:text-6xl font-bold text-red-950 mb-8">
//         Government
//         <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent"> Success Stories</span>
//       </h2>
//       <p className="text-2xl text-red-950 max-w-4xl mx-auto leading-relaxed">
//         Transforming governance of jharkhand and Citizens Golden review's
//       </p>
//     </div>
    
//     <div className="grid md:grid-cols-3 gap-10">
//       {testimonials.map((testimonial, index) => (
//         <div 
//           key={index} 
//           className="animate-slide-in hover-lift"
//           style={{ animationDelay: `${index * 200}ms` }}
//         >
//           <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-200/50 hover:border-blue-300/50 transition-all group premium-shadow">
//             <div className="text-center space-y-6">
              
//               {/* ✅ Image Display */}
//               <div className="flex items-center justify-center">
//                 <img 
//                   src={testimonial.image} 
//                   alt={testimonial.name} 
//                   className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-200"
//                 />
//                 <div className="text-left">
//                   <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
//                     {testimonial.name}
//                   </h4>
//                   <p className="text-gray-600 font-medium">{testimonial.role}</p>
//                   <div className="flex items-center mt-2 text-xs text-gray-500">
//                     <Building className="w-3 h-3 mr-1" />
//                     <span>{testimonial.department}</span>
//                   </div>
//                 </div>
//               </div>
    
//               {/* ✅ Rating */}
//               <div className="flex justify-center mb-6">
//                 {[...Array(testimonial.rating)].map((_, i) => (
//                   <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                 ))}
//               </div>
            
//               <blockquote className="text-gray-700 leading-relaxed italic text-lg">
//                 "{testimonial.text}"
//               </blockquote>
            
//               <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-blue-100 border border-blue-200 text-blue-800 px-4 py-2 rounded-xl text-sm font-semibold">
//                 <MapPin className="w-4 h-4 mr-2" />
//                 {testimonial.city}
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// </section>

// {/* Premium CTA Section with Background Slideshow */}
// <section className="relative py-24 bg-gray-900 overflow-hidden" id="cta">
//   {/* Background Slideshow */}
//   <div className="absolute inset-0 w-full h-full">
//     <div className="absolute inset-0 bg-black/60 z-10"></div> {/* dark overlay for text readability */}
//     <div className="slideshow absolute inset-0 w-full h-full">
//       {["/stempid.jpg", "/potholes.png", "/streetLight.webp", "/cityCleaning.webp"].map((src, i) => (
//         <img
//           key={i}
//           src={src}
//           alt={`Gov Civic Example ${i + 1}`}
//           className="slideshow-img absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-[2000ms]"
//         />
//       ))}
//     </div>
//   </div>

//   {/* Content */}
//   <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
//     <div className="max-w-4xl mx-auto space-y-12">
//       <div className="inline-flex items-center bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl">
//         <Sparkles className="w-6 h-6 mr-3 text-blue-300" />
//         Join the Digital Governance Revolution
//       </div>

//       <h2 className="text-5xl md:text-7xl font-bold leading-tight">
//         Transform Your
//         <br />
//         <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
//           Community Today
//         </span>
//       </h2>

//       <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
//         Experience the future of citizen-government interaction through our AI-powered platform. 
//         Join millions of empowered citizens building smarter, more transparent communities.
//       </p>

//       <div className="flex flex-col sm:flex-row gap-6 justify-center pt-12">
//         <button 
//           onClick={() => navigate('/citizen-login')}
//           className="group bg-gradient-to-r from-blue-600 via-indigo-700 to-blue-800 text-white px-12 py-5 rounded-xl font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center relative overflow-hidden"
//         >
//           <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//           <Camera className="w-6 h-6 mr-3 relative z-10" />
//           <span className="relative z-10">Start Reporting Issues</span>
//           <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform relative z-10" />
//         </button>

//         <button onClick={() => navigate('/')} className="group bg-white/10 backdrop-blur-md text-white px-12 py-5 rounded-xl font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center border border-white/30">
//           <Eye className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
//           Explore Live Dashboard
//         </button>
//       </div>

//       {/* Trust Signals */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 pt-16 max-w-3xl mx-auto">
//         <div className="text-center">
//           <div className="text-4xl font-bold">10+</div>
//           <div className="text-gray-300">Smart Cities Connected</div>
//         </div>
//         <div className="text-center">
//           <div className="text-4xl font-bold">24/7</div>
//           <div className="text-gray-300">AI-Powered Support</div>
//         </div>
//         <div className="text-center">
//           <div className="text-4xl font-bold">100%</div>
//           <div className="text-gray-300">Secure & Transparent</div>
//         </div>
//       </div>

//       {/* Footer Tag */}
//       <div className="mt-16 text-center">
//         <div className="flex items-center justify-center space-x-3 text-white/80 text-lg">
//           <Shield className="w-5 h-5 text-green-400" />
//           <span>Proudly Secured by Government of Jharkhand</span>
//           <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
//         </div>
//         <p className="mt-4 text-gray-400">🇮🇳 Building Digital India Together 🇮🇳</p>
//       </div>
//     </div>
//   </div>
// </section>




//    <div className="bg-[#dff2f7] py-16 px-6 md:px-16 lg:px-24 relative overflow-hidden">
//   {/* Section Heading */}
//   <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6 relative inline-block">
//     About Us
//     <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 border-b-4 border-green-600"></span>
//   </h2>

//   {/* Description */}
//   <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto text-center mt-4">
//     <span className="font-semibold">FixMyCity</span> is an official civic platform 
//     initiated under the guidance of the{" "}
//     <span className="font-semibold text-green-700">Government of Jharkhand</span>.  
//     Our mission is to strengthen citizen–government collaboration by enabling 
//     transparent, fast, and accountable redressal of urban issues.
//   </p>

//   {/* Vision / Mission / Values */}
//   <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-center">
//     <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-green-600">
//       <h3 className="text-xl font-semibold text-green-700 mb-3">Our Vision</h3>
//       <p className="text-gray-600 text-base">
//         To build a cleaner, safer, and more responsive Jharkhand 
//         by empowering citizens to directly report civic concerns.
//       </p>
//     </div>
//     <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-green-600">
//       <h3 className="text-xl font-semibold text-green-700 mb-3">Our Mission</h3>
//       <p className="text-gray-600 text-base">
//         To provide an accessible digital platform for every resident 
//         to raise issues and ensure timely resolution through 
//         official government channels.
//       </p>
//     </div>
//     <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-green-600">
//       <h3 className="text-xl font-semibold text-green-700 mb-3">Our Values</h3>
//       <p className="text-gray-600 text-base">
//         Transparency, accountability, inclusivity, and service to citizens — 
//         the guiding principles of our governance model.
//       </p>
//     </div>
//   </div>

//   {/* Jharkhand Government Branding */}
//   <div className="flex flex-col items-center justify-center mt-14 space-y-4">
//     <div className="flex items-center space-x-4 bg-white px-6 py-3 rounded-xl shadow border border-gray-200">
//       <img src="/Jharkhand-logo.webp" alt="Jharkhand Logo" className="w-14 h-14" />
//       <span className="text-lg font-semibold text-gray-900">
//         Government of Jharkhand
//       </span>
//     </div>

//     {/* Contact Info */}
//     <div className="bg-white px-6 py-4 rounded-xl shadow border border-gray-200 text-center">
//       <p className="text-gray-700 text-base">
//         <span className="font-semibold">Office:</span> 0651-2400240, 2400250 | <span className="font-semibold">Fax:</span> 0651-2400255
//       </p>
//       <p className="text-gray-700 text-base mt-1">
//         <span className="font-semibold">Email:</span> <a href="mailto:cs-jharkhand@nic.in" className="text-green-700 hover:underline">cs-jharkhand@nic.in</a>
//       </p>
//     </div>
//   </div>
// </div>


//     </div>
//   );
// };

// export default PremiumGovCivicPlatform;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Users, 
  CheckCircle, 
  AlertTriangle, 
  Camera, 
  TrendingUp, 
  Shield, 
  Droplets, 
  Car, 
  Trash2, 
  Lightbulb, 
  TreePine, 
  Building,
  Star,
  ArrowRight,
  Play,
  Eye,
  Award,
  Zap,
  Globe,
  Target,
  Sparkles,
  Settings,
  Clock,
  Layers,
  BarChart3,
  Smartphone,
  Monitor,
  Languages
} from 'lucide-react';

const PremiumGovCivicPlatform = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [language, setLanguage] = useState('hi');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const sections = document.querySelectorAll('[id]');
    sections.forEach(section => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  // Translation function
  const t = (key) => {
    const translations = {
      // Hero Section
      "Government of Jharkhand Digital Platform": language === 'hi' ? "🇮🇳 झारखंड सरकार डिजिटल प्लेटफॉर्म" : "🇮🇳 Government of Jharkhand Digital Platform",
      "Digital Jharkhand": language === 'hi' ? "डिजिटल झारखंड" : "Digital Jharkhand",
      "Revolution": language === 'hi' ? "क्रांति" : "Revolution",
      "Experience the future of civic engagement through our AI-powered platform. Report issues instantly and track resolutions in real-time.": language === 'hi' ? "हमारे AI-संचालित प्लेटफॉर्म के माध्यम से नागरिक सहभागिता के भविष्य का अनुभव करें। तुरंत समस्याओं की रिपोर्ट करें और वास्तविक समय में समाधान को ट्रैक करें।" : "Experience the future of civic engagement through our AI-powered platform. Report issues instantly and track resolutions in real-time.",
      
      "Coverage Across Jharkhand": language === 'hi' ? "झारखंड भर में कवरेज" : "Coverage Across Jharkhand",
      "All major cities and districts included": language === 'hi' ? "सभी प्रमुख शहर और जिले शामिल" : "All major cities and districts included",
      "Citizen-Centric Services": language === 'hi' ? "नागरिक-केंद्रित सेवाएं" : "Citizen-Centric Services",
      "Simplifying access to government facilities for all residents": language === 'hi' ? "सभी निवासियों के लिए सरकारी सुविधाओं तक पहुंच को सरल बनाना" : "Simplifying access to government facilities for all residents",
      "Transparent Governance": language === 'hi' ? "पारदर्शी शासन" : "Transparent Governance",
      "Ensuring accountability and efficiency across Jharkhand": language === 'hi' ? "झारखंड भर में जवाबदेही और दक्षता सुनिश्चित करना" : "Ensuring accountability and efficiency across Jharkhand",
      "High Success Rate": language === 'hi' ? "उच्च सफलता दर" : "High Success Rate",
      "Government initiatives executed effectively": language === 'hi' ? "सरकारी पहल प्रभावी रूप से निष्पादित" : "Government initiatives executed effectively",
      
      "Issues Resolved": language === 'hi' ? "समस्याएं हल" : "Issues Resolved",
      "Smart Cities": language === 'hi' ? "स्मार्ट सिटीज" : "Smart Cities",
      "Success Rate": language === 'hi' ? "सफलता दर" : "Success Rate",

      // Stats Section
      "Platform Impact Metrics": language === 'hi' ? "प्लेटफॉर्म प्रभाव मेट्रिक्स" : "Platform Impact Metrics",
      "Real-time performance dashboard": language === 'hi' ? "रियल-टाइम प्रदर्शन डैशबोर्ड" : "Real-time performance dashboard",
      "Issues Reported": language === 'hi' ? "रिपोर्ट की गई समस्याएं" : "Issues Reported",
      "Successfully Resolved": language === 'hi' ? "सफलतापूर्वक हल" : "Successfully Resolved",
      "Active Citizens": language === 'hi' ? "सक्रिय नागरिक" : "Active Citizens",
      "Resolution Rate": language === 'hi' ? "समाधान दर" : "Resolution Rate",

      // Process Section
      "How Our AI-Enabled System Works": language === 'hi' ? "हमारा AI-सक्षम सिस्टम कैसे काम करता है" : "How Our AI-Enabled System Works",
      "Smart Issue Detection": language === 'hi' ? "स्मार्ट समस्या पहचान" : "Smart Issue Detection",
      "AI-powered analysis with photo recognition, GPS tagging, and automated categorization through our mobile-first platform": language === 'hi' ? "हमारे मोबाइल-फर्स्ट प्लेटफॉर्म के माध्यम से फोटो पहचान, GPS टैगिंग और स्वचालित वर्गीकरण के साथ AI-संचालित विश्लेषण" : "AI-powered analysis with photo recognition, GPS tagging, and automated categorization through our mobile-first platform",
      
      "Intelligent Verification": language === 'hi' ? "बुद्धिमान सत्यापन" : "Intelligent Verification",
      "Machine learning algorithms verify reports, assess priority levels, and route to appropriate government departments instantly": language === 'hi' ? "मशीन लर्निंग एल्गोरिदम रिपोर्ट सत्यापित करते हैं, प्राथमिकता स्तरों का आकलन करते हैं, और तुरंत उपयुक्त सरकारी विभागों को भेजते हैं" : "Machine learning algorithms verify reports, assess priority levels, and route to appropriate government departments instantly",
      
      "Real-time Assignment": language === 'hi' ? "रियल-टाइम असाइनमेंट" : "Real-time Assignment",
      "Dynamic workflow management assigns issues to qualified teams with performance tracking and accountability metrics": language === 'hi' ? "डायनामिक वर्कफ़्लो प्रबंधन प्रदर्शन ट्रैकिंग और जवाबदेही मेट्रिक्स के साथ योग्य टीमों को समस्याएं असाइन करता है" : "Dynamic workflow management assigns issues to qualified teams with performance tracking and accountability metrics",
      
      "Transparent Resolution": language === 'hi' ? "पारदर्शी समाधान" : "Transparent Resolution",
      "Live progress tracking with photo updates, citizen feedback integration, and completion verification systems": language === 'hi' ? "फोटो अपडेट, नागरिक फीडबैक एकीकरण और पूर्णता सत्यापन सिस्टम के साथ लाइव प्रगति ट्रैकिंग" : "Live progress tracking with photo updates, citizen feedback integration, and completion verification systems",

      // Categories Section
      "Citizen Service": language === 'hi' ? "नागरिक सेवा" : "Citizen Service",
      "Categories": language === 'hi' ? "श्रेणियां" : "Categories",
      "Officially recognized issue categories to help citizens report and track urban problems effectively.": language === 'hi' ? "नागरिकों को शहरी समस्याओं की प्रभावी रूप से रिपोर्ट करने और ट्रैक करने में मदद करने के लिए आधिकारिक रूप से मान्यता प्राप्त समस्या श्रेणियां।" : "Officially recognized issue categories to help citizens report and track urban problems effectively.",
      
      "Transportation Infrastructure": language === 'hi' ? "परिवहन अवसंरचना" : "Transportation Infrastructure",
      "Advanced reporting system for road conditions, traffic": language === 'hi' ? "सड़क की स्थिति, यातायात के लिए उन्नत रिपोर्टिंग सिस्टम" : "Advanced reporting system for road conditions, traffic",
      
      "Water & Sanitation": language === 'hi' ? "जल और स्वच्छता" : "Water & Sanitation",
      "Comprehensive water management system addressing supply, quality": language === 'hi' ? "आपूर्ति, गुणवत्ता को संबोधित करने वाला व्यापक जल प्रबंधन सिस्टम" : "Comprehensive water management system addressing supply, quality",
      
      "Smart Waste Management": language === 'hi' ? "स्मार्ट कचरा प्रबंधन" : "Smart Waste Management",
      "Intelligent waste collection and recycling programs with IoT-enabled monitoring systems": language === 'hi' ? "IoT-सक्षम मॉनिटरिंग सिस्टम के साथ बुद्धिमान कचरा संग्रह और पुनर्चक्रण कार्यक्रम" : "Intelligent waste collection and recycling programs with IoT-enabled monitoring systems",
      
      "Smart Lighting & Safety": language === 'hi' ? "स्मार्ट लाइटिंग और सुरक्षा" : "Smart Lighting & Safety",
      "AI-powered street lighting and public safety infrastructure with energy optimization": language === 'hi' ? "ऊर्जा अनुकूलन के साथ AI-संचालित स्ट्रीट लाइटिंग और सार्वजनिक सुरक्षा अवसंरचना" : "AI-powered street lighting and public safety infrastructure with energy optimization",
      
      "Environmental Protection": language === 'hi' ? "पर्यावरण संरक्षण" : "Environmental Protection",
      "Sustainable urban development with green initiatives and environmental monitoring": language === 'hi' ? "हरित पहल और पर्यावरण निगरानी के साथ टिकाऊ शहरी विकास" : "Sustainable urban development with green initiatives and environmental monitoring",
      
      "Public Infrastructure": language === 'hi' ? "सार्वजनिक अवसंरचना" : "Public Infrastructure",
      "Modern infrastructure development with accessibility and community-focused design": language === 'hi' ? "पहुंच और समुदाय-केंद्रित डिजाइन के साथ आधुनिक अवसंरचना विकास" : "Modern infrastructure development with accessibility and community-focused design",
      
      "Report Issue": language === 'hi' ? "समस्या की रिपोर्ट करें" : "Report Issue",

      // Features Section
      "Platform": language === 'hi' ? "प्लेटफॉर्म" : "Platform",
      "Features": language === 'hi' ? "सुविधाएं" : "Features",
      "Built to support citizens with transparency, accountability and efficiency.": language === 'hi' ? "पारदर्शिता, जवाबदेही और दक्षता के साथ नागरिकों का समर्थन करने के लिए निर्मित।" : "Built to support citizens with transparency, accountability and efficiency.",
      
      "Enterprise Security": language === 'hi' ? "एंटरप्राइज सुरक्षा" : "Enterprise Security",
      "Military-grade encryption with multi-factor authentication, ensuring complete data protection and privacy compliance": language === 'hi' ? "मल्टी-फैक्टर प्रमाणीकरण के साथ सैन्य-ग्रेड एन्क्रिप्शन, पूर्ण डेटा सुरक्षा और गोपनीयता अनुपालन सुनिश्चित करता है" : "Military-grade encryption with multi-factor authentication, ensuring complete data protection and privacy compliance",
      
      "Live Transparency Dashboard": language === 'hi' ? "लाइव पारदर्शिता डैशबोर्ड" : "Live Transparency Dashboard",
      "Real-time analytics with interactive visualizations, progress tracking, and performance metrics for complete visibility": language === 'hi' ? "पूर्ण दृश्यता के लिए इंटरैक्टिव विज़ुअलाइज़ेशन, प्रगति ट्रैकिंग और प्रदर्शन मेट्रिक्स के साथ रियल-टाइम एनालिटिक्स" : "Real-time analytics with interactive visualizations, progress tracking, and performance metrics for complete visibility",
      
      "Multi-Platform Integration": language === 'hi' ? "मल्टी-प्लेटफॉर्म एकीकरण" : "Multi-Platform Integration",
      "Seamless connectivity across government systems, social media, and mobile platforms for comprehensive coverage": language === 'hi' ? "व्यापक कवरेज के लिए सरकारी सिस्टम, सोशल मीडिया और मोबाइल प्लेटफॉर्म में निर्बाध कनेक्टिविटी" : "Seamless connectivity across government systems, social media, and mobile platforms for comprehensive coverage",
      
      "Advanced Analytics": language === 'hi' ? "उन्नत विश्लेषण" : "Advanced Analytics",
      "AI-powered insights with predictive modeling, trend analysis, and data-driven decision support systems": language === 'hi' ? "भविष्यवाणी मॉडलिंग, ट्रेंड विश्लेषण और डेटा-संचालित निर्णय समर्थन सिस्टम के साथ AI-संचालित अंतर्दृष्टि" : "AI-powered insights with predictive modeling, trend analysis, and data-driven decision support systems",
      
      "Precision Targeting": language === 'hi' ? "सटीक लक्ष्यीकरण" : "Precision Targeting",
      "GPS-accurate location mapping with geofencing, demographic analysis, and contextual information systems": language === 'hi' ? "जियोफेंसिंग, जनसांख्यिकीय विश्लेषण और प्रासंगिक सूचना सिस्टम के साथ GPS-सटीक स्थान मैपिंग" : "GPS-accurate location mapping with geofencing, demographic analysis, and contextual information systems",
      
      "Performance Excellence": language === 'hi' ? "प्रदर्शन उत्कृष्टता" : "Performance Excellence",
      "Comprehensive KPI tracking with automated reporting, quality assurance, and continuous improvement frameworks": language === 'hi' ? "स्वचालित रिपोर्टिंग, गुणवत्ता आश्वासन और निरंतर सुधार ढांचे के साथ व्यापक KPI ट्रैकिंग" : "Comprehensive KPI tracking with automated reporting, quality assurance, and continuous improvement frameworks",

      // Testimonials Section
      "Government": language === 'hi' ? "सरकारी" : "Government",
      "Success Stories": language === 'hi' ? "सफलता की कहानियां" : "Success Stories",
      "Transforming governance of jharkhand and Citizens Golden review's": language === 'hi' ? "झारखंड के शासन और नागरिकों की स्वर्णिम समीक्षा का रूपांतरण" : "Transforming governance of jharkhand and Citizens Golden review's",

      // CTA Section
      "Join the Digital Governance Revolution": language === 'hi' ? "डिजिटल गवर्नेंस क्रांति में शामिल हों" : "Join the Digital Governance Revolution",
      "Transform Your": language === 'hi' ? "अपने का रूपांतरण करें" : "Transform Your",
      "Community Today": language === 'hi' ? "समुदाय आज ही" : "Community Today",
      "Experience the future of citizen-government interaction through our AI-powered platform. Join millions of empowered citizens building smarter, more transparent communities.": language === 'hi' ? "हमारे AI-संचालित प्लेटफॉर्म के माध्यम से नागरिक-सरकार बातचीत के भविष्य का अनुभव करें। स्मार्ट, अधिक पारदर्शी समुदाय बनाने वाले लाखों सशक्त नागरिकों में शामिल हों।" : "Experience the future of citizen-government interaction through our AI-powered platform. Join millions of empowered citizens building smarter, more transparent communities.",
      "Start Reporting Issues": language === 'hi' ? "समस्याओं की रिपोर्ट करना शुरू करें" : "Start Reporting Issues",
      "Explore Live Dashboard": language === 'hi' ? "लाइव डैशबोर्ड एक्सप्लोर करें" : "Explore Live Dashboard",
      "Smart Cities Connected": language === 'hi' ? "स्मार्ट सिटीज कनेक्टेड" : "Smart Cities Connected",
      "AI-Powered Support": language === 'hi' ? "AI-संचालित समर्थन" : "AI-Powered Support",
      "Secure & Transparent": language === 'hi' ? "सुरक्षित और पारदर्शी" : "Secure & Transparent",
      "Proudly Secured by Government of Jharkhand": language === 'hi' ? "गर्व से झारखंड सरकार द्वारा सुरक्षित" : "Proudly Secured by Government of Jharkhand",
      "Building Digital India Together": language === 'hi' ? "मिलकर डिजिटल इंडिया का निर्माण" : "Building Digital India Together",

      // About Section
      "About Us": language === 'hi' ? "हमारे बारे में" : "About Us",
      "is an official civic platform initiated under the guidance of the": language === 'hi' ? "एक आधिकारिक नागरिक प्लेटफॉर्म है जो के मार्गदर्शन में शुरू किया गया है" : "is an official civic platform initiated under the guidance of the",
      "Government of Jharkhand": language === 'hi' ? "झारखंड सरकार" : "Government of Jharkhand",
      "Our mission is to strengthen citizen–government collaboration by enabling transparent, fast, and accountable redressal of urban issues.": language === 'hi' ? "हमारा मिशन शहरी मुद्दों के पारदर्शी, तेज़ और जवाबदेह निवारण को सक्षम करके नागरिक-सरकार सहयोग को मजबूत करना है।" : "Our mission is to strengthen citizen–government collaboration by enabling transparent, fast, and accountable redressal of urban issues.",
      
      "Our Vision": language === 'hi' ? "हमारी दृष्टि" : "Our Vision",
      "To build a cleaner, safer, and more responsive Jharkhand by empowering citizens to directly report civic concerns.": language === 'hi' ? "नागरिकों को नागरिक चिंताओं की सीधे रिपोर्ट करने के लिए सशक्त बनाकर एक स्वच्छ, सुरक्षित और अधिक उत्तरदायी झारखंड का निर्माण करना।" : "To build a cleaner, safer, and more responsive Jharkhand by empowering citizens to directly report civic concerns.",
      
      "Our Mission": language === 'hi' ? "हमारा मिशन" : "Our Mission",
      "To provide an accessible digital platform for every resident to raise issues and ensure timely resolution through official government channels.": language === 'hi' ? "हर निवासी को मुद्दे उठाने और आधिकारिक सरकारी चैनलों के माध्यम से समय पर समाधान सुनिश्चित करने के लिए एक सुलभ डिजिटल प्लेटफॉर्म प्रदान करना।" : "To provide an accessible digital platform for every resident to raise issues and ensure timely resolution through official government channels.",
      
      "Our Values": language === 'hi' ? "हमारे मूल्य" : "Our Values",
      "Transparency, accountability, inclusivity, and service to citizens — the guiding principles of our governance model.": language === 'hi' ? "पारदर्शिता, जवाबदेही, समावेशिता, और नागरिकों की सेवा — हमारे शासन मॉडल के मार्गदर्शक सिद्धांत।" : "Transparency, accountability, inclusivity, and service to citizens — the guiding principles of our governance model.",
      
      "Office": language === 'hi' ? "कार्यालय" : "Office",
      "Fax": language === 'hi' ? "फैक्स" : "Fax",
      "Email": language === 'hi' ? "ईमेल" : "Email"
    };

    return translations[key] || key;
  };

  const issueCategories = [
    {
      icon: Car,
      title: t("Transportation Infrastructure"),
      description: t("Advanced reporting system for road conditions, traffic"),
      color: "from-blue-600 via-blue-700 to-indigo-900",
      bgGradient: "from-blue-50 via-blue-100 to-indigo-100",
      stats: "2,847 resolved",
      impact: "93% completion rate",
    },
    {
      icon: Droplets,
      title: t("Water & Sanitation"),
      description: t("Comprehensive water management system addressing supply, quality"),
      color: "from-cyan-500 via-teal-600 to-blue-800",
      bgGradient: "from-cyan-50 via-teal-100 to-blue-100",
      stats: "1,892 resolved",
      impact: "87% completion rate",
    },
    {
      icon: Trash2,
      title: t("Smart Waste Management"),
      description: t("Intelligent waste collection and recycling programs with IoT-enabled monitoring systems"),
      bgGradient: "from-emerald-50 via-green-100 to-teal-100",
      stats: "3,563 resolved",
      impact: "91% completion rate",
    },
    {
      icon: Lightbulb,
      title: t("Smart Lighting & Safety"),
      description: t("AI-powered street lighting and public safety infrastructure with energy optimization"),
      color: "from-amber-500 via-orange-600 to-red-700",
      bgGradient: "from-amber-50 via-orange-100 to-red-100",
      stats: "1,674 resolved",
      impact: "89% completion rate",
    },
    {
      icon: TreePine,
      title: t("Environmental Protection"),
      description: t("Sustainable urban development with green initiatives and environmental monitoring"),
      color: "from-green-500 via-emerald-600 to-teal-800",
      bgGradient: "from-green-50 via-emerald-100 to-teal-100",
      stats: "929 resolved",
      impact: "85% completion rate",
    },
    {
      icon: Building,
      title: t("Public Infrastructure"),
      description: t("Modern infrastructure development with accessibility and community-focused design"),
      color: "from-purple-600 via-violet-700 to-indigo-800",
      bgGradient: "from-purple-50 via-violet-100 to-indigo-100",
      stats: "1,238 resolved",
      impact: "96% completion rate",
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: t("Smart Issue Detection"),
      description: t("AI-powered analysis with photo recognition, GPS tagging, and automated categorization through our mobile-first platform"),
      icon: Smartphone,
      color: "from-blue-500 via-purple-600 to-indigo-700",
    },
    {
      step: "02",
      title: t("Intelligent Verification"),
      description: t("Machine learning algorithms verify reports, assess priority levels, and route to appropriate government departments instantly"),
      icon: Layers,
      color: "from-indigo-500 via-blue-600 to-cyan-700",
    },
    {
      step: "03",
      title: t("Real-time Assignment"),
      description: t("Dynamic workflow management assigns issues to qualified teams with performance tracking and accountability metrics"),
      icon: Settings,
      color: "from-purple-500 via-pink-600 to-red-700",
    },
    {
      step: "04",
      title: t("Transparent Resolution"),
      description: t("Live progress tracking with photo updates, citizen feedback integration, and completion verification systems"),
      icon: Monitor,
      color: "from-green-500 via-teal-600 to-blue-700",
    }
  ];

  const stats = [
    { number: "2,567", label: t("Issues Reported"), icon: AlertTriangle, color: "from-red-500 via-pink-600 to-purple-700", bg: "from-red-50 to-pink-100" },
    { number: "2,234+", label: t("Successfully Resolved"), icon: CheckCircle, color: "from-green-500 via-emerald-600 to-teal-700", bg: "from-green-50 to-emerald-100" },
    { number: "1,643", label: t("Active Citizens"), icon: Users, color: "from-blue-500 via-indigo-600 to-purple-700", bg: "from-blue-50 to-indigo-100" },
    { number: "91%", label: t("Resolution Rate"), icon: TrendingUp, color: "from-purple-500 via-violet-600 to-indigo-700", bg: "from-purple-50 to-violet-100" }
  ];

  const governmentFeatures = [
    {
      icon: Shield,
      title: t("Enterprise Security"),
      description: t("Military-grade encryption with multi-factor authentication, ensuring complete data protection and privacy compliance"),
      color: "from-blue-600 via-indigo-700 to-purple-800",
      bgGradient: "from-blue-50 via-indigo-100 to-purple-100",
    },
    {
      icon: Eye,
      title: t("Live Transparency Dashboard"), 
      description: t("Real-time analytics with interactive visualizations, progress tracking, and performance metrics for complete visibility"),
      color: "from-green-600 via-emerald-700 to-teal-800",
      bgGradient: "from-green-50 via-emerald-100 to-teal-100",
    },
    {
      icon: Globe,
      title: t("Multi-Platform Integration"),
      description: t("Seamless connectivity across government systems, social media, and mobile platforms for comprehensive coverage"),
      color: "from-purple-600 via-pink-700 to-red-800",
      bgGradient: "from-purple-50 via-pink-100 to-red-100",
    },
    {
      icon: BarChart3,
      title: t("Advanced Analytics"),
      description: t("AI-powered insights with predictive modeling, trend analysis, and data-driven decision support systems"),
      color: "from-orange-600 via-red-700 to-pink-800",
      bgGradient: "from-orange-50 via-red-100 to-pink-100",
    },
    {
      icon: Target,
      title: t("Precision Targeting"),
      description: t("GPS-accurate location mapping with geofencing, demographic analysis, and contextual information systems"),
      color: "from-cyan-600 via-blue-700 to-indigo-800",
      bgGradient: "from-cyan-50 via-blue-100 to-indigo-100",
    },
    {
      icon: Award,
      title: t("Performance Excellence"),
      description: t("Comprehensive KPI tracking with automated reporting, quality assurance, and continuous improvement frameworks"),
      color: "from-yellow-600 via-orange-700 to-red-800",
      bgGradient: "from-yellow-50 via-orange-100 to-red-100",
    }
  ];

const testimonials = [
  {
    name: "Dr. Rajesh Kumar",
    role: "Municipal Commissioner",
    image: "/man1.jpg", // ✅ must start with /
    text: t("This revolutionary platform has transformed our governance model. Response times reduced by 80%, citizen satisfaction at all-time high."),
    rating: 4,
    department: "jharkhand Municipal Corporation",
    city: "jharkhand",
  },
  {
    name: "Priya Sharma",
    role: "Housewife",
    image: "/women.jpg", // ✅ fixed path
    text: t("The AI-powered analytics provide unprecedented insights into urban challenges. A game-changer for smart city initiatives."),
    rating: 5,
    department: "warrior Women",
    city: "Dhanbad",
  },
  {
    name: "Anil Deshmukh",
    role: "Farmer",
    image: "/man2.jpg", // ✅ fixed path
    text: t("Real-time transparency and citizen engagement have revolutionized our administrative efficiency and public trust."),
    rating: 4,
    department: " Ranchi Citizen",
    city: " Ranchi",
  },
];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
     <div className="min-h-screen bg-white overflow-hidden">
  <style jsx>{`
    @keyframes slide-in {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-slide-in { animation: slide-in 0.8s ease-out forwards; }
    .glass-morphism {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.15);
    }
  `}</style>
  
  {/* Language Toggle Button */}
  <div className="fixed top-4 right-4 z-50">
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 bg-white/90 backdrop-blur-sm text-blue-700 px-4 py-2 rounded-lg font-semibold shadow-lg border mt-14 border-blue-200 hover:bg-blue-50 transition-all"
    >
      <Languages className="w-4 h-4" />
      {language === "en" ? "हिंदी" : "Eng"}
    </button>
  </div>

<section
  className="relative min-h-screen bg-gray-900 flex items-center"
  id="hero"
>
  {/* Background Slideshow */}
  <div className="absolute inset-0 w-full mt-12 h-full overflow-hidden">
    {["/min2.jpeg", "/hero-img2.avif", "/hero-img5.webp", "/hero-img6.jpg"].map(
      (src, i) => (
        <img
          key={i}
          src={src}
          alt={`Jharkhand Digital ${i + 1}`}
          className="slideshow-img absolute inset-0 w-full h-full object-cover object-center opacity-0 transition-opacity duration-[2000ms]"
        />
      )
    )}
  </div>

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 via-blue-500/10 to-gray-500/10">
    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/10 to-indigo-500/10"></div>
  </div>

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Left side (Text) */}
      <div className="space-y-8 animate-slide-in">
        <div className="inline-flex items-center glass-morphism px-5 py-3 rounded-xl text-white shadow-md">
          <Shield className="w-4 h-4 mr-2 text-blue-400" />
          <span className="font-semibold">
            {t("Government of Jharkhand Digital Platform")}
          </span>
        </div>

        <h1 className="text-3xl lg:text-5xl pb-10 font-bold leading-tight text-white/80">
          {t("Digital Jharkhand")} <br />
          <span className="text-gray-200">{t("Revolution")}</span>
        </h1>

        <p className="text-lg text-white leading-relaxed font-light max-w-xl">
          {t("Experience the future of civic engagement through our AI-powered platform. Report issues instantly and track resolutions in real-time.")}
        </p>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
  <div className="inline-flex items-start gap-3 bg-white/10 p-4 rounded-lg shadow-sm max-w-max">
    <MapPin className="w-5 h-5 text-green-400 mt-1" />
    <div>
      <p className="text-white font-semibold text-sm">{t("Coverage Across Jharkhand")}</p>
      <p className="text-gray-200 text-xs">{t("All major cities and districts included")}</p>
    </div>
  </div>
<div className="inline-flex items-start gap-3 bg-white/10 p-4 rounded-lg shadow-sm max-w-max">
  <Clock className="w-5 h-5 text-yellow-400 mt-1" />
  <div>
    <p className="text-white font-semibold text-sm">{t("Citizen-Centric Services")}</p>
    <p className="text-gray-200 text-xs">{t("Simplifying access to government facilities for all residents")}</p>
  </div>
</div>

<div className="inline-flex items-start gap-3 bg-white/10 p-4 rounded-lg shadow-sm max-w-max">
  <Clock className="w-5 h-5 text-yellow-400 mt-1" />
  <div>
    <p className="text-white font-semibold text-sm">{t("Transparent Governance")}</p>
    <p className="text-gray-200 text-xs">{t("Ensuring accountability and efficiency across Jharkhand")}</p>
  </div>
</div>


  <div className="inline-flex items-start gap-3 bg-white/10 p-4 rounded-lg shadow-sm max-w-max">
    <Star className="w-5 h-5 text-indigo-400 mt-1" />
    <div>
      <p className="text-white font-semibold text-sm">{t("High Success Rate")}</p>
      <p className="text-gray-200 text-xs">{t("Government initiatives executed effectively")}</p>
    </div>
  </div>
</div>


        <div className="grid grid-cols-3 gap-8 pt-10">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">2,234+</div>
            <div className="text-gray-200 text-sm">{t("Issues Resolved")}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">10+</div>
            <div className="text-gray-200 text-sm">{t("Smart Cities")}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">91%</div>
            <div className="text-gray-200 text-sm">{t("Success Rate")}</div>
          </div>
        </div>
      </div>

      {/* Right side empty (kept for layout) */}
      <div></div>
    </div>
  </div>
</section>


</div>

      {/* Premium Stats Section */}
      <section className="py-24 bg-[#f0f6fa]  relative" id="stats">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 via-blue-500/5 to-gray-500/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-5xl mb-6"></div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t("Platform Impact Metrics")}</h2>
            <p className="text-xl text-gray-600">{t("Real-time performance dashboard")}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={``}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`relative bg-gradient-to-br ${stat.bg} p-8 rounded-3xl shadow-xl transition-all border border-gray-200/50`}>
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${stat.color} rounded-2xl mb-6 shadow-lg  transition-transform`}>
                    <stat.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-3  transition-colors">{stat.number}</div>
                  <div className="text-gray-600 font-medium text-lg">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Process Section (Gov Style with Image Slots) */}
<section className="relative py-24" id="process">
  {/* Background with Black Overlay */}
  <div className="absolute inset-0">
    <img
      src="/jh-img.jpg" // Use any Jharkhand gov / civic styled background
      alt="Government Background"
      className="w-full h-full object-cover"
    />
    {/* Translucent black layer */}
    <div className="absolute inset-0 bg-black opacity-60"></div>
  </div>

  {/* Content */}
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header */}
    <div className="text-center mb-16">
      {/* Tricolor Strip */}
      <div className="flex w-40 mx-auto mb-6 rounded overflow-hidden shadow-md">
        <div className="flex-1 h-2 bg-[#FF9933]"></div>
        <div className="flex-1 h-2 bg-white"></div>
        <div className="flex-1 h-2 bg-[#138808]"></div>
      </div>

      <h2 className="text-4xl pt-10 md:text-5xl font-bold text-white">
        {t("How Our AI-Enabled System Works")}
      </h2>
    </div>

    {/* Process Steps */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
      {processSteps.map((step, index) => (
        <div
          key={index}
          className="bg-white/90 border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all backdrop-blur-sm"
        >
          <div className="text-center space-y-6">
            {/* Step Number */}
            <div className="text-5xl font-bold text-gray-300">{step.step}</div>

            {/* Icon */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-md"
              style={{
                backgroundColor: index % 2 === 0 ? "#FF9933" : "#138808",
              }}
            >
              <step.icon className="w-8 h-8 text-white" />
            </div>

            {/* Title & Description */}
            <h3 className="text-lg font-semibold text-gray-900">
              {step.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


     
  {/* Issue Categories (Gov Style with Tricolor Banner) */}
<section className="py-24 bg-[#f0f6fa] relative" id="categories">
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header with Tricolor Banner */}
    <div className="text-center mb-16">
      {/* 🇮🇳 Tricolor Banner */}
      <div className="flex w-40 mx-auto mb-6 rounded overflow-hidden shadow-sm">
        <div className="flex-1 h-2 bg-[#FF9933]"></div> {/* Saffron */}
        <div className="flex-1 h-2 bg-white"></div>     {/* White */}
        <div className="flex-1 h-2 bg-[#138808]"></div> {/* Green */}
      </div>

      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        {t("Citizen Service")} <span className="text-[#000080]">{t("Categories")}</span>
      </h2>
      <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
        {t("Officially recognized issue categories to help citizens report and track urban problems effectively.")}
      </p>
    </div>

    {/* Categories Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {issueCategories.map((category, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
        >
          {/* Icon with Indian flag accents */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
            style={{
              backgroundColor: index % 2 === 0 ? "#FF9933" : "#138808",
            }}
          >
            <category.icon className="w-7 h-7 text-white" />
          </div>

          {/* Title & Description */}
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            {category.title}
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed mb-6">
            {category.description}
          </p>

          {/* Official-style button */}
          <button onClick={() => navigate('/citizen-login')}
            className="w-full bg-[#000080] text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-900 transition-colors"
          >
            {t("Report Issue")}
          </button>
          
        </div>
      ))}
    </div>
  </div>
</section>


{/* Government Features Section */}
<section className="py-24 bg-[#dff2f7] relative overflow-hidden" id="features">
  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-[#dff2f7]"></div>

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Heading */}
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
        {t("Platform")} <span className="text-red-950">{t("Features")}</span>
      </h2>
      <p className="text-lg text-red-950 max-w-3xl mx-auto leading-relaxed">
        {t("Built to support citizens with transparency, accountability and efficiency.")}
      </p>
    </div>

    {/* Features Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
      {governmentFeatures.map((feature, index) => (
        <div
          key={index}
          className="bg-gray-800/80 rounded-xl p-8 shadow border border-gray-700 hover:border-green-500 transition-all"
        >
          <div className="flex flex-col items-center text-center space-y-5">
            {/* Icon */}
            <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-md flex items-center justify-center shadow`}>
              <feature.icon className="w-7 h-7 text-white" />
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-white">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-white text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
  
      ))}
    </div>
  </div>
</section>


      {/* Premium Testimonials */}
<section className="py-24 bg-[#f0f6fa] relative" id="testimonials">
  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-blue-500/5 to-cyan-500/5"></div>
  
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-20">
      <h2 className="text-5xl md:text-6xl font-bold text-red-950 mb-8">
        {t("Government")}
        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent"> {t("Success Stories")}</span>
      </h2>
      <p className="text-2xl text-red-950 max-w-4xl mx-auto leading-relaxed">
        {t("Transforming governance of jharkhand and Citizens Golden review's")}
      </p>
    </div>
    
    <div className="grid md:grid-cols-3 gap-10">
      {testimonials.map((testimonial, index) => (
        <div 
          key={index} 
          className="animate-slide-in hover-lift"
          style={{ animationDelay: `${index * 200}ms` }}
        >
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-200/50 hover:border-blue-300/50 transition-all group premium-shadow">
            <div className="text-center space-y-6">
              
              {/* ✅ Image Display */}
              <div className="flex items-center justify-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-200"
                />
                <div className="text-left">
                  <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600 font-medium">{testimonial.role}</p>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <Building className="w-3 h-3 mr-1" />
                    <span>{testimonial.department}</span>
                  </div>
                </div>
              </div>
    
              {/* ✅ Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
            
              <blockquote className="text-gray-700 leading-relaxed italic text-lg">
                "{testimonial.text}"
              </blockquote>
            
              <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-blue-100 border border-blue-200 text-blue-800 px-4 py-2 rounded-xl text-sm font-semibold">
                <MapPin className="w-4 h-4 mr-2" />
                {testimonial.city}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Premium CTA Section with Background Slideshow */}
<section className="relative py-24 bg-gray-900 overflow-hidden" id="cta">
  {/* Background Slideshow */}
  <div className="absolute inset-0 w-full h-full">
    <div className="absolute inset-0 bg-black/60 z-10"></div> {/* dark overlay for text readability */}
    <div className="slideshow absolute inset-0 w-full h-full">
      {["/stempid.jpg", "/potholes.png", "/streetLight.webp", "/cityCleaning.webp"].map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Gov Civic Example ${i + 1}`}
          className="slideshow-img absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-[2000ms]"
        />
      ))}
    </div>
  </div>

  {/* Content */}
  <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="inline-flex items-center bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl">
        <Sparkles className="w-6 h-6 mr-3 text-blue-300" />
        {t("Join the Digital Governance Revolution")}
      </div>

      <h2 className="text-5xl md:text-7xl font-bold leading-tight">
        {t("Transform Your")}
        <br />
        <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
          {t("Community Today")}
        </span>
      </h2>

      <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
        {t("Experience the future of citizen-government interaction through our AI-powered platform. Join millions of empowered citizens building smarter, more transparent communities.")}
      </p>

      <div className="flex flex-col sm:flex-row gap-6 justify-center pt-12">
        <button   onClick={() => navigate('/citizen-login')}
          className="group bg-gradient-to-r from-blue-600 via-indigo-700 to-blue-800 text-white px-12 py-5 rounded-xl font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <Camera className="w-6 h-6 mr-3 relative z-10" />
          <span className="relative z-10">{t("Start Reporting Issues")}</span>
          <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform relative z-10" />
        </button>

        <button className="group bg-white/10 backdrop-blur-md text-white px-12 py-5 rounded-xl font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center border border-white/30">
          <Eye className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
          {t("Explore Live Dashboard")}
        </button>
      </div>

      {/* Trust Signals */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 pt-16 max-w-3xl mx-auto">
        <div className="text-center">
          <div className="text-4xl font-bold">10+</div>
          <div className="text-gray-300">{t("Smart Cities Connected")}</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold">24/7</div>
          <div className="text-gray-300">{t("AI-Powered Support")}</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold">100%</div>
          <div className="text-gray-300">{t("Secure & Transparent")}</div>
        </div>
      </div>

      {/* Footer Tag */}
      <div className="mt-16 text-center">
        <div className="flex items-center justify-center space-x-3 text-white/80 text-lg">
          <Shield className="w-5 h-5 text-green-400" />
          <span>{t("Proudly Secured by Government of Jharkhand")}</span>
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <p className="mt-4 text-gray-400">🇮🇳 {t("Building Digital India Together")} 🇮🇳</p>
      </div>
    </div>
  </div>
</section>




   <div className="bg-[#dff2f7] py-16 px-6 md:px-16 lg:px-24 relative overflow-hidden">
  {/* Section Heading */}
  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6 relative inline-block">
    {t("About Us")}
    <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 border-b-4 border-green-600"></span>
  </h2>

  {/* Description */}
  <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto text-center mt-4">
    <span className="font-semibold">FixMyCity</span> {t("is an official civic platform initiated under the guidance of the")}{" "}
    <span className="font-semibold text-green-700">{t("Government of Jharkhand")}</span>.  
    {t("Our mission is to strengthen citizen–government collaboration by enabling transparent, fast, and accountable redressal of urban issues.")}
  </p>

  {/* Vision / Mission / Values */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-center">
    <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-green-600">
      <h3 className="text-xl font-semibold text-green-700 mb-3">{t("Our Vision")}</h3>
      <p className="text-gray-600 text-base">
        {t("To build a cleaner, safer, and more responsive Jharkhand by empowering citizens to directly report civic concerns.")}
      </p>
    </div>
    <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-green-600">
      <h3 className="text-xl font-semibold text-green-700 mb-3">{t("Our Mission")}</h3>
      <p className="text-gray-600 text-base">
        {t("To provide an accessible digital platform for every resident to raise issues and ensure timely resolution through official government channels.")}
      </p>
    </div>
    <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-green-600">
      <h3 className="text-xl font-semibold text-green-700 mb-3">{t("Our Values")}</h3>
      <p className="text-gray-600 text-base">
        {t("Transparency, accountability, inclusivity, and service to citizens — the guiding principles of our governance model.")}
      </p>
    </div>
  </div>

  {/* Jharkhand Government Branding */}
  <div className="flex flex-col items-center justify-center mt-14 space-y-4">
    <div className="flex items-center space-x-4 bg-white px-6 py-3 rounded-xl shadow border border-gray-200">
      <img src="/Jharkhand-logo.webp" alt="Jharkhand Logo" className="w-14 h-14" />
      <span className="text-lg font-semibold text-gray-900">
        {t("Government of Jharkhand")}
      </span>
    </div>

    {/* Contact Info */}
    <div className="bg-white px-6 py-4 rounded-xl shadow border border-gray-200 text-center">
      <p className="text-gray-700 text-base">
        <span className="font-semibold">{t("Office")}:</span> 0651-2400240, 2400250 | <span className="font-semibold">{t("Fax")}:</span> 0651-2400255
      </p>
      <p className="text-gray-700 text-base mt-1">
        <span className="font-semibold">{t("Email")}:</span> <a href="mailto:cs-jharkhand@nic.in" className="text-green-700 hover:underline">cs-jharkhand@nic.in</a>
      </p>
    </div>
  </div>
</div>


      

    </div>
  );
};

export default PremiumGovCivicPlatform;