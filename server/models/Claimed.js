var db = require('./sequelize.js');

var Claimed = db.define('claimed', {});

module.exports = Claimed;
