class BookModel {
    bookId: number;
    bookName?: string;
    bookDesc?: string;
    author?: string;
    listPrice?: number;
    sellPrice?: number;
    quantity?: number;
    avgRating?: number;
    isbn?: string;

    constructor(
        bookId: number,
        bookName: string,
        bookDesc: string,
        author: string,
        listPrice: number,
        sellPrice: number,
        quantity: number,
        avgRating: number,
        isbn: string,
    ){
        this.bookId = bookId;
        this.bookName = bookName;
        this.bookDesc = bookDesc;
        this.author = author;
        this.listPrice = listPrice;
        this.sellPrice = sellPrice;
        this.quantity = quantity;
        this.avgRating = avgRating;
        this.isbn = isbn;
    }

}

export default BookModel;