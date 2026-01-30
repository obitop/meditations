import { randomInt } from 'crypto';
import { readFileSync } from 'fs';
import { Quote } from './Quote.ts';
import { argv0 } from 'process';

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
            .split('\n\n')
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

    parseQuotesBuckets() {
        for (let quote of this.quotes) {
            const length = quote.getLength();

            let correctBucketSize = this.quotesBuckets.keys().next().value!;

            // Distribute each quote to its approporiate bucket
            bucketsLoop: for (let bucketSize of this.quotesBuckets.keys()) {
                if (length <= bucketSize) {
                    break bucketsLoop;
                }

                correctBucketSize = bucketSize;
            }

            // console.log('Corrent Bucket Size for ', length, ' is ', correctBucketSize);
            this.quotesBuckets.get(correctBucketSize)!.push(quote);

            // console.log('Actual Length: ', length);
            // console.log('final correctBucketSize: ', correctBucketSize);
            // console.log('---\n');
        }
    }

    public getQuotesInRange(range: number) {


        const bucketSize = this.findCorrectBucketSize(range);

        console.log(`Got Correct Bucket ${bucketSize} for range ${range}`)


        return this.quotesBuckets.get(bucketSize);
    }

    private findCorrectBucketSize(range: number) {
        // Binary Search ? Am I Dreaming !! 
        const bucketSizes = this.quotesBuckets.keys().toArray();
        // [100 , 200 , 300 , 400, 500 , 600 , 700]

        let l = 0;
        let r = bucketSizes.length;

        while (l < r) {
            let mid = Math.floor((l + r) / 2)

            let value = bucketSizes[mid]!

            if (value! < range) {
                l = mid + 1;
            } else if (value! > range) {
                r = mid - 1;
            } else {
                return value;
            }
        }

        return bucketSizes[r - 1]!;
    }
}


