import React from "react";

const LandingPage = () => {
  return (
    <>
      {/* Hero / Landing Section */}
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0f172a] to-[#020617] text-white flex flex-col items-center justify-center px-6 py-12">
        <div className="mb-4">
          <span className="text-sm px-4 py-1 bg-[#0f766e] text-white rounded-full font-medium tracking-wide">
            ● Intelligent Invoice Processing
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 leading-tight">
          Automate Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
            Invoice
          </span>{" "}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            Workflow
          </span>
        </h1>

        <p className="text-lg text-center max-w-2xl text-gray-300 mb-8">
          Eliminate manual work with AI-powered invoice processing that extracts,
          validates, and approves with unmatched accuracy and efficiency.
        </p>

        <div className="flex gap-4 mb-10">
          <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition duration-300">
            Get Started
          </button>
          <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold border border-gray-600 transition duration-300">
            Watch Demo
          </button>
        </div>

      </div>

      {/* Key Features Section */}
      <div className="w-full bg-[#0f172a] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Key Features
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Automated Extraction",
                desc: "Extract data from emails and PDFs automatically with our advanced AI technology.",
                icon: "📄",
              },
              {
                title: "Mismatch Detection",
                desc: "Identify discrepancies instantly with our intelligent validation system.",
                icon: "✔️",
              },
              {
                title: "Approval Automation",
                desc: "Streamline approvals with customizable workflows and automatic routing.",
                icon: "⚡",
              },
              {
                title: "Real-time Dashboard",
                desc: "Monitor processing status and KPIs in a central, intuitive dashboard.",
                icon: "📊",
              },
              {
                title: "Secure Storage",
                desc: "Store all your invoice data with enterprise-grade encryption and compliance.",
                icon: "🔒",
              },
              {
                title: "Seamless Integration",
                desc: "Connect with your existing accounting and ERP systems effortlessly.",
                icon: "➡️",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-[#0f1e30] hover:bg-[#112a46] border border-white/10 rounded-xl p-6 shadow-lg transition-all duration-300"
              >
                <div className="text-3xl mb-4 text-teal-400">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="w-full bg-[#020617] py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-4">How It Works</h2>
          <p className="text-gray-300 mb-16">
            A seamless process that transforms your invoice management
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Capture",
                desc: "Automatically collect invoices from emails and documents",
              },
              {
                step: "02",
                title: "Process",
                desc: "Extract data and validate against your business rules",
              },
              {
                step: "03",
                title: "Approve",
                desc: "Route for approval and integrate with your payment systems",
              },
            ].map((item, index, arr) => (
              <div key={index} className="flex flex-col items-center relative">
                <div className="bg-[#0f1e30] border border-white/10 rounded-xl p-8 text-left transition-all duration-300 shadow-lg hover:shadow-cyan-500/10 h-full w-full">
                  <div className="absolute -top-4 -left-4 w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500 text-black font-bold text-sm shadow-md">
                    {index + 1}
                  </div>

                  <div className="text-5xl text-white font-bold opacity-10 mb-2">{item.step}</div>
                  <h3 className="text-xl text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.desc}</p>
                </div>

                {/* Arrow (except after last card) */}
                {index !== arr.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-[-30px] translate-y-[-50%]">
                    <div className="text-cyan-400 text-4xl">{'→'}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Free Trial and Features Section (Enhanced) */}
      <div className="w-full bg-[#0f172a] py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center rounded-xl p-8 shadow-2xl transition-all duration-300 hover:shadow-xl hover:bg-[#112a46] border border-gray-700">
          {/* Left Side: Free Trial */}
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your Invoice Processing?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Join hundreds of businesses that have already automated their
              invoice workflows and saved thousands of hours.
            </p>
            <div className="flex gap-4">
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition duration-300">
                Start Free Trial →
              </button>
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold border border-gray-600 transition duration-300">
                Schedule Demo
              </button>
            </div>
          </div>

          {/* Right Side: Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-[#112a46] p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-teal-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Free 14-day trial
                </h3>
                <p className="text-sm text-gray-300">No credit card required</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#112a46] p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-teal-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Enterprise-grade security
                </h3>
                <p className="text-sm text-gray-300">
                  SOC 2 and GDPR compliant
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#112a46] p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-teal-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">24/7 Support</h3>
                <p className="text-sm text-gray-300">
                  Dedicated customer success team
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

{/* Footer Section */}
<footer className="w-full bg-[#0f172a] py-8 px-6 border-t border-gray-700 ">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
    {/* Company Info */}
    <div>
      <h3 className="text-xl font-semibold text-white mb-4">InvoiceAI</h3>
      <p className="text-gray-300 mb-6">
        Automate your invoice processing with AI-powered extraction, validation, and approval workflows. Save time, reduce errors, and gain insights.
      </p>
      <div className="flex space-x-4">
        <a href="#" className="text-gray-400 hover:text-white">
          {/* LinkedIn Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19.387v-8.353h-2.844v8.353h2.844zm-1.422-9.922c-.928 0-1.5-1.003-.875-1.742 1.254-1.58 4.129-1.767 5.176-.395 1.135 1.48 1.042 3.964-.207 5.346-1.25 1.378-3.92 1.426-5.094 0-.625-.74-.719-1.365-.001-1.751zm11 9.922v-4.839c0-2.505-1.364-3.47-3.175-3.47-1.547 0-2.536 1.031-2.946 2.034-.151.357-.197.854-.197 1.359v4.916h-2.842v-8.353h2.755v1.175c.369-.558 1.278-1.713 3.125-1.713 2.288 0 3.96 1.494 3.96 4.711v5.179h-2.839z"/>
          </svg>
        </a>
        <a href="#" className="text-gray-400 hover:text-white">
          {/* Twitter Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.46 6c-.77.68-1.63 1.15-2.6 1.5 1.12-.33 2.24-1.6 4.08-3.06 5.2 0 .22 0 .43-.02.63-.3 1.05-1.1 1.95-2 2.55-1.8.6-3.83.9-5.88 1.25.83.5 1.58.75 2.45.75 4.68 0 8.08-3.88 8.08-8.08 0-.12 0-.23-.02-.34.56-.4 1.04-.9 1.43-1.48z"/>
          </svg>
        </a>
        <a href="#" className="text-gray-400 hover:text-white">
          {/* GitHub Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.099.844-.276.844-.614 0-.336-.012-1.226-.022-2.227-3.339.728-4.042-1.639-4.042-1.639-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.021.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.009 2.895-.017 3.283 0 .335.217.734.849.613 4.809-1.589 8.197-6.089 8.197-11.383 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <a href="#" className="text-gray-400 hover:text-white">
          {/* YouTube Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 6.38c-.278-.977-1.11-1.66-2.062-1.688-1.925-.075-4.833-.075-6.757-.075-5.073 0-9.805.075-11.73.075-2.063.027-2.924.71-3.2 1.688-.313 1.102-.313 2.238-.313 3.376v2.87c0 1.137 0 2.274.313 3.376.276.977 1.137 1.66 2.09 1.688 1.924.075 4.832.075 6.756.075 1.924 0 4.832-.075 6.756-.075.952-.028 1.813-.71 2.088-1.688.313-1.102.313-2.238.313-3.376v-2.87c0-1.138 0-2.274-.313-3.376z"/>
          </svg>
        </a>
      </div>
    </div>

    {/* Product Links */}
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
      <ul className="space-y-2">
        <li><a href="#" className="text-gray-300 hover:text-white">Features</a></li>
        <li><a href="#" className="text-gray-300 hover:text-white">Pricing</a></li>
        <li><a href="#" className="text-gray-300 hover:text-white">Integrations</a></li>
        <li><a href="#" className="text-gray-300 hover:text-white">Case Studies</a></li>
        <li><a href="#" className="text-gray-300 hover:text-white">API Documentation</a></li>
      </ul>
    </div>

    {/* Company Links */}
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
      <ul className="space-y-2">
        <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
        <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
        <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
        <li><a href="#" className="text-gray-300 hover:text-white">Press</a></li>
        <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
      </ul>
    </div>

    {/* Resources Links */}
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
      <ul className="space-y-2">
        <li><a href="#" className="text-gray-300 hover:text-white">Help Center</a></li>
        <li><a href="#" className="text-gray-300 hover:text-white">Community</a></li>
        <li><a href="#" className="text-gray-300 hover:text-white">Webinars</a></li>
        <li><a href="#" className="text-gray-300 hover:text-white">Privacy</a></li>
        <li><a href="#" className="text-gray-300 hover:text-white">Terms</a></li>
      </ul>
    </div>
  </div>

  {/* Copyright and Legal */}
  <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
    <p>&copy; 2025 InvoiceAI. All rights reserved.</p>
    <div className="mt-4 space-x-4">
      <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
      <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
      <a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a>
    </div>
  </div>
</footer>
    </>
    
  );
};

export default LandingPage;