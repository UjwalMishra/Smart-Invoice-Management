import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#0f172a] min-h-screen text-white overflow-hidden">
      {/* Animated Navbar */}

      {/* Hero Section with Animated Background */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-teal-500/10"
              style={{
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 50 + 20}s`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.5,
                transform: `scale(${Math.random() * 0.8 + 0.2})`,
                animation: "float 30s infinite ease-in-out",
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl text-center">
          <div className="inline-block mb-6 animate-pulse">
            <span className="text-sm px-4 py-1 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-full font-medium tracking-wide">
              ● Intelligent Invoice Processing
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Automate Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
              Invoice
            </span>{" "}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Workflow
            </span>
          </h1>

          <p className="text-xl text-center max-w-2xl mx-auto text-gray-300 mb-10">
            Eliminate manual work with AI-powered invoice processing that
            extracts, validates, and approves with unmatched accuracy and
            efficiency.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <NavLink to="/login">
              <button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-teal-500/25 transition duration-300 transform hover:-translate-y-1">
                Get Started
              </button>
            </NavLink>
            <button
              onClick={() =>
                window.open("https://youtu.be/ZQzXRwgfRMk", "_blank")
              }
              className="bg-gray-900/50 backdrop-blur-sm hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold border border-gray-700 hover:border-teal-500/50 transition duration-300 transform hover:-translate-y-1 flex items-center"
            >
              <span className="mr-2">Watch Demo</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>

          {/* Statistics */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="text-center backdrop-blur-sm bg-white/5 rounded-xl px-8 py-4 border border-white/10">
              <div className="text-3xl font-bold text-cyan-400">Real-time</div>
              <div className="text-gray-400">Data Extraction</div>
            </div>
            <div className="text-center backdrop-blur-sm bg-white/5 rounded-xl px-8 py-4 border border-white/10">
              <div className="text-3xl font-bold text-blue-400">
                Auto-Detect
              </div>
              <div className="text-gray-400">Format Recognition</div>
            </div>
          </div>

          {/* Mouse Scroll Indicator */}
        </div>
      </div>

      {/* Key Features Section with Card Hover Effects */}
      <div
        id="features"
        className="w-full bg-gradient-to-b from-[#0f172a] to-[#0f1e30] py-24 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm px-4 py-1 bg-gray-800 text-teal-400 rounded-full font-medium uppercase tracking-wider">
              Powerful Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our AI-powered platform streamlines your entire invoice workflow
              from receipt to payment
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Automated Extraction",
                desc: "Extract data from emails and PDFs automatically with our advanced AI technology.",
                icon: "📄",
                gradient: "from-teal-500 to-cyan-500",
              },
              {
                title: "Mismatch Detection",
                desc: "Identify discrepancies instantly with our intelligent validation system.",
                icon: "✔️",
                gradient: "from-cyan-500 to-blue-500",
              },
              {
                title: "Approval Automation",
                desc: "Streamline approvals with customizable workflows and automatic routing.",
                icon: "⚡",
                gradient: "from-blue-500 to-indigo-500",
              },
              {
                title: "Real-time Dashboard",
                desc: "Monitor processing status and KPIs in a central, intuitive dashboard.",
                icon: "📊",
                gradient: "from-indigo-500 to-purple-500",
              },
              {
                title: "Secure Storage",
                desc: "Store all your invoice data with enterprise-grade encryption and compliance.",
                icon: "🔒",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                title: "Seamless Integration",
                desc: "Connect with your existing accounting and ERP systems effortlessly.",
                icon: "➡️",
                gradient: "from-pink-500 to-teal-500",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group relative bg-[#0f1e30] border border-white/10 rounded-xl p-8 overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-teal-500/10 hover:border-teal-500/30 hover:-translate-y-2"
              >
                {/* Gradient Background on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-700`}
                ></div>

                <div className="text-4xl mb-6 group-hover:scale-110 transform transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-teal-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.desc}</p>

                {/* Learn More Button */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <a
                    href="#"
                    className="text-teal-400 font-medium inline-flex items-center"
                  >
                    Learn more
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 ml-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section with 3D Effect */}
      <div
        id="how-it-works"
        className="w-full bg-[#020617] py-24 px-6 relative overflow-hidden"
      >
        {/* Background Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)",
            backgroundSize: "50px 50px",
          }}
        ></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-sm px-4 py-1 bg-gray-800 text-cyan-400 rounded-full font-medium uppercase tracking-wider">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400">
            How It Works
          </h2>
          <p className="text-xl text-gray-300 mb-20 max-w-3xl mx-auto">
            A seamless process that transforms your invoice management
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Capture",
                desc: "Automatically collect invoices from emails and documents",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-12 h-12"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Process",
                desc: "Extract data and validate against your business rules",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-12 h-12"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Approve",
                desc: "Route for approval and integrate with your payment systems",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-12 h-12"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
            ].map((item, index, arr) => (
              <div
                key={index}
                className="flex flex-col items-center relative group"
              >
                {/* Step Card */}
                <div className="bg-[#0f1e30]/70 backdrop-blur-sm border border-white/10 rounded-xl p-10 text-center transition-all duration-500 shadow-xl hover:shadow-teal-500/10 w-full h-full transform perspective-1200 group-hover:rotate-y-12 group-hover:scale-105">
                  {/* Step Number */}
                  <div className="relative inline-flex mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 blur-md opacity-30 group-hover:opacity-70 transition-opacity duration-500"></div>
                    <div className="relative z-10 w-16 h-16 flex items-center justify-center rounded-full bg-[#112a46] border border-teal-500/30 text-teal-400">
                      {item.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl text-white font-bold mb-4 group-hover:text-teal-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-lg text-gray-300">{item.desc}</p>
                </div>

                {/* Arrow (except after last card) */}
                {index !== arr.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-[-40px] transform translate-y-[-50%] z-20">
                    <div className="text-cyan-400 text-4xl opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                      {"→"}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div
        id="pricing"
        className="w-full bg-[#0f172a] py-16 px-6 relative overflow-hidden"
      >
        {/* Background Animated Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 opacity-30"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="bg-gradient-to-br from-[#0f1e30] to-[#112a46] rounded-2xl p-12 shadow-2xl border border-white/10 overflow-hidden relative">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
              {/* Left Side: Free Trial */}
              <div className="text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  Ready to Transform Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                    Invoice Processing?
                  </span>
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Join hundreds of businesses that have already automated their
                  invoice workflows and saved thousands of hours.
                </p>
                <div className="flex flex-wrap gap-4">
                  <NavLink to="/login">
                    <button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-teal-500/25 transition duration-300 transform hover:-translate-y-1 flex items-center">
                      Start Your Free Trial
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5 ml-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </NavLink>
                  <button
                    onClick={() =>
                      window.open("https://youtu.be/ZQzXRwgfRMk", "_blank")
                    }
                    className="bg-gray-900/50 backdrop-blur-sm hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold border border-gray-700 hover:border-teal-500/50 transition duration-300 transform hover:-translate-y-1"
                  >
                    Watch Demo
                  </button>
                </div>
              </div>

              {/* Right Side: Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "24/7 Support",
                    desc: "Dedicated customer success team",
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    ),
                  },
                  {
                    title: "Enterprise Security",
                    desc: "SOC 2 and GDPR compliant",
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    ),
                  },
                  {
                    title: "Easy Integration",
                    desc: "Works with your software",
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                        />
                      </svg>
                    ),
                  },
                  {
                    title: "Flexible Pricing",
                    desc: "Pay only for what you use",
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    ),
                  },
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 transition-all duration-300 hover:border-teal-500/30 hover:bg-white/10"
                  >
                    <div className="bg-gradient-to-br from-teal-500 to-cyan-500 p-3 rounded-lg text-white">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-300">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="w-full bg-[#0f172a] py-8 px-6 border-t border-gray-700 ">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">InvoiceAI</h3>
            <p className="text-gray-300 mb-6">
              Automate your invoice processing with SmartInvoice extraction,
              validation, and approval workflows. Save time, reduce errors, and
              gain insights.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/ujwalmishra/"
                target="_blank"
                className="text-gray-400 hover:text-white"
              >
                {/* LinkedIn Icon */}
                <FaLinkedin className="text-2xl" />
              </a>
              <a
                href="https://x.com/mishrax_"
                target="_blank"
                className="text-gray-400 hover:text-white"
              >
                {/* Twitter Icon */}
                <FaXTwitter className="text-2xl" />
              </a>
              <a
                href="https://github.com/UjwalMishra"
                target="_blank"
                className="text-gray-400 hover:text-white"
              >
                {/* GitHub Icon */}
                <FaGithub className="text-2xl" />
              </a>
              <a
                href="https://www.youtube.com/watch?v=ZQzXRwgfRMk"
                target="_blank"
                className="text-gray-400 hover:text-white"
              >
                {/* YouTube Icon */}
                <FaYoutube className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Features
                </a>
              </li>

              <li>
                <a
                  href="https://github.com/UjwalMishra/Smart-Invoice-Management"
                  target="_blank"
                  className="text-gray-300 hover:text-white"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="/aboutus" className="text-gray-300 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/login" className="text-gray-300 hover:text-white">
                  Login
                </a>
              </li>
              <li>
                <a href="/signup" className="text-gray-300 hover:text-white">
                  Signup
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Webinars
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright and Legal */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>&copy; 2025 SmartInvoice. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Cookie Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
