const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, required: true },
  name: { type: String, required: true, trim: true },
  category: { type: String, enum: ['Academic', 'ID Proof', 'Certificates', 'Other'], required: true },
  notes: { type: String, default: '' },
  storagePath: { type: String, required: true },
  originalName: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
  expiryDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);


