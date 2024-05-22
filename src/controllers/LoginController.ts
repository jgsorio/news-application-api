import { Request, Response } from 'express';
import z from 'zod';
import LoginService from '../services/LoginService';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';
config();

class LoginController {
    async login(req: Request, res: Response) {
        const bodySchema = z.object({
            email: z.string().email(),
            password: z.string()
        });
        const { email, password } = bodySchema.parse(req.body);
        const user: any = await LoginService.login(email);

        if (!user) return res.status(404).json({ message: 'User or password are incorrect!' });

        if (!bcrypt.compareSync(password, user.password)) return res.status(404).json({ message: 'User or password are incorrect!' });

        const token = sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

        return res.json({ token });
    }
}

export default new LoginController();
