// server.js
const express = require('express');
const osutils = require('os-utils');
const path = require('path');

const app = express();
const PORT = 8000;

// Serve the static HTML file
app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'index.html'));

});

// Create an API endpoint that returns the stats
app.get('/api/stats', (req, res) => {

    // Get the static/sync data immediately
    const staticData = {

        platform: osutils.platform(),
        cpuCount: osutils.cpuCount(),
        totalMemory: osutils.totalmem() + "MB"

    };

    // Get the async CPU usage, then send the full response
    osutils.cpuUsage(function(v) {

        const dynamicData = {

            cpuUsage: v.toFixed(2) + "%",
            freeMemory: osutils.freememPercentage().toFixed(2) + "%",
            uptime: osutils.sysUptime() + "ms"

        };

        // Combine and send as JSON
        res.json({

            ...staticData,
            ...dynamicData

        });

    });

});

app.listen(PORT, () => {

    console.log(`Server running at http://localhost:${PORT}`);

});