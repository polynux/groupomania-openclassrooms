import { Request, Response } from "express";
import { changeUserRoles, getUserById } from "@/controller/UserController";

export default async (req: Request, res: Response) => {
  try {
    const user = await getUserById(req.userId);
    if (user?.role !== "ADMIN") {
      return res.status(403).send({ error: "Forbidden" });
    }
    const id = parseInt(req.params.id);
    const role = req.body.role;
    const changedUser = await changeUserRoles(id, role);
    if (changedUser instanceof Error) {
      return res.status(403).send(changedUser.message);
    }
    return res.status(200).send({ message: "User role changed" });
  } catch (error) {
    return res.status(500).send(error);
  }
}