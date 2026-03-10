// Load the os utils npm package
const osutils = require("os-utils");

console.log("Platform: " + osutils.platform());
console.log("Number of CPUs: " + osutils.cpuCount());
console.log("Total Memory: " + osutils.totalmem() + "MB");

// Monitor the cpu usage ever second
setInterval(function() {

    osutils.cpuUsage(function(v) {

        console.log("CPU Usage (%): " + v.toFixed(2))

    });

    console.log("Free Memory (%): " + osutils.freememPercentage().toFixed(2));
    console.log("System Uptime: " + osutils.sysUptime() + "ms");
    console.log("---------------------------------");

}, 3000);