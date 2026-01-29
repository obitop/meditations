import { createWriteStream, readFileSync } from 'node:fs';

const fileContent = readFileSync('./resources/meditations.mb.txt', 'utf-8');

const books = fileContent.split(
	'----------------------------------------------------------------------',
);

books.forEach((bookContent, index) => {
	console.log(
		`#${index} `,
		bookContent.trim().slice(0, bookContent.indexOf('\n', 2)).trim(),
	);
});

for (let i = 1; i < books.length - 1; i++) {
	const firstNewLineIndex = books[i].indexOf('\n', 2);
	const book = books[i].trim().slice(firstNewLineIndex).trim();

	const readStream = createWriteStream(`./resources/Book${i}.txt`);

	readStream.write(book);
}
