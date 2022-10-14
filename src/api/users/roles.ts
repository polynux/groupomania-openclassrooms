import { Request, Response } from "express";
import { changeUserRoles, getUserById } from "@/controller/UserController";

export default async (req: Request, res: Response) => {
  try {
    const role = req.body.role;
    
    if (!role) {
      return res.status(400).json({ error: "Role is required" });
    }
    const user = await getUserById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    if (user.role !== 'ADMIN' && user.role !== 'CREATOR') {
      return res.status(403).json({ error: "You are not allowed to do this" });
    }
    
    const id = parseInt(req.params.id);
    const changedUser = await changeUserRoles(id, role);
    if (changedUser instanceof Error) {
      return res.status(403).send(changedUser.message);
    }
    return res.status(200).send({ message: "User role changed" });
  } catch (error) {
    return res.status(500).send(error);
  }
}