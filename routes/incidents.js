const express = require('express');
const Incident = require('../models/Incident');
const router = express.Router();

// Get all incidents
router.get('/', async (req, res) => {
    try {
        const incidents = await Incident.find();
        res.json(incidents);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new incident
router.post('/', async (req, res) => {
    const { title, description, severity } = req.body;
    if (!title || !description || !["Low", "Medium", "High"].includes(severity)) {
        return res.status(400).json({ error: "Invalid input data" });
    }

    try {
        const newIncident = new Incident({ title, description, severity });
        await newIncident.save();
        res.status(201).json(newIncident);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a specific incident by ID
router.get('/:id', async (req, res) => {
    try {
        const incident = await Incident.findById(req.params.id);
        if (!incident) return res.status(404).json({ error: "Incident not found" });
        res.json(incident);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an incident by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedIncident = await Incident.findByIdAndDelete(req.params.id);
        if (!deletedIncident) return res.status(404).json({ error: "Incident not found" });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
