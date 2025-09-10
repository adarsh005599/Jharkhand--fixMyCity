import React, { useState, useEffect } from 'react';
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
  Layers,
  BarChart3,
  Smartphone,
  Monitor
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';



const PremiumGovCivicPlatform = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

  const issueCategories = [
    {
      icon: Car,
      title: "Transportation Infrastructure",
      description: "Advanced reporting system for road conditions, traffic optimization, and smart transportation solutions",
      color: "from-blue-600 via-blue-700 to-indigo-900",
      bgGradient: "from-blue-50 via-blue-100 to-indigo-100",
      stats: "2,847 resolved",
      impact: "93% completion rate",
      
    },
    {
      icon: Droplets,
      title: "Water & Sanitation", 
      description: "Comprehensive water management system addressing supply, quality, and infrastructure challenges",
      color: "from-cyan-500 via-teal-600 to-blue-800",
      bgGradient: "from-cyan-50 via-teal-100 to-blue-100",
      stats: "1,892 resolved",
      impact: "87% completion rate",
      
    },
    {
      icon: Trash2,
      title: "Smart Waste Management",
      description: "Intelligent waste collection and recycling programs with IoT-enabled monitoring systems",
      color: "from-emerald-500 via-green-600 to-teal-800",
      bgGradient: "from-emerald-50 via-green-100 to-teal-100",
      stats: "3,563 resolved",
      impact: "91% completion rate",
      
    },
    {
      icon: Lightbulb,
      title: "Smart Lighting & Safety",
      description: "AI-powered street lighting and public safety infrastructure with energy optimization",
      color: "from-amber-500 via-orange-600 to-red-700",
      bgGradient: "from-amber-50 via-orange-100 to-red-100",
      stats: "1,674 resolved",
      impact: "89% completion rate",
      
    },
    {
      icon: TreePine,
      title: "Environmental Protection",
      description: "Sustainable urban development with green initiatives and environmental monitoring",
      color: "from-green-500 via-emerald-600 to-teal-800",
      bgGradient: "from-green-50 via-emerald-100 to-teal-100",
      stats: "929 resolved",
      impact: "85% completion rate",
      
    },
    {
      icon: Building,
      title: "Public Infrastructure",
      description: "Modern infrastructure development with accessibility and community-focused design",
      color: "from-purple-600 via-violet-700 to-indigo-800",
      bgGradient: "from-purple-50 via-violet-100 to-indigo-100",
      stats: "1,238 resolved",
      impact: "96% completion rate",
      
    }
  ];

  const processSteps = [
    {
      
      title: "Smart Issue Detection",
      description: "AI-powered analysis with photo recognition, GPS tagging, and automated categorization through our mobile-first platform",
      icon: Smartphone,
      color: "from-blue-500 via-purple-600 to-indigo-700",
      
    },
    {
      
      title: "Intelligent Verification",
      description: "Machine learning algorithms verify reports, assess priority levels, and route to appropriate government departments instantly",
      icon: Layers,
      color: "from-indigo-500 via-blue-600 to-cyan-700",
      
    },
    {
      
      title: "Real-time Assignment",
      description: "Dynamic workflow management assigns issues to qualified teams with performance tracking and accountability metrics",
      icon: Settings,
      color: "from-purple-500 via-pink-600 to-red-700",
      
    },
    {
      
      title: "Transparent Resolution",
      description: "Live progress tracking with photo updates, citizen feedback integration, and completion verification systems",
      icon: Monitor,
      color: "from-green-500 via-teal-600 to-blue-700",
      
    }
  ];

  const stats = [
    { number: "2,567", label: "Issues Reported", icon: AlertTriangle, color: "from-red-500 via-pink-600 to-purple-700", bg: "from-red-50 to-pink-100" },
    { number: "1,765", label: "Successfully Resolved", icon: CheckCircle, color: "from-green-500 via-emerald-600 to-teal-700", bg: "from-green-50 to-emerald-100" },
    { number: "1,643", label: "Active Citizens", icon: Users, color: "from-blue-500 via-indigo-600 to-purple-700", bg: "from-blue-50 to-indigo-100" },
    { number: "91%", label: "Resolution Rate", icon: TrendingUp, color: "from-purple-500 via-violet-600 to-indigo-700", bg: "from-purple-50 to-violet-100" }
  ];

  const governmentFeatures = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Military-grade encryption with multi-factor authentication, ensuring complete data protection and privacy compliance",
      color: "from-blue-600 via-indigo-700 to-purple-800",
      bgGradient: "from-blue-50 via-indigo-100 to-purple-100",
      
    },
    {
      icon: Eye,
      title: "Live Transparency Dashboard", 
      description: "Real-time analytics with interactive visualizations, progress tracking, and performance metrics for complete visibility",
      color: "from-green-600 via-emerald-700 to-teal-800",
      bgGradient: "from-green-50 via-emerald-100 to-teal-100",
      
    },
    {
      icon: Globe,
      title: "Multi-Platform Integration",
      description: "Seamless connectivity across government systems, social media, and mobile platforms for comprehensive coverage",
      color: "from-purple-600 via-pink-700 to-red-800",
      bgGradient: "from-purple-50 via-pink-100 to-red-100",
      
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "AI-powered insights with predictive modeling, trend analysis, and data-driven decision support systems",
      color: "from-orange-600 via-red-700 to-pink-800",
      bgGradient: "from-orange-50 via-red-100 to-pink-100",
      
    },
    {
      icon: Target,
      title: "Precision Targeting",
      description: "GPS-accurate location mapping with geofencing, demographic analysis, and contextual information systems",
      color: "from-cyan-600 via-blue-700 to-indigo-800",
      bgGradient: "from-cyan-50 via-blue-100 to-indigo-100",
      
    },
    {
      icon: Award,
      title: "Performance Excellence",
      description: "Comprehensive KPI tracking with automated reporting, quality assurance, and continuous improvement frameworks",
      color: "from-yellow-600 via-orange-700 to-red-800",
      bgGradient: "from-yellow-50 via-orange-100 to-red-100",
      
    }
  ];
