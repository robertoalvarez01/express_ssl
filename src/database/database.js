const mysql = require('mysql');

var db_config = {
  host: 'us-cdbr-iron-east-04.cleardb.net',
  user: 'bca85caf769d95',
  password: 'cc74bf51',
  database: 'heroku_498e6b6a2988f05',
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