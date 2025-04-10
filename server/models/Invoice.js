// // models/Invoice.js
// const mongoose = require("mongoose");

// const IGSTSchema = new mongoose.Schema(
//   {
//     rate_percent: Number,
//     amount: Number,
//   },
//   { _id: false }
// );

// const ItemSchema = new mongoose.Schema(
//   {
//     description: String,
//     hsn: String,
//     imei_or_serial: { type: String, default: null },
//     quantity: Number,
//     gross_amount: Number,
//     discount: Number,
//     taxable_value: Number,
//     igst: IGSTSchema,
//     total: Number,
//   },
//   { _id: false }
// );

// const SellerSchema = new mongoose.Schema(
//   {
//     name: String,
//     address: String,
//     gstin: String,
//     pan: String,
//     registered_address: String,
//   },
//   { _id: false }
// );

// const CustomerSchema = new mongoose.Schema(
//   {
//     name: String,
//     billing_address: String,
//     shipping_address: String,
//   },
//   { _id: false }
// );

// const SingleInvoiceSchema = new mongoose.Schema(
//   {
//     invoice_no: String,
//     invoice_date: Date,
//     seller: SellerSchema,
//     customer: CustomerSchema,
//     items: [ItemSchema],
//     shipping_charges: { type: Number, default: 0 },
//     total_quantity: Number,
//     total_price: Number,
//     currency: { type: String, default: "INR" },
//   },
//   { _id: false }
// );

// const InvoiceSchema = new mongoose.Schema(
//   {
//     order_id: String,
//     order_date: Date,
//     invoices: [SingleInvoiceSchema],
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Invoice", InvoiceSchema);

const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  line1: { type: String, default: "" },
  line2: { type: String, default: "" },
  city: { type: String, default: "" },
  state: { type: String, default: "" },
  country: { type: String, default: "India" },
});

const contactSchema = new mongoose.Schema({
  email: { type: String, default: "" },
  phone: { type: String, default: "" },
  mobile: { type: String, default: "" },
});

const taxInfoSchema = new mongoose.Schema({
  gstin: { type: String, default: "" },
  pan: { type: String, default: "" },
});

const partySchema = new mongoose.Schema({
  name: { type: String, required: true, default: "Unknown" },
  address: addressSchema,
  taxInfo: taxInfoSchema,
  contact: contactSchema,
});

const taxAmountSchema = new mongoose.Schema({
  cgst: { type: Number, default: 0 },
  sgst: { type: Number, default: 0 },
  igst: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
});

const itemSchema = new mongoose.Schema({
  srNo: { type: Number, default: 0 },
  description: { type: String, default: "" },
  hsnCode: { type: String, default: "" },
  quantity: { type: Number, default: 0 },
  rate: { type: Number, default: 0 },
  taxRate: { type: String, default: "" },
  amount: { type: Number, default: 0 },
});

const paymentSchema = new mongoose.Schema({
  terms: { type: String, default: "" },
  account: { type: String, default: "" },
  ifsc: { type: String, default: "" },
  mode: { type: String, default: "" },
});

const metadataSchema = new mongoose.Schema({
  number: { type: String, required: true, index: true },
  type: {
    type: String,
    enum: ["TAX_INVOICE", "PROFORMA", "RECEIPT"],
    default: "TAX_INVOICE",
  },
  date: { type: String, required: true },
  dueDate: { type: String, default: "" },
  reference: { type: String, default: "" },
  currency: { type: String, default: "INR" },
});

const systemSchema = new mongoose.Schema({
  source: { type: String, default: "email" },
  originalFilename: { type: String, default: "" },
  processedAt: { type: Date, default: Date.now },
});

const rawDataSchema = new mongoose.Schema({
  text: { type: String, default: "" },
  extractedData: { type: mongoose.Schema.Types.Mixed, default: {} },
});

const invoiceSchema = new mongoose.Schema(
  {
    metadata: metadataSchema,
    parties: {
      supplier: partySchema,
      customer: partySchema,
    },
    amounts: {
      subtotal: { type: Number, default: 0 },
      tax: taxAmountSchema,
      discount: { type: Number, default: 0 },
      shipping: { type: Number, default: 0 },
      total: { type: Number, required: true },
    },
    items: { type: [itemSchema], default: [] },
    payment: paymentSchema,
    system: systemSchema,
    raw: rawDataSchema,
  },
  { timestamps: true }
);

// Add index for better query performance
invoiceSchema.index({ "metadata.number": 1 });
invoiceSchema.index({ "metadata.date": 1 });
invoiceSchema.index({ "parties.supplier.name": 1 });
invoiceSchema.index({ "parties.customer.name": 1 });

module.exports = mongoose.model("Invoice", invoiceSchema);
