class ReviewModel {
    reviewId: number;
    ratingPoint: number;
    reviewContent: string;
    userId: number;

    constructor(reviewId: number, ratingPoint: number, reviewContent: string, userId: number) {
        this.reviewId = reviewId;
        this.ratingPoint = ratingPoint;
        this.reviewContent = reviewContent;
        this.userId = userId;
    }
}

export default ReviewModel;