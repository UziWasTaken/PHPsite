const { spawn } = require('child_process');
const path = require('path');

module.exports = (req, res) => {
  res.json({
    message: "Node.js endpoint working",
    timestamp: Date.now()
  });
}; 