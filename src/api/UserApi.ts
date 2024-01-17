import { my_request } from "./Request";
import UserModel from "../models/UserModel";

export async function getUser(path: string): Promise<UserModel[]> {
    const result: UserModel[] = [];

    // Gọi phương thức request
    const response = await my_request(path);

    // Lấy ra json image
    const responseData = response._embedded.users;

    for (const key in responseData) {
        result.push({
            userId: responseData[key].userId,
            firstName: responseData[key].firstName,
            lastName:   responseData[key].lastName,
            username:  responseData[key].username,
            password: responseData[key].password,
            gender: responseData[key].gender,
            email: responseData[key].email,
            phone: responseData[key].phone,
            deliveryAddress: responseData[key].deliveryAddress,
            orderAddress: responseData[key].orderAddress,
        });
    }

    return result;
}

export async function getAllUser(): Promise<UserModel[]> {
    // Xác định endpoint
    const domain = `http://localhost:8080/users`;

    return getUser(domain);
}

