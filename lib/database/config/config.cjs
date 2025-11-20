// Load dotenv
require('dotenv').config();

// Import your ES module config
const esmConfig = require('./config.mjs').default;

module.exports = esmConfig;