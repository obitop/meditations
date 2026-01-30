export class Quote {
    constructor(private part: number, private content: string, private length: number) { }


    public getContent() {
        return this.content;
    }

    public getPart() {
        return this.part;
    }

    public getLength() {
        return this.length;
    }
}
