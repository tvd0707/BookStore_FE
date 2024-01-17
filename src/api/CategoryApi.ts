import CategoryModel from "../models/CategoryModel";
import { my_request } from "./../api/Request";

export async function getCategory(path: string): Promise<CategoryModel[]> {
    const result: CategoryModel[] = [];
    // Gọi phương thức request
    const response = await my_request(path);

    // Lấy ra json image
    const responseData = response._embedded.categories;

    for (const key in responseData) {
        result.push({
            categoryId: responseData[key].categoryId,
            categoryName: responseData[key].categoryName,
        });
    }

    return result;
}

export async function getAllCategory(): Promise<CategoryModel[]> {
    // Xác định endpoint
    const domain = `http://localhost:8080/categories`;

    return getCategory(domain);
}