import { useState, useEffect } from "react";
import { getAllReviewByBook } from "../../../api/ReviewApi";
import ReviewModel from "../../../models/ReviewModel";
import renderRating from "../../../utils/StarReating";

interface ReviewBookProps {
    bookId: number;
}

function ReviewBook({ bookId }: ReviewBookProps) {
    const [reviewList, setReviewList] = useState<ReviewModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        getAllReviewByBook(bookId).then(
            data => {
                setReviewList(data);
                setLoading(false);
            }
        ).catch(
            error => {
                setLoading(false);
                setErr(error.message);
            }
        )
    }, [bookId]);


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


    return (
        <div className="container mt-2 mb-2 text-center">
            <h4>Đánh giá sản phẩm: </h4>
            {reviewList.map((review) => (
                <div className="row">
                        <div className="col-4  text-end">
                            <p>{renderRating(review.ratingPoint?review.ratingPoint:0)}</p>
                        </div>
                        <div className="col-8 text-start">
                            <p>{review.reviewContent}</p>
                        </div>
                    </div>
            ))}
        </div>
    )
}

export default ReviewBook;