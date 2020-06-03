const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const Configuration = require('./config');


const app = express();
app.use(cors());
app.use(bodyParser.json());

let applicationPort = process.env.API_INTERNAL_PORT ? process.env.API_INTERNAL_PORT : 3005;
console.log(applicationPort);

const pgClient = new Pool({
  user: Configuration.PG_USER,
  host: Configuration.PG_HOST,
  database: Configuration.PG_DATABASE,
  password: Configuration.PG_PASSWORD,
  port: Configuration.PG_PORT
});

pgClient.on('error', () => console.log('Lost PG connection'));
pgClient.query('CREATE TABLE IF NOT EXISTS values (firstValue INT, secondValue INT, result INT)')
  .then(data => Console.log("Connection successful"))
  .catch(error => console.log(error));

function convertCalculations(calculation) {
  return {firstValue: calculation.firstvalue, secondValue: calculation.secondvalue, result: calculation.result}
}

app.get("/Calculations", async (req, res) => {
  console.log("Calculations GET");
  const calculationData = await pgClient.query('SELECT * FROM values');
  const calculations = calculationData.rows.map(convertCalculations);

  console.log(calculations);
  res.status(200).json(calculations);
});

app.post("/Calculations", async (req, res) => {
  console.log("Calculations POST");
  const firstValue = req.body.firstValue;
  const secondValue = req.body.secondValue;

  const result = {
    firstValue: firstValue,
    secondValue: secondValue,
    result: firstValue * secondValue,
  };
  await pgClient.query('INSERT INTO values(firstValue, secondValue, result) VALUES ($1, $2, $3)', [result.firstValue, result.secondValue, result.result]);

  res.status(200).json(result);
});

app.listen(applicationPort);
