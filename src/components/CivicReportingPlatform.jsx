import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Users, 
  CheckCircle, 
  AlertTriangle, 
  Camera, 
  MessageSquare, 
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
  Clock,
  Award,
  Zap,
  Globe,
  Heart,
  Target,
  Sparkles,
  PhoneCall,
  Mail,
  Map,
  ChevronDown,
  FileText,
  Settings,
  Layers,
  BarChart3,
  Smartphone,
  Monitor
} from 'lucide-react';

const PremiumGovCivicPlatform = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Enhanced Intersection Observer
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

  const issueCategories = [
    {
      icon: Car,
      title: "Transportation Infrastructure",
      description: "Advanced reporting system for road conditions, traffic optimization, and smart transportation solutions",
      color: "from-blue-600 via-blue-700 to-indigo-900",
      bgGradient: "from-blue-50 via-blue-100 to-indigo-100",
      stats: "2,847 resolved",
      impact: "98% completion rate",
      image: "🚗"
    },
    {
      icon: Droplets,
      title: "Water & Sanitation", 
      description: "Comprehensive water management system addressing supply, quality, and infrastructure challenges",
      color: "from-cyan-500 via-teal-600 to-blue-800",
      bgGradient: "from-cyan-50 via-teal-100 to-blue-100",
      stats: "1,892 resolved",
      impact: "95% completion rate",
      image: "💧"
    },
    {
      icon: Trash2,
      title: "Smart Waste Management",
      description: "Intelligent waste collection and recycling programs with IoT-enabled monitoring systems",
      color: "from-emerald-500 via-green-600 to-teal-800",
      bgGradient: "from-emerald-50 via-green-100 to-teal-100",
      stats: "3,563 resolved",
      impact: "97% completion rate",
      image: "♻️"
    },
    {
      icon: Lightbulb,
      title: "Smart Lighting & Safety",
      description: "AI-powered street lighting and public safety infrastructure with energy optimization",
      color: "from-amber-500 via-orange-600 to-red-700",
      bgGradient: "from-amber-50 via-orange-100 to-red-100",
      stats: "1,674 resolved",
      impact: "99% completion rate",
      image: "💡"
    },
    {
      icon: TreePine,
      title: "Environmental Protection",
      description: "Sustainable urban development with green initiatives and environmental monitoring",
      color: "from-green-500 via-emerald-600 to-teal-800",
      bgGradient: "from-green-50 via-emerald-100 to-teal-100",
      stats: "929 resolved",
      impact: "94% completion rate",
      image: "🌳"
    },
    {
      icon: Building,
      title: "Public Infrastructure",
      description: "Modern infrastructure development with accessibility and community-focused design",
      color: "from-purple-600 via-violet-700 to-indigo-800",
      bgGradient: "from-purple-50 via-violet-100 to-indigo-100",
      stats: "1,238 resolved",
      impact: "96% completion rate",
      image: "🏛️"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Smart Issue Detection",
      description: "AI-powered analysis with photo recognition, GPS tagging, and automated categorization through our mobile-first platform",
      icon: Smartphone,
      color: "from-blue-500 via-purple-600 to-indigo-700",
      image: "📱"
    },
    {
      step: "02", 
      title: "Intelligent Verification",
      description: "Machine learning algorithms verify reports, assess priority levels, and route to appropriate government departments instantly",
      icon: Layers,
      color: "from-indigo-500 via-blue-600 to-cyan-700",
      image: "🔍"
    },
    {
      step: "03",
      title: "Real-time Assignment",
      description: "Dynamic workflow management assigns issues to qualified teams with performance tracking and accountability metrics",
      icon: Settings,
      color: "from-purple-500 via-pink-600 to-red-700",
      image: "⚡"
    },
    {
      step: "04",
      title: "Transparent Resolution",
      description: "Live progress tracking with photo updates, citizen feedback integration, and completion verification systems",
      icon: Monitor,
      color: "from-green-500 via-teal-600 to-blue-700",
      image: "✅"
    }
  ];

  const stats = [
    { number: "25,847", label: "Issues Reported", icon: AlertTriangle, color: "from-red-500 via-pink-600 to-purple-700", bg: "from-red-50 to-pink-100" },
    { number: "23,234", label: "Successfully Resolved", icon: CheckCircle, color: "from-green-500 via-emerald-600 to-teal-700", bg: "from-green-50 to-emerald-100" },
    { number: "8,456", label: "Active Citizens", icon: Users, color: "from-blue-500 via-indigo-600 to-purple-700", bg: "from-blue-50 to-indigo-100" },
    { number: "94%", label: "Resolution Rate", icon: TrendingUp, color: "from-purple-500 via-violet-600 to-indigo-700", bg: "from-purple-50 to-violet-100" }
  ];

  const governmentFeatures = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Military-grade encryption with multi-factor authentication, ensuring complete data protection and privacy compliance",
      color: "from-blue-600 via-indigo-700 to-purple-800",
      bgGradient: "from-blue-50 via-indigo-100 to-purple-100",
      image: "🔒"
    },
    {
      icon: Eye,
      title: "Live Transparency Dashboard", 
      description: "Real-time analytics with interactive visualizations, progress tracking, and performance metrics for complete visibility",
      color: "from-green-600 via-emerald-700 to-teal-800",
      bgGradient: "from-green-50 via-emerald-100 to-teal-100",
      image: "📊"
    },
    {
      icon: Globe,
      title: "Multi-Platform Integration",
      description: "Seamless connectivity across government systems, social media, and mobile platforms for comprehensive coverage",
      color: "from-purple-600 via-pink-700 to-red-800",
      bgGradient: "from-purple-50 via-pink-100 to-red-100",
      image: "🌐"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "AI-powered insights with predictive modeling, trend analysis, and data-driven decision support systems",
      color: "from-orange-600 via-red-700 to-pink-800",
      bgGradient: "from-orange-50 via-red-100 to-pink-100",
      image: "📈"
    },
    {
      icon: Target,
      title: "Precision Targeting",
      description: "GPS-accurate location mapping with geofencing, demographic analysis, and contextual information systems",
      color: "from-cyan-600 via-blue-700 to-indigo-800",
      bgGradient: "from-cyan-50 via-blue-100 to-indigo-100",
      image: "🎯"
    },
    {
      icon: Award,
      title: "Performance Excellence",
      description: "Comprehensive KPI tracking with automated reporting, quality assurance, and continuous improvement frameworks",
      color: "from-yellow-600 via-orange-700 to-red-800",
      bgGradient: "from-yellow-50 via-orange-100 to-red-100",
      image: "🏆"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Municipal Commissioner",
      image: "👨‍💼",
      text: "This revolutionary platform has transformed our governance model. Response times reduced by 80%, citizen satisfaction at all-time high.",
      rating: 5,
      department: "Delhi Municipal Corporation",
      city: "New Delhi",
      avatar: "🏛️"
    },
    {
      name: "Priya Sharma", 
      role: "Smart City Mission Director",
      image: "👩‍💼",
      text: "The AI-powered analytics provide unprecedented insights into urban challenges. A game-changer for smart city initiatives.",
      rating: 5,
      department: "Ministry of Urban Development",
      city: "Mumbai",
      avatar: "🌆"
    },
    {
      name: "Suresh Patel",
      role: "District Collector",
      image: "👨‍🎓",
      text: "Real-time transparency and citizen engagement have revolutionized our administrative efficiency and public trust.",
      rating: 5,
      department: "Pune District Administration",
      city: "Pune",
      avatar: "📋"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(50px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-slide-in { animation: slide-in 0.8s ease-out forwards; }
        .animate-gradient { animation: gradient-shift 8s ease infinite; background-size: 200% 200%; }
        
        .glass-morphism {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .premium-shadow {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08), 0 0 50px rgba(59, 130, 246, 0.1);
        }
        
        .hover-lift {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .hover-lift:hover {
          transform: translateY(-15px) scale(1.02);
        }
      `}</style>

      {/* Premium Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-32 w-96 h-96 bg-gradient-to-r from-cyan-300/15 via-blue-400/15 to-indigo-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-gradient-to-r from-green-400/20 via-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-purple-400/25 via-pink-400/25 to-red-400/25 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Premium Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden" id="hero">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/10 to-purple-500/10"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1) 0%, transparent 50%)`
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-slide-in">
              <div className="inline-flex items-center glass-morphism px-6 py-4 rounded-2xl text-white shadow-xl">
                <Shield className="w-6 h-6 mr-3 text-blue-400" />
                <span className="font-semibold">🇮🇳 Government of India Digital Platform</span>
                <div className="ml-3 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              </div>

              <div className="space-y-6">
                <h1 className="text-6xl lg:text-8xl font-bold leading-tight">
                  <span className="text-white">Digital India</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                    Smart Governance
                  </span>
                  <br />
                  <span className="text-gray-200">Revolution</span>
                </h1>
                
                <p className="text-2xl text-gray-200 leading-relaxed font-light">
                  Experience the future of civic engagement through our AI-powered platform. 
                  Report issues instantly, track resolutions in real-time, and participate in 
                  building smarter, more responsive communities.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 pt-8">
                <button className="group bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center relative overflow-hidden animate-gradient">
                  <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <Camera className="w-6 h-6 mr-4 relative z-10" />
                  <span className="relative z-10">Report Issue Now</span>
                  <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-2 transition-transform relative z-10" />
                </button>
                
                <button className="group glass-morphism text-white px-12 py-6 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center border border-white/20">
                  <Play className="w-6 h-6 mr-4 group-hover:scale-125 transition-transform" />
                  Watch Demo
                </button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">25K+</div>
                  <div className="text-gray-300 text-sm">Issues Resolved</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">50+</div>
                  <div className="text-gray-300 text-sm">Smart Cities</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">94%</div>
                  <div className="text-gray-300 text-sm">Success Rate</div>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative z-10">
                <div className="glass-morphism rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-500 hover-lift">
                  <div className="text-center space-y-8">
                    <div className="text-6xl mb-6">🏛️</div>
                    
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl animate-pulse-glow">
                      <MapPin className="w-12 h-12 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-4">Smart City Dashboard</h3>
                      <p className="text-gray-200 text-lg">Real-time civic intelligence</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 pt-6">
                      <div className="bg-gradient-to-r from-green-400/20 to-emerald-500/20 backdrop-blur-sm border border-green-400/30 p-6 rounded-2xl">
                        <div className="text-3xl font-bold text-green-400 mb-1">2.4K</div>
                        <div className="text-green-300 text-sm">Resolved Today</div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-400/20 to-cyan-500/20 backdrop-blur-sm border border-blue-400/30 p-6 rounded-2xl">
                        <div className="text-3xl font-bold text-blue-400 mb-1">847</div>
                        <div className="text-blue-300 text-sm">Active Reports</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-r from-pink-500/30 to-purple-600/30 rounded-3xl flex items-center justify-center backdrop-blur-sm animate-float">
                <span className="text-4xl">⚡</span>
              </div>
              
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-r from-green-500/30 to-emerald-600/30 rounded-3xl flex items-center justify-center backdrop-blur-sm animate-float" style={{ animationDelay: '1s' }}>
                <span className="text-3xl">✨</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Stats Section */}
      <section className="py-24 bg-gradient-to-r from-white via-blue-50 to-indigo-50 relative" id="stats">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-5xl mb-6">📊</div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Platform Impact Metrics</h2>
            <p className="text-xl text-gray-600">Real-time performance dashboard</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`text-center group cursor-pointer animate-slide-in hover-lift`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`relative bg-gradient-to-br ${stat.bg} p-8 rounded-3xl shadow-xl group-hover:shadow-2xl transition-all border border-gray-200/50`}>
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${stat.color} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{stat.number}</div>
                  <div className="text-gray-600 font-medium text-lg">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Process Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 relative overflow-hidden" id="process">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="text-6xl mb-8">⚡</div>
            <div className="inline-flex items-center glass-morphism text-white px-6 py-3 rounded-xl font-medium mb-8">
              <Zap className="w-5 h-5 mr-2" />
              AI-Powered Workflow
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              How Our Smart
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient"> AI System </span>
              Works
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Experience next-generation civic governance through intelligent automation and real-time processing
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div 
                key={index} 
                className={`relative group animate-slide-in hover-lift`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="glass-morphism rounded-3xl p-8 shadow-2xl border border-white/20 group-hover:border-white/40 transition-all">
                  <div className="text-center space-y-6">
                    <div className="text-5xl">{step.image}</div>
                    
                    <div className="relative">
                      <div className="text-6xl font-bold text-white/20 absolute -top-4 -right-2">
                        {step.step}
                      </div>
                      <div className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform mx-auto animate-pulse-glow`}>
                        <step.icon className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
                
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Issue Categories */}
      <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative" id="categories">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="text-6xl mb-8">🎯</div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Smart Civic
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent"> Categories </span>
              Hub
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Comprehensive issue categorization powered by AI for precise reporting and rapid resolution
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {issueCategories.map((category, index) => (
              <div 
                key={index} 
                className={`group cursor-pointer animate-slide-in hover-lift`}
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className={`relative bg-gradient-to-br ${category.bgGradient} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-gray-200/50 group-hover:border-blue-300/50 premium-shadow`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <div className="text-5xl">{category.image}</div>
                      <div className="text-right text-sm">
                        <div className="font-bold text-gray-700 mb-1">{category.stats}</div>
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          <span className="text-xs">{category.impact}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`w-18 h-18 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-all animate-pulse-glow`}>
                      <category.icon className="w-9 h-9 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-8">
                        {category.description}
                      </p>
                      
                      <button className="w-full bg-white/80 hover:bg-white border-2 border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 px-6 py-4 rounded-2xl font-bold transition-all flex items-center justify-center group-hover:shadow-xl transform hover:scale-105">
                        <Camera className="w-5 h-5 mr-3" />
                        Report Issue
                        <ArrowRight className="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Floating accent */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-blue-400/30 to-purple-500/30 rounded-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden" id="features">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="text-6xl mb-8">🚀</div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Next-Generation
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient"> Platform Features</span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Advanced technology stack designed for enterprise-grade performance and citizen satisfaction
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {governmentFeatures.map((feature, index) => (
              <div 
                key={index} 
                className={`animate-slide-in hover-lift`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="glass-morphism rounded-3xl p-8 shadow-2xl border border-white/20 hover:border-white/40 transition-all group premium-shadow">
                  <div className="text-center space-y-6">
                    <div className="text-5xl">{feature.image}</div>
                    
                    <div className={`w-18 h-18 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all mx-auto animate-pulse-glow`}>
                      <feature.icon className="w-9 h-9 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Testimonials */}
      <section className="py-24 bg-gradient-to-br from-white via-blue-50 to-indigo-50 relative" id="testimonials">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="text-6xl mb-8">🎖️</div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Government
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent"> Success Stories</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Transforming governance across India - testimonials from senior government officials
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`animate-slide-in hover-lift`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-200/50 hover:border-blue-300/50 transition-all group premium-shadow">
                  <div className="text-center space-y-6">
                    <div className="text-5xl">{testimonial.avatar}</div>
                    
                    <div className="flex items-center justify-center">
                      <div className="text-4xl mr-4">{testimonial.image}</div>
                      <div className="text-left">
                        <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{testimonial.name}</h4>
                        <p className="text-gray-600 font-medium">{testimonial.role}</p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <Building className="w-3 h-3 mr-1" />
                          <span>{testimonial.department}</span>
                        </div>
                      </div>
                    </div>
                  
                    <div className="flex justify-center mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  
                    <blockquote className="text-gray-700 leading-relaxed italic text-lg">
                      "{testimonial.text}"
                    </blockquote>
                  
                    <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 text-blue-800 px-4 py-2 rounded-xl text-sm font-semibold">
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

      {/* Premium CTA Section */}
      <section className="py-24 relative overflow-hidden" id="cta">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-7xl mb-8">🌟</div>
            
            <div className="inline-flex items-center glass-morphism text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl">
              <Sparkles className="w-6 h-6 mr-3" />
              Join the Digital Governance Revolution
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Transform Your
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                Community Today
              </span>
            </h2>
            
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Experience the future of citizen-government interaction through our revolutionary AI-powered platform. 
              Join millions of empowered citizens building smarter, more responsive communities.
            </p>
          
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-12">
              <button className="group bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 text-white px-16 py-6 rounded-2xl font-bold text-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center relative overflow-hidden animate-gradient">
                <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <Camera className="w-7 h-7 mr-4 relative z-10" />
                <span className="relative z-10">Start Reporting Issues</span>
                <ArrowRight className="w-6 h-6 ml-4 group-hover:translate-x-2 transition-transform relative z-10" />
              </button>
              
              <button className="group glass-morphism text-white px-16 py-6 rounded-2xl font-bold text-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center border border-white/30">
                <Eye className="w-7 h-7 mr-4 group-hover:scale-110 transition-transform" />
                Explore Live Dashboard
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 pt-16 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">50+</div>
                <div className="text-gray-300">Smart Cities Connected</div>
                <div className="text-2xl mt-2">🏙️</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-gray-300">AI-Powered Support</div>
                <div className="text-2xl mt-2">🤖</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">100%</div>
                <div className="text-gray-300">Secure & Transparent</div>
                <div className="text-2xl mt-2">🔒</div>
              </div>
            </div>
          </div>
          
          <div className="mt-20 text-center">
            <div className="flex items-center justify-center space-x-3 text-white/75 text-lg">
              <Shield className="w-5 h-5" />
              <span>Proudly Secured by Government of India</span>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
            </div>
            <p className="mt-4 text-gray-400">🇮🇳 Building Digital India Together 🇮🇳</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PremiumGovCivicPlatform;