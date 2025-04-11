import React, { useState } from "react";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const sendFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("invoice", file);

    setLoading(true);
    setMessages((prev) => [
      ...prev,
      { type: "user", text: `📎 Uploaded: ${file.name}` },
    ]);

    try {
      const res = await fetch("http://localhost:8000/api/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      try {
        const data = await res.json();

        if (data.invoices && Array.isArray(data.invoices)) {
          const formatted = data.invoices
            .map(
              (inv, i) => `
🧾 <strong>Invoice ${i + 1}</strong><br/>
• <strong>Invoice No:</strong> ${inv.invoiceNumber}<br/>
• <strong>Date:</strong> ${inv.invoiceDate}<br/>
• <strong>Seller:</strong> ${inv.seller}<br/>
• <strong>GSTIN:</strong> ${inv.gstin}<br/>
• <strong>Item:</strong> ${inv.item}<br/>
• <strong>Gross:</strong> ₹${inv.grossAmount}<br/>
• <strong>Discount:</strong> ₹${inv.discount}<br/>
• <strong>Taxable:</strong> ₹${inv.taxableValue}<br/>
• <strong>Tax:</strong> ₹${inv.tax}<br/>
• <strong>Total:</strong> ₹${inv.total}<br/>
• <strong>Shipping:</strong> ₹${inv.shipping}<br/>
${inv.notes ? `• <strong>Notes:</strong> ${inv.notes}<br/>` : ""}
`
            )
            .join("<br/><br/>");

          setMessages((prev) => [...prev, { type: "bot", text: formatted }]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              type: "bot",
              text: "❌ Could not extract invoice details. Server response malformed.",
            },
          ]);
        }
      } catch (jsonError) {
        console.error("JSON parsing error:", jsonError);
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: "⚠️ Server returned invalid JSON." },
        ]);
      }
    } catch (fetchError) {
      console.error("Fetch error:", fetchError);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "⚠️ Upload failed. Network error or server issue.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        height: "100vh",
        width: "100%",
        background: "url('/bg.jpg') no-repeat center center fixed",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          padding: 20,
          maxWidth: 600,
          width: "100%",
          background: "#121212",
          color: "#e0e0e0",
          borderRadius: 12,
          boxShadow: "0 0 20px rgba(0, 255, 255, 0.05)",
          minHeight: "50vh",
        }}
      >
        <h2
          style={{
            marginBottom: 20,
            color: "#38b2ac",
            fontSize: "1.5rem",
            borderBottom: "2px solid #38b2ac",
            paddingBottom: 8,
            textAlign: "center",
          }}
        >
          Smart Invoice Chatbot
        </h2>

        <div
          style={{
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <input
            type="file"
            accept=".pdf,image/*"
            onChange={handleFileChange}
            style={{
              background: "#1f1f1f",
              color: "#e0e0e0",
              border: "1px solid #38b2ac",
              padding: "6px 10px",
              borderRadius: 6,
              flex: 1,
            }}
          />
          <button
            onClick={sendFile}
            disabled={!file || loading}
            style={{
              backgroundColor: "#38b2ac",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: 6,
              cursor: file && !loading ? "pointer" : "not-allowed",
              opacity: file && !loading ? 1 : 0.5,
              transition: "all 0.3s ease",
            }}
          >
            {loading ? "Processing..." : "Upload"}
          </button>
        </div>

        <div
          style={{
            background: "#1e1e1e",
            borderRadius: 8,
            padding: 15,
            maxHeight: "60vh",
            overflowY: "auto",
            border: "1px solid #333",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                margin: "12px 0",
                padding: "10px 14px",
                borderRadius: 8,
                backgroundColor: msg.type === "user" ? "#2d2d2d" : "#212121",
                textAlign: msg.type === "user" ? "right" : "left",
                borderLeft: msg.type === "bot" ? "4px solid #38b2ac" : "none",
                boxShadow:
                  msg.type === "user"
                    ? "inset 0 0 0 1px #444"
                    : "inset 0 0 0 1px #2a9d8f",
              }}
              dangerouslySetInnerHTML={{ __html: msg.text }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
