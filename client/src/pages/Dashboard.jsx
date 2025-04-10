import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Custom Button component with dark theme styles
const Button = ({ children, onClick, variant }) => {
  const baseStyles =
    "px-4 py-2 rounded-xl font-medium transition duration-300";
  const variantStyles =
    variant === "default"
      ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-cyan-600 hover:to-teal-500 shadow-md"
      : "border border-gray-700 text-gray-300 hover:bg-gray-800";
  return (
    <button onClick={onClick} className={`${baseStyles} ${variantStyles}`}>
      {children}
    </button>
  );
};

// Custom Card component with dark theme styles
const Card = ({ children }) => (
  <div className="rounded-xl shadow-lg border border-gray-700 bg-gray-900 text-white transition duration-300 hover:shadow-xl hover:border-gray-600">
    {children}
  </div>
);

// Custom CardContent component with dark theme styles
const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const invoicesData = [
  { id: 1, status: "Pending", title: "Invoice #001", dueDate: "2025-04-15" },
  { id: 2, status: "Paid", title: "Invoice #002", dueDate: "2025-04-01" },
  { id: 3, status: "Pending", title: "Invoice #003", dueDate: "2025-04-12" },
  { id: 4, status: "Paid", title: "Invoice #004", dueDate: "2025-03-30" },
  { id: 5, status: "Pending", title: "Invoice #005", dueDate: "2025-04-11" },
  { id: 6, status: "Overdue", title: "Invoice #006", dueDate: "2025-03-25" },
];

const getFilteredInvoices = (filter) => {
  const today = new Date();

  switch (filter) {
    case "All":
      return invoicesData;
    case "Pending":
      return invoicesData.filter((invoice) => invoice.status === "Pending");
    case "Paid":
      return invoicesData.filter((invoice) => invoice.status === "Paid");
    case "Overdue":
      return invoicesData.filter((invoice) => invoice.status === "Overdue");
    case "Close Due Date":
      return invoicesData.filter((invoice) => {
        const dueDate = new Date(invoice.dueDate);
        const diff = (dueDate - today) / (1000 * 60 * 60 * 24);
        return diff >= 0 && diff <= 3;
      });
    default:
      return invoicesData;
  }
};

const getPieChartData = (data) => {
  const statusCounts = data.reduce(
    (acc, invoice) => {
      acc[invoice.status] = (acc[invoice.status] || 0) + 1;
      return acc;
    },
    { Pending: 0, Paid: 0, Overdue: 0 }
  );

  return Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value,
  }));
};

const COLORS = ["#FFBB28", "#10B981", "#EF4444"]; // Yellow, Green, Red

export default function Dashboard() {
  const [filter, setFilter] = useState("All");
  const filteredInvoices = getFilteredInvoices(filter);
  const pieChartData = getPieChartData(filteredInvoices);

  return (
    <div className="p-8 space-y-8 min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
        Invoice Dashboard
      </h1>

      <div className="flex flex-wrap justify-center gap-4">
        {["All", "Pending", "Paid", "Overdue", "Close Due Date"].map((type) => (
          <Button
            key={type}
            variant={filter === type ? "default" : "outline"}
            onClick={() => setFilter(type)}
          >
            {type}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Invoice Status</h2>
          <ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <defs>
      <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#000" floodOpacity="0.5" />
      </filter>
    </defs>
    <Pie
      data={pieChartData}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      innerRadius={60}
      outerRadius={100}
      startAngle={320}
      endAngle={-40}
      fill="#8884d8"
      label
      stroke="#1F2937"
      strokeWidth={2}
    >
      {pieChartData.map((entry, index) => (
        <Cell
          key={`cell-${index}`}
          fill={COLORS[index % COLORS.length]}
          style={{ filter: "url(#shadow)" }}
        />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>
</ResponsiveContainer>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredInvoices.length > 0 ? (
            filteredInvoices.map((invoice) => (
              <Card key={invoice.id}>
                <CardContent className="space-y-3">
                  <h2 className="text-2xl font-semibold text-teal-300">
                    {invoice.title}
                  </h2>
                  <p>
                    <span className="font-medium text-gray-400">Status:</span>{" "}
                    <span
                      className={`font-semibold ${
                        invoice.status === "Pending"
                          ? "text-yellow-400"
                          : invoice.status === "Paid"
                          ? "text-green-400"
                          : invoice.status === "Overdue"
                          ? "text-red-400"
                          : "text-white"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium text-gray-400">Due Date:</span>{" "}
                    {invoice.dueDate}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No invoices found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}