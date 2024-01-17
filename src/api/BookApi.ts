import BookModel from "../models/BookModel";
import { my_request } from "./../api/Request";

interface ResultInterface {
    books: BookModel[];
    totalPage: number;
    totalBook: number;
}

export async function getBook(path: string): Promise<ResultInterface> {
    const books: BookModel[] = [];

    // Gọi phương thức request
    const response = await my_request(path);

    // Lấy ra json book
    const responseData = response._embedded.books;

    // lấy thông tin trang
    const totalPage: number = response.page.totalPages;
    const totalBook: number = response.page.totalElements;

    for (const key in responseData) {
        books.push({
            bookId: responseData[key].bookId,
            bookName: responseData[key].bookName,
            bookDesc: responseData[key].bookDesc,
            listPrice: responseData[key].listPrice,
            sellPrice: responseData[key].sellPrice,
            quantity: responseData[key].quantity,
            avgRating: responseData[key].avgRating,
        });
    }

    return { books: books, totalPage: totalPage, totalBook: totalBook };
}

export async function getAllBook(currentPage: number): Promise<ResultInterface> {
    // Xác định endpoint
    const domain = `http://localhost:8080/books?sort=bookId,desc&size=8&page=${currentPage}`;

    return getBook(domain);
}

export async function getTheThreeNewestBook(): Promise<ResultInterface> {
    // Xác định endpoint
    const domain = 'http://localhost:8080/books?sort=bookId,desc&page=0&size=3';

    return getBook(domain);
}

export async function searchBook(keyword: string, categoryId: number): Promise<ResultInterface> {
    // Xác định endpoint
    let domain: string = `http://localhost:8080/sach?sort=maSach,desc&size=8&page=0`;

    if(keyword !== '' && categoryId === 0) {
        domain = `http://localhost:8080/books/search/findByBookNameContaining?sort=bookId,desc&page=0&size=8&bookName=${keyword}`;
    }
    else if(keyword === '' && categoryId !== 0) {
        domain = `http://localhost:8080/books/search/findByCategoryList_categoryId?sort=bookId,desc&page=0&size=8&categoryId=${categoryId}`;
    }
    else if(keyword !== '' && categoryId !== 0) {
        domain = `http://localhost:8080/books/search/findByBookNameContainingAndCategoryList_categoryId?sort=bookId,desc&page=0&size=8&bookName=${keyword}&categoryId=${categoryId}`;
    }
    return getBook(domain);
}

export async function getBookById(bookId: number): Promise<BookModel|null> {
    // Xác định endpoint
    const domain = `http://localhost:8080/books/${bookId}`;

    try {   
        const responseData = await my_request(domain);

        if(responseData) {
            return {
                bookId: responseData.bookId,
                bookName: responseData.bookName,
                bookDesc: responseData.bookDesc,
                listPrice: responseData.listPrice,
                sellPrice: responseData.sellPrice,
                quantity: responseData.quantity,
                avgRating: responseData.avgRating,
            };
        }
        else{
            throw new Error('Book does not exist');
        }
    }catch (error) {
        console.log(error);
        return null;
    }

}