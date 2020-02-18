const mysql = require('mysql');


var db_config = {
  host: 'localhost',
  user: 'root',
  password: 'ZAQ12wsx',
  database: 'sbacco',
  multipleStatements: true
};

const mysqlConnection = mysql.createConnection(db_config);


mysqlConnection.connect(function(err) {              
  if(err) {                                     
    console.log('error when connecting to db:', err); 
    return;
  }else {
    console.log('DB id connected');
  }                                     
});                                     

module.exports = mysqlConnection;