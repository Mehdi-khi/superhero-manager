import { Request, Response } from "express";
import User from "../models/User";
import Log from "../models/Log";

export async function getUsers(req: Request, res: Response) {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(users);
}

export async function getLogs(req: Request, res: Response) {
  const logs = await Log.find().sort({ createdAt: -1 }).limit(50);
  res.json(logs);
}