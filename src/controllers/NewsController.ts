import { Request, Response } from 'express';
import NewsService from '../services/NewsService';
import z from 'zod';
import { unlink } from 'fs';
import path from 'path';
import { connection } from '../helpers/redis';

class NewsController {
    async getAll(req: Request, res: Response) {
        const client = connection();
        client.connect();
        const cachedNews = await client.get('news');
        if (cachedNews) return res.json(JSON.parse(cachedNews));

        const news = await NewsService.getAll();
        client.set('news', JSON.stringify(news));
        return res.json(news);
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;
        const news = await NewsService.getById(id);
        if (!news) return res.status(404).json({ message: 'News not found!' });
        return res.json(news);
    }

    async create(req: Request, res: Response) {
        try {
            const bodySchema = z.object({
                hat: z.string(),
                title: z.string(),
                content: z.string(),
                author: z.string(),
                published: z.date().default(new Date()),
                active: z.boolean().default(true),
                link: z.string().optional()
            });
            
            const { hat, title, content, author, published, link, active } = bodySchema.parse(req.body);
            const image: string = req.file?.filename;
            const news = await NewsService.create({ hat, title, content, author, image, published, link, active });
            const client = connection();
            client.connect();
            const cachedNews = await client.get('news');
            client.set('news', JSON.stringify([news, ...JSON.parse(cachedNews)]));
            return res.status(201).json(news);
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const bodySchema = z.object({
                hat: z.string(),
                title: z.string(),
                content: z.string(),
                author: z.string(),
                published: z.date().default(new Date()),
                link: z.string().optional(),
                active: z.boolean().default(true)
            });
            const findNews = await NewsService.getById(id);
            unlink(`${path.resolve(__dirname, '..', '..', 'uploads', `${findNews.image}`)}`, () => {});
            const image: string = req.file?.filename;
            const { hat, title, content, author, published, link, active } = bodySchema.parse(req.body);
            const news = await NewsService.update(id, { hat, title, content, author, image, published, link, active });
            const client = connection();
            client.connect();
            const cachedNews = await client.get('news');
            client.set('news', JSON.stringify([news, ...JSON.parse(cachedNews)]));
            return res.json(news);
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await NewsService.delete(id);
            return res.json({ message: 'News deleted!' });
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    }

}

export default new NewsController();
