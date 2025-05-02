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
import {
  ArrowRightCircle,
  Calendar,
  DollarSign,
  Mail,
  AlertTriangle,
  Clock,
  User,
  FileText,
  ChevronDown,
} from "lucide-react";

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [gmail, setGmail] = useState("");
  const [appPassword, setAppPassword] = useState("");
  const [filter, setFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState(null);
  const [chartHover, setChartHover] = useState(false);

  const COLORS = ["#6366f1", "#f59e0b", "#ef4444"];
  const GRADIENTS = [
    "from-blue-400 to-indigo-500",
    "from-amber-400 to-orange-500",
    "from-red-400 to-rose-500",
  ];

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

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
    setChartHover(true);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
    setChartHover(false);
  };

  const getStatusColor = (invoice) => {
    const dueDate = new Date(invoice.metadata.dueDate);
    if (dueDate < today) return "bg-red-500";

    const diff = (dueDate - today) / (1000 * 60 * 60 * 24);
    if (diff <= 7) return "bg-amber-500";
    return "bg-green-500";
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const statsCards = [
    {
      title: "Total Invoices",
      value: invoices.length,
      icon: <FileText size={24} />,
      color: "bg-gradient-to-br from-blue-500 to-indigo-600",
    },
    {
      title: "Due Soon",
      value: dueSoonInvoices.length,
      icon: <Clock size={24} />,
      color: "bg-gradient-to-br from-amber-500 to-orange-600",
    },
    {
      title: "Overdue",
      value: overdueInvoices.length,
      icon: <AlertTriangle size={24} />,
      color: "bg-gradient-to-br from-red-500 to-rose-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 mb-4 md:mb-0">
            InvoiceFlow
          </h1>
          <div className="flex space-x-2 text-sm">
            <span className="px-3 py-1 bg-indigo-600/20 border border-indigo-500/30 rounded-full">
              Dashboard
            </span>
            <span className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-full hover:bg-gray-800 cursor-pointer transition">
              Reports
            </span>
            <span className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-full hover:bg-gray-800 cursor-pointer transition">
              Settings
            </span>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="relative w-24 h-24">
              <div className="absolute top-0 w-full h-full rounded-full border-4 border-t-indigo-500 border-r-indigo-200/20 border-b-indigo-200/20 border-l-indigo-200/20 animate-spin"></div>
              <div className="absolute top-0 w-full h-full flex items-center justify-center">
                <span className="text-indigo-500 font-semibold">Loading</span>
              </div>
            </div>
          </div>
        ) : invoices.length === 0 ? (
          <motion.div
            className="max-w-xl mx-auto bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl shadow-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center text-center">
              <Mail size={64} className="text-indigo-400 mb-4" />
              <h3 className="text-2xl font-semibold mb-4">
                Connect Your Email
              </h3>
              <p className="text-gray-400 mb-6">
                Enter your Gmail and App Password to start automating your
                invoice processing
              </p>

              <form onSubmit={handleGmailSubmit} className="w-full space-y-4">
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-3 text-gray-500"
                  />
                  <input
                    type="email"
                    placeholder="Enter your Gmail address"
                    value={gmail}
                    onChange={(e) => setGmail(e.target.value)}
                    required
                    className="pl-10 w-full p-3 rounded-xl bg-gray-900/70 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
                  />
                </div>

                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">
                    🔑
                  </span>
                  <input
                    type="password"
                    placeholder="Enter App Password"
                    value={appPassword}
                    onChange={(e) => setAppPassword(e.target.value)}
                    required
                    className="pl-10 w-full p-3 rounded-xl bg-gray-900/70 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 py-3 px-6 rounded-xl text-white font-medium transition-all flex items-center justify-center space-x-2 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Connect Gmail</span>
                  <ArrowRightCircle
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </motion.button>
              </form>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Stats Card Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {statsCards.map((stat, index) => (
                <motion.div
                  key={index}
                  className={`${stat.color} rounded-2xl p-6 shadow-lg overflow-hidden relative`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white/80 font-medium">{stat.title}</p>
                      <h3 className="text-3xl font-bold text-white mt-1">
                        {stat.value}
                      </h3>
                    </div>
                    <div className="bg-white/20 p-3 rounded-lg">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                </motion.div>
              ))}
            </div>

            {/* Chart and Info Section */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
              <motion.div
                className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold mb-4">
                  Invoice Distribution
                </h2>
                <div className="flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: chartHover ? 1.05 : 1,
                      rotateY: chartHover ? 5 : 0,
                      rotateX: chartHover ? -5 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <ResponsiveContainer width={280} height={280}>
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                          onMouseEnter={onPieEnter}
                          onMouseLeave={onPieLeave}
                          cornerRadius={6}
                        >
                          {chartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                              stroke={COLORS[index % COLORS.length]}
                              strokeWidth={index === activeIndex ? 2 : 0}
                              style={{
                                filter:
                                  index === activeIndex
                                    ? "drop-shadow(0 0 8px rgba(255,255,255,0.3))"
                                    : "none",
                              }}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(17, 24, 39, 0.9)",
                            borderColor: "#374151",
                            borderRadius: "0.5rem",
                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                          }}
                          itemStyle={{ color: "#fff" }}
                        />
                        <Legend
                          verticalAlign="bottom"
                          height={36}
                          formatter={(value) => (
                            <span className="text-gray-300">{value}</span>
                          )}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="lg:col-span-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 mb-4">
                  Invoice Dashboard Insights
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                    <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                      <Calendar size={18} className="text-indigo-400" />
                      <span>Invoice Timeline</span>
                    </h3>
                    <p className="text-gray-400">
                      {dueSoonInvoices.length} invoices due in the next week.
                      {overdueInvoices.length > 0
                        ? ` ${overdueInvoices.length} need immediate attention.`
                        : " All payments on track."}
                    </p>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                    <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                      <DollarSign size={18} className="text-green-400" />
                      <span>Financial Summary</span>
                    </h3>
                    <p className="text-gray-400">
                      Track your cash flow with automated invoice processing and
                      real-time status updates.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium mb-1">Need Help?</h3>
                    <p className="text-gray-400 text-sm">
                      Connect Gmail to automate invoice processing and get
                      notifications.
                    </p>
                  </div>
                  <button className="bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-lg text-white font-medium transition-all text-sm flex items-center gap-2">
                    <Mail size={16} />
                    <span>Manage Email</span>
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Filters */}
            <div className="flex justify-center gap-3 mb-8">
              {[
                {
                  label: "All Invoices",
                  value: "all",
                  icon: <FileText size={16} />,
                },
                {
                  label: "Due Soon",
                  value: "dueSoon",
                  icon: <Clock size={16} />,
                },
                {
                  label: "Overdue",
                  value: "overdue",
                  icon: <AlertTriangle size={16} />,
                },
              ].map((btn, index) => (
                <motion.button
                  key={btn.value}
                  onClick={() => setFilter(btn.value)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
                    filter === btn.value
                      ? `bg-gradient-to-r ${GRADIENTS[index]} text-white shadow-lg`
                      : "bg-gray-800/50 border border-gray-700 text-gray-300"
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                >
                  {btn.icon}
                  {btn.label}
                </motion.button>
              ))}
            </div>

            {/* Invoice Cards */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8">
              {filteredInvoices.map((invoice, index) => (
                <motion.div
                  key={invoice._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
                >
                  <div className="relative">
                    <div
                      className={`absolute top-0 left-0 w-full h-1 ${getStatusColor(
                        invoice
                      )}`}
                    ></div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-lg font-semibold text-white">
                          Invoice #{invoice.metadata.number || "N/A"}
                        </h2>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            getStatusColor(invoice) === "bg-red-500"
                              ? "bg-red-500/20 text-red-400"
                              : getStatusColor(invoice) === "bg-amber-500"
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {getStatusColor(invoice) === "bg-red-500"
                            ? "Overdue"
                            : getStatusColor(invoice) === "bg-amber-500"
                            ? "Due Soon"
                            : "On Time"}
                        </span>
                      </div>

                      <div className="space-y-2 text-gray-300">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-gray-400" />
                          <span>
                            Due:{" "}
                            {new Date(
                              invoice.metadata.dueDate
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign size={16} className="text-gray-400" />
                          <span>
                            {formatCurrency(invoice.amounts?.subtotal || 0)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-gray-400" />
                          <span>
                            {invoice.parties?.supplier?.name || "Unknown"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="px-6 pb-6">
                      <motion.button
                        className="w-full bg-gray-700 hover:bg-indigo-600 py-2 px-4 rounded-xl text-white font-medium transition-all flex items-center justify-center gap-2 group-hover:bg-indigo-600"
                        onClick={() => setSelectedInvoice(invoice)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>View Details</span>
                        <ChevronDown
                          size={16}
                          className="transition-transform group-hover:rotate-180"
                        />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Detailed View */}
            {selectedInvoice && (
              <motion.div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedInvoice(null)}
              >
                <motion.div
                  className="w-full max-w-3xl bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 p-8 rounded-2xl shadow-2xl"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
                      Invoice #{selectedInvoice.metadata.number || "N/A"}
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        getStatusColor(selectedInvoice) === "bg-red-500"
                          ? "bg-red-500/20 text-red-400"
                          : getStatusColor(selectedInvoice) === "bg-amber-500"
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {getStatusColor(selectedInvoice) === "bg-red-500"
                        ? "Overdue"
                        : getStatusColor(selectedInvoice) === "bg-amber-500"
                        ? "Due Soon"
                        : "On Time"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-300">
                        Invoice Details
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <Calendar
                            className="text-indigo-400 mt-1"
                            size={18}
                          />
                          <div>
                            <p className="text-sm text-gray-400">Issue Date</p>
                            <p className="font-medium">
                              {selectedInvoice.metadata.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Clock className="text-indigo-400 mt-1" size={18} />
                          <div>
                            <p className="text-sm text-gray-400">Due Date</p>
                            <p className="font-medium">
                              {selectedInvoice.metadata.dueDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <FileText
                            className="text-indigo-400 mt-1"
                            size={18}
                          />
                          <div>
                            <p className="text-sm text-gray-400">
                              Invoice Type
                            </p>
                            <p className="font-medium">
                              {selectedInvoice.metadata.type || "Standard"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <DollarSign
                            className="text-indigo-400 mt-1"
                            size={18}
                          />
                          <div>
                            <p className="text-sm text-gray-400">Amount</p>
                            <p className="font-medium text-xl">
                              {formatCurrency(
                                selectedInvoice.amounts?.subtotal || 0
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-300">
                        Parties
                      </h3>
                      <div className="space-y-4">
                        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-4">
                          <p className="text-sm text-gray-400 mb-1">Supplier</p>
                          <p className="font-medium">
                            {selectedInvoice.parties?.supplier?.name ||
                              "Unknown"}
                          </p>
                        </div>
                        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-4">
                          <p className="text-sm text-gray-400 mb-1">Customer</p>
                          <p className="font-medium">
                            {selectedInvoice.parties?.customer?.name ||
                              "Unknown"}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-4">
                        <p className="text-sm text-gray-400 mb-1">
                          Description
                        </p>
                        <p>
                          {selectedInvoice.metadata.description ||
                            "No description available"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-700 pt-6 flex justify-between items-center">
                    <div className="text-sm text-gray-400">
                      Processed:{" "}
                      {new Date(
                        selectedInvoice.system.processedAt
                      ).toLocaleDateString()}{" "}
                      at{" "}
                      {new Date(
                        selectedInvoice.system.processedAt
                      ).toLocaleTimeString()}
                    </div>
                    <motion.button
                      className="bg-gray-700 hover:bg-red-600 py-2 px-6 rounded-xl text-white font-medium transition-all"
                      onClick={() => setSelectedInvoice(null)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Close
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
