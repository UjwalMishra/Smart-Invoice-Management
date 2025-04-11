import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { startEmailProcessing } from "../../utils/startEmailProcessing";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [gmail, setGmail] = useState("");
  const [appPassword, setAppPassword] = useState("");
  const [filter, setFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState(null);

  const COLORS = ["#28a745", "#f0ad4e", "#dc3545"];

  useEffect(() => {
    const checkAndStartProcessing = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/auth/checkGmailStatus",
          { withCredentials: true }
        );
        if (res.data.hasGmail) {
          try {
            await startEmailProcessing();
            console.log("✅ Auto email processing started.");
          } catch {
            console.warn(
              "⚠️ Email processing already running or failed to start."
            );
          }
        }
      } catch (error) {
        console.error("Error checking Gmail status:", error);
      }
    };
    checkAndStartProcessing();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/invoices/getInvoices",
        { withCredentials: true }
      );
      if (res.data.success) setInvoices(res.data.data);
    } catch (err) {
      console.error("Error fetching invoices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleGmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:8000/api/auth/addgmailappPass",
        { gmailAddress: gmail, gmailAppPassword: appPassword },
        { withCredentials: true }
      );

      if (res.data.message === "Gmail details updated successfully") {
        alert("Gmail details saved! Starting email processing...");
        try {
          await startEmailProcessing();
          alert("✅ Email processing started successfully.");
        } catch {
          alert("⚠️ Email processing already running.");
        }
        fetchInvoices();
      } else {
        alert("Failed to save Gmail details.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  const today = new Date();
  const dueSoonInvoices = invoices.filter((inv) => {
    const due = new Date(inv.metadata.dueDate);
    const diff = (due - today) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 7;
  });
  const overdueInvoices = invoices.filter(
    (inv) => new Date(inv.metadata.dueDate) < today
  );

  const filteredInvoices =
    filter === "all"
      ? invoices
      : filter === "dueSoon"
      ? dueSoonInvoices
      : overdueInvoices;

  const chartData = [
    { name: "Total", value: invoices.length },
    { name: "Due Soon", value: dueSoonInvoices.length },
    { name: "Overdue", value: overdueInvoices.length },
  ];

  const onPieEnter = (_, index) => setActiveIndex(index);
  const onPieLeave = () => setActiveIndex(null);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-10 tracking-wide text-[#58a6ff]">
        Invoice Dashboard
      </h1>

      {loading ? (
        <p className="text-center text-lg animate-pulse">Loading invoices...</p>
      ) : invoices.length === 0 ? (
        <div className="text-center">
          <p className="text-lg mb-4">No invoices found.</p>
          <h3 className="text-xl font-semibold mb-4">
            Please fill your Gmail and App Password to start automation.
          </h3>
          <form
            onSubmit={handleGmailSubmit}
            className="max-w-md mx-auto flex flex-col gap-4"
          >
            <input
              type="email"
              placeholder="Enter your Gmail"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
              required
              className="p-3 rounded-lg bg-[#161b22] border border-[#30363d] text-white"
            />
            <input
              type="password"
              placeholder="Enter App Password"
              value={appPassword}
              onChange={(e) => setAppPassword(e.target.value)}
              required
              className="p-3 rounded-lg bg-[#161b22] border border-[#30363d] text-white"
            />
            <button
              type="submit"
              className="bg-[#238636] hover:bg-green-700 py-2 px-4 rounded-lg text-white font-medium transition-all"
            >
              Save Gmail Details
            </button>
          </form>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row items-center justify-around gap-10 my-10 px-16">
            {/* Pie Chart Section */}
            <div className="bg-[#161b22] border border-[#30363d] p-6 rounded-xl shadow-md">
              <ResponsiveContainer width={300} height={250}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onPieLeave}
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        stroke={index === activeIndex ? "#fff" : "#0d1117"}
                        strokeWidth={index === activeIndex ? 3 : 1}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Dashboard Highlights */}
            <div className="text-left max-w-md space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-center mb-6">
                Real-Time Invoice Insights at a Glance
              </h2>
            </div>
          </div>

          {/* Filters */}
          <div className="flex justify-center items-center p-8 gap-16 mb-8">
            {[
              { label: "All", value: "all", color: "#238636" },
              { label: "Due Soon", value: "dueSoon", color: "#f0ad4e" },
              { label: "Overdue", value: "overdue", color: "#dc3545" },
            ].map((btn) => (
              <button
                key={btn.value}
                onClick={() => setFilter(btn.value)}
                className={`px-5 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  filter === btn.value
                    ? `bg-[${btn.color}] shadow-lg scale-105`
                    : "bg-[#161b22]"
                } border border-[#30363d] text-white`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Invoice Cards */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredInvoices.map((invoice) => (
              <motion.div
                key={invoice._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                <h2 className="text-xl font-semibold text-[#58a6ff] mb-2">
                  Invoice #{invoice.metadata.number || "N/A"}
                </h2>
                <p>
                  <span className="font-medium">Issue Date:</span>{" "}
                  {invoice.metadata.date || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Due Date:</span>{" "}
                  {invoice.metadata.dueDate || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Amount:</span> ₹
                  {invoice.amounts?.subtotal?.toFixed(2) || "N/A"}
                </p>
                <p>
                  <span className="font-medium">From:</span>{" "}
                  {invoice.parties?.supplier?.name || "Unknown"}
                </p>
                <p>
                  <span className="font-medium">To:</span>{" "}
                  {invoice.parties?.customer?.name || "Unknown"}
                </p>

                <button
                  className="mt-4 px-4 py-2 bg-[#238636] rounded-lg text-white font-medium hover:bg-green-700 transition"
                  onClick={() => setSelectedInvoice(invoice)}
                >
                  View Details
                </button>
              </motion.div>
            ))}
          </div>

          {/* Detailed View */}
          {selectedInvoice && (
            <motion.div
              className="mt-12 max-w-4xl mx-auto bg-[#21262d] border border-[#30363d] p-8 rounded-2xl shadow-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-[#58a6ff] mb-4">
                Invoice #{selectedInvoice.metadata.number || "N/A"} - Full
                Details
              </h2>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Issue Date:</span>{" "}
                  {selectedInvoice.metadata.date}
                </p>
                <p>
                  <span className="font-medium">Due Date:</span>{" "}
                  {selectedInvoice.metadata.dueDate}
                </p>
                <p>
                  <span className="font-medium">Invoice Type:</span>{" "}
                  {selectedInvoice.metadata.type || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Amount (Total):</span> ₹
                  {selectedInvoice.amounts?.subtotal?.toFixed(2)}
                </p>
                <p>
                  <span className="font-medium">Supplier:</span>{" "}
                  {selectedInvoice.parties?.supplier?.name || "Unknown"}
                </p>
                <p>
                  <span className="font-medium">Customer:</span>{" "}
                  {selectedInvoice.parties?.customer?.name || "Unknown"}
                </p>
                <p>
                  <span className="font-medium">Processed At:</span>{" "}
                  {new Date(
                    selectedInvoice.system.processedAt
                  ).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Description:</span>{" "}
                  {selectedInvoice.metadata.description || "N/A"}
                </p>
              </div>
              <button
                className="mt-6 px-4 py-2 bg-red-600 rounded-lg text-white font-medium hover:bg-red-700 transition"
                onClick={() => setSelectedInvoice(null)}
              >
                Close Details
              </button>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
