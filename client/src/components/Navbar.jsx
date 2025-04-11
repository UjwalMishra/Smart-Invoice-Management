import { Link } from "react-router-dom";
import { useState, useLayoutEffect } from "react";
import Cookies from "js-cookie";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useLayoutEffect(() => {
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);
    setCheckingAuth(false);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
  };

  if (checkingAuth) return null;

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-2xl font-bold text-white font-mono">
                SmartInvoice
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <Link
                to="/"
                className="text-gray-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-white/10"
              >
                Home
              </Link>
              <Link
                to="/aboutus"
                className="text-gray-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-white/10"
              >
                About Us
              </Link>

              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  className="text-gray-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-white/10"
                >
                  Dashboard
                </Link>
              )}

              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="text-gray-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-white/10"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-white/10"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="ml-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
