import { randomInt } from 'node:crypto';
import { Book } from './Book.ts';

export class BookService {
    private books = new Map<number, Book>();

    private shortBuckets = new Map<number, Array<{ part: number; quote: string }>>();

    constructor() {
        for (let i = 1; i < 13; i++) {
            const book = new Book(i);

            book.parseBookContent();
            book.parseQuotesBuckets();

            this.books.set(i, book);
        }
    }

    public getBooks() {
        return this.books;
    }

    public getRandomQuote() {
        const bookPart = randomInt(1, 13);

        const book = this.books.get(bookPart);
        if (!book) {
            throw new Error(`Book ${bookPart} not found`);
        }

        const quote = book.getRandomQuote();

        return quote
    }

    public getRandomQuoteFromPart(part: number) {
        const book = this.books.get(part);

        if (!book) {
            throw new Error(`Book ${part} not found`);
        }

        const quote = book.getRandomQuote();

        return quote;

    }

    public getRandomQuoteInRange(length: number) {
        const bookPart = randomInt(1, 13);

        const book = this.books.get(bookPart);

        if (!book) {
            throw new Error(`Book ${bookPart} not found`);
        }

        const quotesInRange = book.getQuotesInRange(length);

        if (!quotesInRange || quotesInRange.length === 0) {
            throw new Error(`No quotes found in Range ${length} in Book ${bookPart}`);
        }

        const quoteIndex = randomInt(quotesInRange?.length || 0);

        const quote = quotesInRange[quoteIndex];

        if (!quote) {
            throw new Error(`Quote with index ${quoteIndex} not found in Range ${length} in Book ${bookPart}`);
        }

        return quote;
    }

}

