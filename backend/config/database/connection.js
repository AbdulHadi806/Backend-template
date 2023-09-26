import { connect } from "mongoose";

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

let connectionAttempts = 0;
const maxConnectionAttempts = 5; // Maximum number of connection attempts
const retryInterval = 5000; // Retry interval in milliseconds (5 seconds in this example)

const connection = () => {
  if (connectionAttempts < maxConnectionAttempts) {
    connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, {})
      .then(() => {
        console.log("Connection successful with MongoDB");
      })
      .catch((err) => {
        console.log(
          `Connection attempt ${connectionAttempts + 1} failed with MongoDB`
        );
        console.error(err);
        // Increment the connection attempts counter
        connectionAttempts++;
        // Retry the connection after the specified interval
        setTimeout(connection, retryInterval);
      });
  } else {
    console.log(
      `Maximum connection attempts (${maxConnectionAttempts}) reached. Exiting...`
    );
    process.exit(1); // Exit the application if maximum connection attempts are reached
  }
};

export default connection;
