class BookModel {
    bookId: number;
    bookName?: string;
    bookDesc?: string;
    listPrice?: number;
    sellPrice?: number;
    quantity?: number;
    avgRating?: number;

    constructor(
        bookId: number,
        bookName: string,
        bookDesc: string,
        listPrice: number,
        sellPrice: number,
        quantity: number,
        avgRating: number,
    ){
        this.bookId = bookId;
        this.bookName = bookName;
        this.bookDesc = bookDesc;
        this.listPrice = listPrice;
        this.sellPrice = sellPrice;
        this.quantity = quantity;
        this.avgRating = avgRating;
    }

}

export default BookModel;