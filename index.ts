import { ObjectId } from "mongodb";

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

    app.get(
      "/books/:id",
      async (
        req: { params: { id: any } },
        res: { send: (arg0: any) => void }
      ) => {
        const id = req.params.id;
        console.log(id);
        const result = await booksCollection.findOne(new ObjectId(id));
        res.send(result);
      }
    );

    app.post("/books", async (req: { body: any }, res: any) => {
      console.log(req.body);
      const result = await booksCollection.insertOne(req.body);
      res.send(result);
    });

    app.post("/reviews/:id", async (req: any, res: any) => {
      const bookId = req.params.id;
      const reviews = req.body.comment;

      console.log(bookId);
      console.log(reviews);

      const result = await booksCollection.updateOne(
        { _id: new ObjectId(bookId) },
        { $push: { reviews: reviews } }
      );

      res.send(result);
    });

    app.get(
      "/reviews/:id",
      async (
        req: { params: { id: any } },
        res: { send: (arg0: any) => void }
      ) => {
        const bookId = req.params.id;

        const result = await booksCollection.findOne(
          { _id: new ObjectId(bookId) },
          { projection: { _id: 0, reviews: 1 } }
        );
        res.send(result);
      }
    );

    // app.delete("/books/:id", async (req: { params: { id: any } }, res: any) => {
    //   const id = req.params.id;
    //   const result = await booksCollection.deleteOne(new ObjectId(id));
    //   res.send(result);
    // });
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
