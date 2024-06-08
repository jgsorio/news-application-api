import { Request, Response } from 'express';
import { z } from 'zod';
import UserService from '../services/UserService';
import bcrypt from 'bcrypt';

class UserController {

    async get(req: Request, res: Response) {
        const emailUser: any = req.headers['userEmail'];
        const { name, email } = await UserService.get(emailUser);
        return res.status(200).json({ name, email });
    }

    async getAll(req: Request, res: Response) {
        const emailUser: any = req.headers['userEmail'];
        const { name } = await UserService.get(emailUser);
        const users = await UserService.getAll(name);
        return res.status(200).json(users);
    }

    async create(req: Request, res: Response) {
        const bodySchema = z.object({
            name: z.string(),
            email: z.string(),
            password: z.string(),
            active: z.boolean().default(true)
        });
        const { name, email, password, active } = bodySchema.parse(req.body);
        const user = await UserService.create({ name, email, password: bcrypt.hashSync(password, 10), active });
        return res.status(201).json(user);
    }
}

export default new UserController();
