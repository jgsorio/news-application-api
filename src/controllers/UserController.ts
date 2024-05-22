import { Request, Response } from 'express';
import { z } from 'zod';
import UserService from '../services/UserService';
import bcrypt from 'bcrypt';

class UserController {
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
