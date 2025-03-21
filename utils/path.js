const path = require("path");

// process.mainModule.filename
module.exports = path.dirname(require.main.filename);
