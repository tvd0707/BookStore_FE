import ReviewModel from "../models/ReviewModel";
import { my_request } from "./Request";

export async function getReviewByBook(path: string): Promise<ReviewModel[]> {
    const result: ReviewModel[] = [];

    // Gọi phương thức request
    const response = await my_request(path);

    // Lấy ra json image
    const responseData = response._embedded.reviews;

    for (const key in responseData) {
        result.push({
            reviewId: responseData[key].reviewId,
            ratingPoint: responseData[key].ratingPoint,
            reviewContent: responseData[key].reviewContent,
            userId: responseData[key].userId,
        });
    }

    return result;
}

export async function getAllReviewByBook(bookId: number): Promise<ReviewModel[]> {
    // Xác định endpoint
    const domain = `http://localhost:8080/books/${bookId}/reviewList`;

    return getReviewByBook(domain);
}

export async function get1ReviewOfBook(bookId: number): Promise<ReviewModel[]> {
    // Xác định endpoint
    const domain = `http://localhost:8080/books/${bookId}/reviewList?sort=imageId,asc&page=0&size=1`;

    return getReviewByBook(domain);
}
