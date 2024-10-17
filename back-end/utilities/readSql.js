const fs = require('fs');
const path = require('path');

const readSqlFile = (filename) => {
    const filePath = path.join(__dirname, '..', 'sql', filename);
    return fs.readFileSync(filePath, 'utf-8');
  };

module.exports = { readSqlFile };