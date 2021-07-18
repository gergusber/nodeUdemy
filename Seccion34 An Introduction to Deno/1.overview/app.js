const text = "Thist should be stored in a file\n";
const fs = require("fs").promises;

fs.writeFile("node-message.txt", text).then(() => {
  console.log("wrote file");
});

// Run as $: node app.js
