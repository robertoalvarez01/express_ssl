const mysql = require('mysql');

var db_config = {
  host: 'localhost',
  user: 'root',
  password: 'ZAQ12wsx',
  database: 'sbacco',
  multipleStatements: true
};

var mysqlConnection;

function handleDisconnect() {
  mysqlConnection = mysql.createConnection(db_config); 

  mysqlConnection.connect(function(err) {              
    if(err) {                                     
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); 
      return;
    }else {
      console.log('DB id connected');
    }                                     
  });                                     
  mysqlConnection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
      handleDisconnect();                         
    } else {                                      
      throw err;                                  
    }
  });
}

handleDisconnect();

module.exports = mysqlConnection;