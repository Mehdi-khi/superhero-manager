import { Request, Response } from "express";
import Hero from "../models/Hero";
import fs from "fs";
import path from "path";
import Log from "../models/Log";
import { AuthRequest } from "../middleware/authMiddleware";

export async function getHeroes(req: Request, res: Response) {
  try {
    const search = req.query.search as string;
    const publisher = req.query.publisher as string;

    const filter: any = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { "biography.aliases": { $regex: search, $options: "i" } },
      ];
    }

    if (publisher) {
      filter["biography.publisher"] = publisher;
    }

    const heroes = await Hero.find(filter).sort({ name: 1 });
    res.json(heroes);
  } catch {
    res.status(500).json({ message: "Erreur serveur" });
  }
}

export async function getHeroById(req: Request, res: Response) {
  try {
    const hero = await Hero.findById(req.params.id);

    if (!hero) {
      return res.status(404).json({ message: "Héros introuvable" });
    }

    res.json(hero);
  } catch {
    res.status(500).json({ message: "Erreur serveur" });
  }
}

export async function createHero(req: AuthRequest, res: Response) {
  try {
    const heroData = req.body;

    if (req.file) {
      heroData.image = `/uploads/${req.file.filename}`;
    }

    const hero = await Hero.create(heroData);
    await Log.create({
      action: "CREATE",
      heroName: hero.name,
      userRole: req.user?.role,
    });
    res.status(201).json(hero);
  } catch {
    res.status(500).json({ message: "Erreur lors de la création" });
  }
}

export async function updateHero(req: AuthRequest, res: Response) {
  try {
    const heroData = req.body;

    if (req.file) {
      heroData.image = `/uploads/${req.file.filename}`;
    }

    const hero = await Hero.findByIdAndUpdate(req.params.id, heroData, {
      new: true,
    });

    if (!hero) {
      return res.status(404).json({ message: "Héros introuvable" });
    }
    await Log.create({
      action: "UPDATE",
      heroName: hero.name,
      userRole: req.user?.role,
    });

    res.json(hero);
  } catch {
    res.status(500).json({ message: "Erreur lors de la modification" });
  }
}

export async function deleteHero(req: AuthRequest, res: Response) {
  try {
    const hero = await Hero.findById(req.params.id);

    if (!hero) {
      return res.status(404).json({ message: "Héros introuvable" });
    }

    if (hero.get("image")) {
      const imagePath = path.join(
  process.cwd(),
  "src",
  hero.get("image") || ""
);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Hero.findByIdAndDelete(req.params.id);
    await Log.create({
      action: "DELETE",
      heroName: hero.name,
      userRole: req.user?.role,
    });

    res.json({ message: "Héros supprimé" });
  } catch {
    res.status(500).json({ message: "Erreur lors de la suppression" });
  }
}