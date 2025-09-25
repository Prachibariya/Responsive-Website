import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Truck, Headphones, Award, Users, MapPin, Clock, Star } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Truck className="h-8 w-8 text-purple-600" />,
      title: "Free Shipping",
      description: "Free shipping on orders over $100. Fast and reliable delivery worldwide."
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      title: "2 Year Warranty",
      description: "Comprehensive warranty coverage on all products with hassle-free replacements."
    },
    {
      icon: <Headphones className="h-8 w-8 text-purple-600" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support via phone, email, and live chat."
    },
    {
      icon: <Award className="h-8 w-8 text-purple-600" />,
      title: "Quality Guarantee",
      description: "Only authentic products from authorized dealers and manufacturers."
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "1000+", label: "Products" },
    { number: "15+", label: "Countries" },
    { number: "24/7", label: "Support" }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      description: "10+ years experience in tech industry"
    },
    {
      name: "Mike Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      description: "Expert in e-commerce technology"
    },
    {
      name: "Emily Davis",
      role: "Head of Marketing",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      description: "Digital marketing specialist"
    },
    {
      name: "David Wilson",
      role: "Customer Success",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      description: "Ensuring customer satisfaction"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1600&h=600&fit=crop")'
          }}
        ></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About TechMart</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Your trusted partner in premium electronics and technology solutions since 2015
          </p>
          <Link 
            to="/contact"
            className="inline-block bg-white text-purple-900 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            Get In Touch
          </Link>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full animate-pulse delay-300"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  Founded in 2015, TechMart began as a small startup with a big vision: 
                  to make premium technology accessible to everyone. What started in a 
                  garage has grown into one of the most trusted names in electronics retail.
                </p>
                <p>
                  We believe technology should enhance lives, not complicate them. That's 
                  why we carefully curate every product in our catalog, ensuring you get 
                  the best value, quality, and innovation.
                </p>
                <p>
                  Today, we serve customers in over 15 countries, with a team dedicated 
                  to providing exceptional service and support. Our mission remains the 
                  same: bringing you tomorrow's technology, today.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
                alt="TechMart office"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center">
                <Award className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose TechMart?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best shopping experience with premium products and exceptional service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-2xl hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate people behind TechMart who make it all possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-purple-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="text-center lg:text-left">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To democratize access to cutting-edge technology by providing authentic, 
                high-quality products at competitive prices, backed by exceptional customer 
                service and support.
              </p>
            </div>
            
            <div className="text-center lg:text-left">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To become the world's most trusted technology retailer, empowering 
                individuals and businesses to achieve more through innovative technology 
                solutions and unparalleled service excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience the Future?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Discover our latest collection of premium tech products
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products"
              className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Shop Now
            </Link>
            <Link 
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;