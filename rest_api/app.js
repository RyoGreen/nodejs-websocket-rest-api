const express = require("express");
const app = express();
const port = 3000;

// Data management class
class Data {
  constructor(id, content) {
    this.id = id;
    this.content = content;
  }

  static findById(id) {
    return datas.find((i) => i.id === id);
  }

  static findIndexById(id) {
    return datas.findIndex((i) => i.id === id);
  }

  static deleteById(id) {
    const index = this.findIndexById(id);
    if (index !== -1) {
      datas.splice(index, 1);
      return true;
    }
    return false;
  }

  static updateById(id, content) {
    const data = this.findById(id);
    if (data) {
      data.content = content;
      return data;
    }
    console.error(`Data with ID ${id} not found for update.`);
    return null;
  }
}

let datas = [];
app.use(express.json());

// Summary: Get all data
// Method: GET
// Response: Array of data objects
// Response Codes: 200, 204, 500
app.get("/", (req, res) => {
  try {
    if (datas.length === 0) {
      return res.status(204).send();
    }
    res.json(datas);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Summary: Create a new data entry
// Method: POST
// Request Body: JSON object ("id", "content") [Require]
// Response: Created data object
// Response Codes: 201, 400, 500
app.post("/", (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).send("Content is required");
    }

    const newItem = new Data(datas.length + 1, content);
    datas.push(newItem);
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error creating data:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Summary: Delete a data entry by its ID
// Method: DELETE
// Request Param: "id" integer [Require]
// Response Codes: 204, 400, 404, 500
app.delete("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).send("Invalid ID");
    }

    const success = Data.deleteById(id);
    if (!success) {
      return res.status(404).send("Data not found");
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting data:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Summary: Update a data entry by its ID
// Method: PUT
// Request Body: JSON object ("id", "content") [Require]
// Response: Updated data object
// Response Codes: 200, 400, 404, 500
app.put("/", (req, res) => {
  try {
    const id = parseInt(req.body.id, 10);
    const { content } = req.body;

    if (isNaN(id)) {
      return res.status(400).send("Invalid ID");
    }

    if (!content) {
      return res.status(400).send("Content is required");
    }

    const updatedData = Data.updateById(id, content);
    if (!updatedData) {
      return res.status(404).send("Data not found");
    }

    res.json(updatedData);
  } catch (error) {
    console.error("Error updating data:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// 404 Error handler for undefined routes
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.listen(port, () => {
  console.log(`HTTP Server started on port ${port}`);
});
