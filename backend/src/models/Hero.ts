import mongoose from "mongoose";

const heroSchema = new mongoose.Schema(
  {
    id: Number,
    name: { type: String, required: true },
    slug: String,

    powerstats: {
      intelligence: Number,
      strength: Number,
      speed: Number,
      durability: Number,
      power: Number,
      combat: Number,
    },

    appearance: {
      gender: String,
      race: String,
      height: [String],
      weight: [String],
      eyeColor: String,
      hairColor: String,
    },

    biography: {
      fullName: String,
      alterEgos: String,
      aliases: [String],
      placeOfBirth: String,
      firstAppearance: String,
      publisher: String,
      alignment: String,
    },

    work: {
      occupation: String,
      base: String,
    },

    connections: {
      groupAffiliation: String,
      relatives: String,
    },

    images: {
      xs: String,
      sm: String,
      md: String,
      lg: String,
    },

    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("Hero", heroSchema);