const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'us-cdbr-iron-east-04.cleardb.net',
  user: 'bca85caf769d95',
  password: 'cc74bf51',
  database: 'heroku_498e6b6a2988f05',
  multipleStatements: true
});

var db_config = {
  host: 'us-cdbr-iron-east-04.cleardb.net',
  user: 'bca85caf769d95',
  password: 'cc74bf51',
  database: 'heroku_498e6b6a2988f05'
};

var mysqlConnection;

function handleDisconnect() {
  mysqlConnection = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  mysqlConnection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  mysqlConnection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();