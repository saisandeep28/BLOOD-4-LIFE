const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\LOHIT\\.gemini\\antigravity\\brain\\08440ab3-00eb-4a12-89a6-d913b68c1912\\media__1784886975174.png';
const dest = path.join(__dirname, 'public', 'blood4life-logo.png');

fs.copyFileSync(src, dest);
console.log('Successfully copied logo to:', dest);