const testimonials = [
  {
    name: "Dr. Rajesh Kumar",
    role: "Municipal Commissioner",
    image: "/man1.jpg", // ✅ must start with /
    text: "This revolutionary platform has transformed our governance model. Response times reduced by 80%, citizen satisfaction at all-time high.",
    rating: 4,
    department: "jharkhand Municipal Corporation",
    city: "jharkhand",
  },
  {
    name: "Priya Sharma",
    role: "Housewife",
    image: "/women.jpg", // ✅ fixed path
    text: "The AI-powered analytics provide unprecedented insights into urban challenges. A game-changer for smart city initiatives.",
    rating: 5,
    department: "warrior Women",
    city: "Dhanbad",
  },
  {
    name: "Anil Deshmukh",
    role: "Farmer",
    image: "/man2.jpg", // ✅ fixed path
    text: "Real-time transparency and citizen engagement have revolutionized our administrative efficiency and public trust.",
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

<section
  className="relative min-h-screen bg-gray-900 flex items-center"
  id="hero"
>
  {/* Background Image */}
  <img
    src="/min2.jpeg"
    alt="Jharkhand Digital"
    className="absolute inset-0 w-full h-full object-cover mt-12 blur-10 opacity-70"
  />

  {/* Dark Overlay for readability */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Gradient Overlay (kept from your original) */}
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
            🇮🇳 Government of Jharkhand Digital Platform
          </span>
        </div>

        <h1 className="text-3xl lg:text-5xl pb-10  font-bold leading-tight text-white/80">
          Digital Jharkhand <br />
          <span className="text-gray-200">Revolution</span>
        </h1>

        <p className="text-lg text-gray-200 leading-relaxed font-light max-w-xl">
          Experience the future of civic engagement through our AI-powered
          platform. Report issues instantly and track resolutions in real-time.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 pt-6">
          <button
            onClick={() => navigate("/report")}
            className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center cursor-pointer shadow-lg transition-all"
          >
            <Camera className="w-5 h-5 mr-3" />
            Report Issue
          </button>

          <button className="bg-gray-700/40 hover:bg-gray-600/50 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center shadow-lg transition-all">
            <Play className="w-5 h-5 mr-3" />
            Watch Demo
          </button>
        </div>

        <div className="grid grid-cols-3 gap-8 pt-10">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">1,765+</div>
            <div className="text-gray-200 text-sm">Issues Resolved</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">10+</div>
            <div className="text-gray-200 text-sm">Smart Cities</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">91%</div>
            <div className="text-gray-200 text-sm">Success Rate</div>
          </div>
        </div>
      </div>

      {/* Right side (Removed standalone image, since it's now background) */}
      <div></div>
    </div>
  </div>
</section>

</div>

      
      {/* Premium Stats Section */}
      <section className="py-24 bg-white relative" id="stats">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 via-blue-500/5 to-gray-500/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-5xl mb-6"></div>
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
      <section className="py-24 bg-gray-900 relative overflow-hidden" id="process">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-blue-600/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="text-6xl mb-8"></div>
            <div className="inline-flex items-center glass-morphism text-white px-6 py-3 rounded-xl font-medium mb-8">
              <Zap className="w-5 h-5 mr-2" />
              AI-Powered Workflow
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              How Our Smart
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-gradient"> AI System </span>
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
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
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
      <section className="py-24 bg-white relative" id="categories">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-blue-500/5 to-cyan-500/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="text-6xl mb-8"></div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Smart Civic
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent"> Categories </span>
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
                  <div className="absolute inset-0 bg-white/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
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
                      
                      <button 
                        onClick={() => navigate('/report')}
                        className="w-full bg-white/80 hover:bg-white border-2 border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 px-6 py-4 rounded-2xl font-bold transition-all flex items-center justify-center group-hover:shadow-xl transform hover:scale-105"
                      >
                        <Camera className="w-5 h-5 mr-3" />
                        Report Issue
                        <ArrowRight className="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Floating accent */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-blue-400/30 to-blue-500/30 rounded-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-24 bg-gray-900 relative overflow-hidden" id="features">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-blue-600/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="text-6xl mb-8"></div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Next-Generation
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-400 bg-clip-text text-transparent animate-gradient"> Platform Features</span>
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
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-blue-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Testimonials */}
<section className="py-24 bg-white relative" id="testimonials">
  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-blue-500/5 to-cyan-500/5"></div>
  
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-20">
      <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
        Government
        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent"> Success Stories</span>
      </h2>
      <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
        Transforming governance of jharkhand and Citizens Golden review's
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

      {/* Premium CTA Section */}
      <section className="py-24 relative  bg-gray-900  overflow-hidden" id="cta">
        <div className="absolute inset-0 ">
          <div className="absolute inset-0  bg-gray-900"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-7xl mb-8"></div>
            
            <div className="inline-flex items-center glass-morphism text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl">
              <Sparkles className="w-6 h-6 mr-3" />
              Join the Digital Governance Revolution
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Transform Your
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
                Community Today
              </span>
            </h2>
            
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Experience the future of citizen-government interaction through our revolutionary AI-powered platform. 
              Join millions of empowered citizens building smarter, more responsive communities.
            </p>
          
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-12">
              <button 
                onClick={() => navigate('/report')}
                className="group bg-gradient-to-r from-blue-600 via-indigo-700 to-blue-800 text-white px-16 py-6 rounded-2xl font-bold text-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center relative overflow-hidden animate-gradient"
              >
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
                <div className="text-2xl mt-2"></div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-gray-300">AI-Powered Support</div>
                <div className="text-2xl mt-2"></div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">100%</div>
                <div className="text-gray-300">Secure & Transparent</div>
                <div className="text-2xl mt-2"></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 py-8">
            {["/Stempid.jpg", "/potholes.png", "/streetLight.webp", "/cityCleaning.webp"].map((src, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
                style={{ width: 300, height: 300 }}
              >
                <img
                  src={src}
                  alt={`Civic Example ${idx + 1}`}
                  className="object-cover w-full h-full"
                  style={{ display: "block" }}
                />
              </div>
            ))}
          </div>
          
          
          <div className="mt-20 text-center">
            <div className="flex items-center justify-center space-x-3 text-white/75 text-lg">
              <Shield className="w-5 h-5" />
              <span>Proudly Secured by Government of Jharkhand</span>
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