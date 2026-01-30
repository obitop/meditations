import { randomInt } from 'crypto';
import { readFileSync } from 'fs';
import { Quote } from './Quote.ts';

const BOOK_PATH = './resources';

function readBook(location: string) {
    console.log('Reading file: ', location);
    let file: string = '';

    file = readFileSync(location, 'utf-8');

    if (!file) {
        return '';
    }

    return file as string;
}

export class Book {
    part: number;
    content: string = '';
    quotes!: Quote[];
    quotesBuckets: Map<number, Quote[]> = new Map()
        .set(100, [])
        .set(200, [])
        .set(300, [])
        .set(400, [])
        .set(500, [])
        .set(600, [])
        .set(700, [])
        .set(800, [])
        .set(900, [])
        .set(1000, [])
        .set(1100, [])
        .set(1200, [])
        .set(1300, [])
        .set(1400, [])
        .set(1500, [])
        .set(1600, [])
        .set(1700, [])


    constructor(part: number) {
        this.part = part;
        this.readBookPart();
    }

    parseBookContent() {
        const parts = this.content
            .split('.')
            .filter((line) => line.trim() !== '')
            .map((part) => part.trim())
            .map((part) => part.replace('\n', ' '))
            .map((part) => new Quote(this.part, part, part.length));

        this.quotes = parts;

        return parts;
    }

    private readBookPart = async () => {
        try {
            this.content = readBook(
                `${BOOK_PATH}/Book${this.part}.txt`,
            ) as string;
        } catch (error) {
            console.error('Error in readBookPart:', error);
        }
    };

    public getContent() {
        return this.content;
    }

    public getQuotes() {
        return this.quotes;
    }

    public getRandomQuote() {
        const length = this.quotes.length;

        const quoteIndex = randomInt(length);

        const quote = this.quotes[quoteIndex];

        if (!quote) {
            throw new Error(`Quote with index ${quoteIndex} not found`);
        }

        return quote;
    }

    Bucket = {
        50: ['qutoe', 'quote where quote.length in range (50, 100)'],
        100: ['quote where quote.length in range (100,150)'],
    };

    parseQuotesBuckets() {
        for (let quote of this.quotes) {
            const length = quote.getLength();

            let correctBucketSize = this.quotesBuckets.keys().next().value!;

            bucketsLoop: for (let bucketSize of this.quotesBuckets.keys()) {
                console.log('checking bucket size: ', bucketSize, ' for quote length: ', length);
                if (length <= bucketSize) {
                    break bucketsLoop;
                }

                correctBucketSize = bucketSize;
            }
            this.quotesBuckets.get(correctBucketSize)!.push(quote);

            // console.log('Actual Length: ', length);
            // console.log('final correctBucketSize: ', correctBucketSize);
            // console.log('---\n');
        }
    }

    public getQuotesInRange(range: number) {
        console.log(this.quotesBuckets);
        return this.quotesBuckets.get(range);
    }
}
