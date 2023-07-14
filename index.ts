const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});

const books = [
  {
    title: "The end of Javascript",
    Author: "Md. Zillur Rahman",
    Genre: "Programming",
    PublicationDate: "29 Jan 2020",
  },
];

// zillurhero40
// H7mg8omIbjGi2mQM

const uri =
  "mongodb+srv://zillurhero40:H7mg8omIbjGi2mQM@cluster0.zzop6zb.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log("Database connected");
    const booksCollection = client.db("books").collection("books-data");

    app.get("/books", async (req: any, res: { send: (arg0: any) => void }) => {
      const query = {};
      const cursor = booksCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
