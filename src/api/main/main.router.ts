import { Request, Response } from 'express';
import { BookService } from '../bookService/index.ts';
import { Router } from 'express';

export const mainRouter = Router();

const bookService = new BookService();

mainRouter.get('/random', (_req: Request, res: Response) => {
    const quote = bookService.getRandomQuote();

    return res.status(200).json({ ...quote });
});

mainRouter.get('/random/:part', (req: Request, res: Response) => {
    const part = Number(req.params.part);
    const quote = bookService.getRandomQuoteFromPart(part);

    return res.status(200).json({ ...quote });
});

mainRouter.get('/short/:length', async (req: Request, res: Response) => {
    const length = Number(req.params.length);

    const quote = bookService.getRandomQuoteInRange(length);

    return res.status(200).json({ ...quote });
})
