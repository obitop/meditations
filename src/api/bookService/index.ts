import { randomInt } from 'node:crypto';
import { Book } from './Book';

export class BookService {
	private books = new Map<number, Book>();

	constructor() {
		for (let i = 1; i < 13; i++) {
			const book = new Book(i);

			book.parseBookContent();

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

		const quotes = book.getQuotes();

		const length = quotes.length;

		const quoteIndex = randomInt(length);

		const quote = quotes[quoteIndex];

		if (!quote) {
			throw new Error(`Quote with index ${quoteIndex} not found`);
		}

		return { part: bookPart, quote };
	}

	public getRandomQuoteFromPart(part: number) {
		const book = this.books.get(part);

		if (!book) {
			throw new Error(`Book ${part} not found`);
		}

		const quotes = book.getQuotes();

		const quoteIndex = randomInt(quotes.length);

		const quote = quotes[quoteIndex];

		if (!quote) {
			throw new Error(`Quote with index ${quoteIndex} not found`);
		}

		return { part, quote };
	}
}
