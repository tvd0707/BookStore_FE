import React, { useEffect, useState } from "react";
import BookModel from "../../../models/BookModel";
import ImageModel from "../../../models/ImageModel";
import { getThumbnailOfBook } from "../../../api/ImageApi";
interface CarouselItemInterface {
    book: BookModel;
}

const CarouselItem: React.FC<CarouselItemInterface> = (props) => {
    const { book } = props;

    const [imageList, setImageList] = useState<ImageModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        getThumbnailOfBook(book.bookId).then(
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
        <div>
            <div className="row align-items-center">
                <div className="col-5 text-center">
                    <img src={dataImage} className="float-end" style={{ width: '150px' }} alt="..." />
                </div>
                <div className="col-7">
                    <h5>{book.bookName}</h5>
                </div>
            </div>
        </div>
    )
}

export default CarouselItem;