const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'us-cdbr-iron-east-04.cleardb.net',
  user: 'bca85caf769d95',
  password: 'cc74bf51',
  database: 'heroku_498e6b6a2988f05',
  multipleStatements: true
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = mysqlConnection;
