// mysqlConnection.js
import mysql from "mysql2";

const mysqlConnection = () => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "adhurimbe12",
    database: "signup"
  });

  connection.connect((err) => {
    if (err) {
      console.error("MySQL Connection Error:", err);
    } else {
      console.log("MySQL Connected Successfully");
    }
  });

  return connection;
};

export default mysqlConnection;

