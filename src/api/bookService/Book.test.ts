import { Book } from "./Book.ts";
import { BookService } from "./index.ts";

const book = new Book(1);

book.parseBookContent();
book.parseQuotesBuckets();

// book.getQuotes().forEach((quote) => {
//     console.log(quote.getContent().slice(0, 30) + '... Length: ', quote.getLength());
// })

// const bookService = new BookService();

// console.log(book.quotesBuckets)

console.log(book.getQuotesInRange(4800));
