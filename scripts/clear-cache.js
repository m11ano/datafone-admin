const fs = require('fs');
const path = require('path');

fs.rmdir(path.join(__dirname, '../node_modules/.cache'), { recursive: true }, (err) => {
    console.error(err);
});
