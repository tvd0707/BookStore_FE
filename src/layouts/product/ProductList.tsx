import React, { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import BookProps from "./components/BookProps";
import { getAllBook, searchBook } from "../../api/BookApi";
import Pagination from "../../utils/Pagination";
interface ProductListProps {
    keyword: string;
    categoryId: number;
}

function ProductList({ keyword, categoryId }: ProductListProps) {

    const [bookList, setBookList] = useState<BookModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    useEffect(() => {
        if (keyword === '' && categoryId === 0) {
            getAllBook(currentPage - 1).then(
                data => {
                    setBookList(data.books);
                    setTotalPage(data.totalPage);
                    setLoading(false);
                }
            ).catch(
                error => {
                    setLoading(false);
                    setErr(error.message);
                }
            );
        } else {
            searchBook(keyword, categoryId).then(
                data => {
                    setBookList(data.books);
                    setTotalPage(data.totalPage);
                    setLoading(false);
                }
            ).catch(
                error => {
                    setLoading(false);
                    setErr(error.message);
                }
            );
        }
    }, [currentPage, keyword, categoryId])

    if (loading) {
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        );
    }

    if (err) {
        return (
            <div>
                <h1>Gặp lỗi: {err}</h1>
            </div>
        );
    };

    const pagination = (page: number) => {
        setCurrentPage(page);
    }

    if (bookList.length === 0) {
        return (
            <div className="card d-flex align-items-center justify-content-center" >
                <div className="card-body">
                    <h1>Không tìm thấy sách</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row mt-4 mb-4">
                {
                    bookList.map((book) => (
                        <BookProps key={book.bookId} book={book} />
                    ))}
            </div>
            <div className="d-flex justify-content-center">
                <Pagination totalPage={totalPage} currentPage={currentPage} pagination={pagination} />
            </div>

        </div>
    );
}

export default ProductList;