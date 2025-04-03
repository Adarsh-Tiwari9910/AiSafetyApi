const mongoose = require('mongoose');

const IncidentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    severity: { type: String, enum: ["Low", "Medium", "High"], required: true },
    reported_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Incident', IncidentSchema);
