import { readFileSync } from 'fs';

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
    quotes!: string[];

    constructor(part: number) {
        this.part = part;
        this.readBookPart();
    }

    parseBookContent() {
        const parts = this.content
            .split('.')
            .filter((line) => line.trim() !== '')
            .map((part) => part.trim())
            .map((part) => part.replace('\n', ' '));
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
}
