import { randomInt } from 'node:crypto';
import { Book } from './Book.ts';
import { Quote } from './Quote.ts';

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

        let finalQuote: Quote | undefined = undefined;

        let booksToSearchIn = structuredClone(this.books.keys().toArray());

        console.log('Searching for quote in range ', length);

        let attempts = 0;

        while (!finalQuote && attempts < 12) {

            const keys = booksToSearchIn;
            // console.log('Keys of bookToSearchIn: ', keys);

            const bookPart = keys[Math.floor(Math.random() * keys.length)]!;

            // console.log('Random Book Part Selected: ', bookPart);

            const book = this.books.get(bookPart);

            if (!book) {
                // throw new Error(`Book ${bookPart} not found`);
                console.log('Book ', bookPart, ' not found, removing from search');
                booksToSearchIn = booksToSearchIn.filter((part) => part !== bookPart);
                attempts++;
                continue;
            }

            const quotesInRange = book.getQuotesInRange(length);

            if (!quotesInRange || quotesInRange.length === 0) {
                // throw new Error(`No quotes found in Range ${length} in Book ${bookPart}`);
                // console.log('no quotes found in Range ', length, ' in Book ', bookPart);
                // console.log('removing book ', bookPart, ' from search');
                booksToSearchIn = booksToSearchIn.filter((part) => part !== bookPart);
                attempts++;
                continue;
            }

            const quoteIndex = randomInt(quotesInRange?.length || 0);


            // console.log('At Attemtpt: ', attempts);
            finalQuote = quotesInRange[quoteIndex];

            // if (!finalQuote) {
            //     throw new Error(`Quote with index ${quoteIndex} not found in Range ${length} in Book ${bookPart}`);
            // }
        }
        return finalQuote;
    }

}

