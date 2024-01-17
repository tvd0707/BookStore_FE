import ImageModel from "../models/ImageModel";
import { my_request } from "./Request";

export async function getImageByBook(path: string): Promise<ImageModel[]> {
    const result: ImageModel[] = [];

    // // Xác định endpoint
    // const domain = `http://localhost:8080/books/${bookId}/imageList`;

    // Gọi phương thức request
    const response = await my_request(path);

    // Lấy ra json image
    const responseData = response._embedded.images;

    for (const key in responseData) {
        result.push({
            imageId: responseData[key].imageId,
            imageName: responseData[key].imageName,
            isThumbnail: responseData[key].isThumbnail,
            urlImage: responseData[key].urlImage,
            dataImage: responseData[key].dataImage,
        });
    }

    return result;
}

export async function getAllImageByBook(bookId: number): Promise<ImageModel[]> {
    // Xác định endpoint
    const domain = `http://localhost:8080/books/${bookId}/imageList`;

    return getImageByBook(domain);
}

export async function getThumbnailOfBook(bookId: number): Promise<ImageModel[]> {
    // Xác định endpoint
    const domain = `http://localhost:8080/books/${bookId}/imageList?sort=imageId,asc&page=0&size=1`;

    return getImageByBook(domain);
}