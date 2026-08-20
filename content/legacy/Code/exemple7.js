const fs = require('fs').promises;

async function writeFile() {
    try {
      await fs.writeFile('examplePromise.txt', 'Hello, Node.js with Promises!');
      console.log('File written successfully!');
    } catch (err) {
      console.error('Error writing to file:', err);
    }
  }
  
writeFile();