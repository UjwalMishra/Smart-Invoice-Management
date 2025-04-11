import React, { useEffect, useState } from "react";
import axios from "axios";
import { startEmailProcessing } from "../../utils/startEmailProcessing";

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [gmail, setGmail] = useState("");
  const [appPassword, setAppPassword] = useState("");

  const fetchInvoices = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/invoices/getInvoices",
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setInvoices(res.data.data);
      }
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
        {
          gmailAddress: gmail,
          gmailAppPassword: appPassword,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.message === "Gmail details updated successfully") {
        alert("Gmail details saved! Starting email processing...");

        // ✅ Start processing after credentials are saved
        try {
          await startEmailProcessing();
          alert("✅ Email processing started successfully.");
        } catch (error) {
          alert(
            "⚠️ Failed to start email processing. It may already be running."
          );
          console.error(error);
        }

        fetchInvoices();
      } else {
        alert("Failed to save Gmail details.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while saving Gmail details.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-10">
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
              className="bg-[#238636] hover:bg-green-700 py-2 px-4 rounded-lg text-white font-medium"
            >
              Save Gmail Details
            </button>
          </form>
        </div>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {invoices.map((invoice) => (
              <div
                key={invoice._id}
                className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
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
              </div>
            ))}
          </div>

          {/* Detailed View */}
          {selectedInvoice && (
            <div className="mt-12 max-w-4xl mx-auto bg-[#21262d] border border-[#30363d] p-8 rounded-2xl shadow-xl">
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
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
