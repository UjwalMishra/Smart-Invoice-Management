const mongoose = require('mongoose');

const IGSTSchema = new mongoose.Schema({
  rate_percent: Number,
  amount: Number
}, { _id: false });

const ItemSchema = new mongoose.Schema({
  description: String,
  hsn: String,
  imei_or_serial: { type: String, default: null },
  quantity: Number,
  gross_amount: Number,
  discount: Number,
  taxable_value: Number,
  igst: IGSTSchema,
  total: Number
}, { _id: false });

const SellerSchema = new mongoose.Schema({
  name: String,
  address: String,
  gstin: String,
  pan: String,
  registered_address: String
}, { _id: false });

const CustomerSchema = new mongoose.Schema({
  name: String,
  billing_address: String,
  shipping_address: String
}, { _id: false });

const SingleInvoiceSchema = new mongoose.Schema({
  invoice_no: String,
  invoice_date: Date,
  seller: SellerSchema,
  customer: CustomerSchema,
  items: [ItemSchema],
  shipping_charges: Number,
  total_quantity: Number,
  total_price: Number,
  currency: String
}, { _id: false });

const InvoiceSchema = new mongoose.Schema({
  order_id: String,
  order_date: Date,
  invoices: [SingleInvoiceSchema]
}, { timestamps: true });

module.exports = mongoose.model('Invoice', InvoiceSchema);
