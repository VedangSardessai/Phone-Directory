const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const pool = require("./db/db");
//middleware
app.use(cors());
app.use(express.json());

//ROUTES

//Create
app.post("/add_contact", async (req, res) => {
  try {
    console.log(req.body);
    const contactId = req.body.id;
    const conntactName = req.body.name;
    const contactPhone = req.body.number;
    const newContact = await pool.query(
      "INSERT INTO contact_info VALUES ($1,$2,$3)",
      [contactId, conntactName, contactPhone],
      (err, resp) => {
        console.log(err ? err.stack : "Row inserted successfully");
      }
    );

    res.json(newContact);
  } catch (error) {
    console.log(error.message);
  }
});

//Delete
app.delete("/delete_contact", async (req, res) => {
  try {
    const id = req.body.id;
    const deleteContact = await pool.query(
      `DELETE FROM contact_info WHERE id = '${id}' `
    );
    res.json("Deleted Successfully");
    console.log(id);
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//GET
app.get("/get_table", async (req, res) => {
  try {
    const getData = await pool.query("SELECT * FROM contact_info");
    res.json(getData.rows);
  } catch (error) {
    console.log(error.message);
  }
});
