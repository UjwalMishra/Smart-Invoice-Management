import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GmailDetailsForm = () => {
  const [gmailAddress, setGmailAddress] = useState("");
  const [gmailAppPassword, setGmailAppPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Send request to the backend to update Gmail details
      const response = await axios.put("/addgmailappPass", {
        gmailAddress,
        gmailAppPassword,
      });

      if (response.status === 200) {
        // Redirect to dashboard or another page after successful update
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Error updating Gmail details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Replace 'YOUR_IMAGE_LINK_HERE' with the actual link to your image
  const backgroundImageStyle = {
    backgroundImage: 'url("/bg.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Optional: Dark overlay
    backgroundBlendMode: "darken", // Optional: Blend mode
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center text-white px-4"
      style={backgroundImageStyle}
    >
      <div className="bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-teal-400 text-center mb-6">
          Add Gmail Details
        </h2>

        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Gmail Address
            </label>
            <input
              type="email"
              placeholder="Enter your Gmail address"
              value={gmailAddress}
              onChange={(e) => setGmailAddress(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Gmail App Password
            </label>
            <input
              type="password"
              placeholder="Enter your Gmail App Password"
              value={gmailAppPassword}
              onChange={(e) => setGmailAppPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 text-black font-semibold py-2 rounded-xl hover:bg-teal-400 transition duration-300"
          >
            {loading ? "Saving..." : "Update Gmail Details"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GmailDetailsForm;
