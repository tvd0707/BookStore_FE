import React, { useState, useEffect } from "react";
import BookModel from "../../../models/BookModel";
import ImageModel from "../../../models/ImageModel";
import { getAllImageByBook } from "../../../api/ImageApi";
import { Link } from "react-router-dom";
import renderRating from "../../../utils/StarReating";
import formatNumber from "../../../utils/FormatNumber";

interface BookPropsInterface {
    book: BookModel;
}

const BookProps: React.FC<BookPropsInterface> = (props) => {
    const { book } = props;
    const [imageList, setImageList] = useState<ImageModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        getAllImageByBook(book.bookId).then(
            data => {
                setImageList(data);
                setLoading(false);
            }
        ).catch(
            error => {
                setLoading(false);
                setErr(error.message);
            }
        )
    }, [book.bookId]);

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

    let dataImage: string = "";
    if (imageList[0] && imageList[0].dataImage) {
        dataImage = imageList[0].dataImage;
    }

    return (
        <div className="col-md-3 mt-2">
            <div className="card">
                <Link to={`/book/${book.bookId}`}>
                    <img
                        src={dataImage}
                        className="card-img-top"
                        alt={book.bookDesc}
                        style={{ height: '200px' }}
                    />
                </Link>
                <div className="card-body">
                    <Link to={`/book/${book.bookId}`} style={{ textDecoration: "none" }}>
                        <h5 className="card-title">{book.bookName}</h5>
                    </Link>
                    <div className="price">
                        <span className="original-price">
                            <del>{formatNumber(book.listPrice)}</del>
                        </span>
                        <span className="discounted-price float-end">
                            <strong>{formatNumber(book.sellPrice)}</strong>
                        </span>
                    </div>
                    <div className="row mt-2" role="group">
                        <div className="col-6">
                            {renderRating(book.avgRating ? book.avgRating : 0)}
                        </div>
                        <div className="col-6 text-end">
                            <button className="btn btn-secondary btn-block me-2">
                                <i className="fas fa-heart" />
                            </button>
                            <button className="btn btn-danger btn-block">
                                <i className="fas fa-shopping-cart" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookProps;