import { useEffect } from "react";
import { useParams } from "react-router-dom";
import BookModel from "../../models/BookModel";
import { useState } from "react";
import { getBookById } from "../../api/BookApi";
import ProductImage from "./components/ProductImage";
import ReviewBook from "./components/ReviewBook";
import renderRating from "../../utils/StarReating";
import formatNumber from "../../utils/FormatNumber";

const BookDetail: React.FC = () => {
    const { bookId } = useParams();
    let id = 0;;
    try {
        id = parseInt(bookId + "");
        if (isNaN(id)) {
            id = 0;
        }
    } catch (error) {
        id = 0;
    }

    const [book, setBook] = useState<BookModel | null>(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const stockQuantity = (book && book.quantity ? book.quantity : 0);

    const handleUp = () => {
        if (quantity < stockQuantity) {
            setQuantity(quantity + 1);
        }
    }

    const handleDown = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value: number = parseInt(event.target.value);
        if (!isNaN(value) && value < stockQuantity && value > 0) {
            setQuantity(value);
        }
    }

    const handleBuy = () => {
        alert("Mua ngay");
    }

    const handleAddToCart = () => {
        alert("Thêm vào giỏ hàng");
    }

    useEffect(() => {
        getBookById(id).then(
            data => {
                setBook(data);
                setLoading(false);
            }
        ).catch(
            error => {
                setLoading(false);
                setErr(error.message);
            }
        )
    }, [id]);


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
    }

    if (!book) {
        return (
            <div>
                <h1>Sách không tồn tại</h1>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row mt-4 mb-4">
                <div className="col-4">
                    <ProductImage bookId={id} />
                </div>
                <div className="col-8">
                    <div className="row">
                        <div className="col-8">
                            <h1>{book.bookName}</h1>
                            <h4>{renderRating(book.avgRating ? book.avgRating : 0)}</h4>
                            <h4>{formatNumber(book.sellPrice)} đ</h4>
                            <hr />
                            {book.bookDesc}
                            <hr />
                        </div>
                        <div className="col-4">
                            <div className="mb-2">
                                <div className="d-flex align-items-center">
                                    <button className={"btn btn-outline-secondary me-2 "} onClick={handleDown}>-</button>
                                    <input className="form-control text-center" type="text" value={quantity} min={1} onChange={handleQuantityChange} />
                                    <button className={"btn btn-outline-secondary ms-2"} onClick={handleUp}>+</button>
                                </div>
                                {
                                    book.sellPrice && (
                                        <div className="mt-2 text-center">
                                            Số tiền tạm tính <br />
                                            <h4>{formatNumber(quantity * book.sellPrice)} đ</h4>
                                        </div>
                                    )
                                }
                                <div className="d-grid gap-2">
                                    <button type="button" className="btn btn-danger mt-3" onClick={handleBuy}>Mua ngay</button>
                                    <button type="button" className="btn btn-outline-secondary mt-2" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4 mb-4">
                <ReviewBook bookId={id} />
            </div>
        </div>
    )
}

export default BookDetail;