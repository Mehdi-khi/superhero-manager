import mongoose from "mongoose";
import fs from "fs";
import dotenv from "dotenv";
import Hero from "./models/Hero";

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);

    const data = JSON.parse(
      fs.readFileSync("./src/SuperHeros.json", "utf-8")
    );

    await Hero.deleteMany();
    await Hero.insertMany(data);

    console.log("Données importées !");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();