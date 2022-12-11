const {client} = require('pg');

const client = new Client({
    user: "postgres",
    password: "JamesD77",
    host: "localhost",
    port: 5432,
    database: "secproject"
});

//fucntion that inserts into the first data base the initial data and links to the xml files
async function initEntry(id, first_name, last_name, date, link) {
  
    client.connect()
    .then(console.log("Connected successfully"))
    // id first_name last_name date 
    .then(() => client.query("insert into initdata values ($1, $2, $3, $4, $5)", [id,first_name,last_name,date,link]))
    .catch(err => console.error("Connection error", err.stack))
    .finally(() => client.end());
}