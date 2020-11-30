const fs = require('fs');

module.exports.parent = JSON.parse(fs.readFileSync('./data/Parent.json'));
module.exports.child = JSON.parse(fs.readFileSync('./data/Child.json'));