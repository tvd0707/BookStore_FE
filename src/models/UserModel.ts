class UserModel {
    userId: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    gender: string;
    email: string;
    phone: string;
    deliveryAddress: string;
    orderAddress: string;

    constructor(userId: number,
        firstName: string,
        lastName: string,
        username: string,
        password: string,
        gender: string,
        email: string,
        phone: string,
        deliveryAddress: string,
        orderAddress: string
        ) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.gender = gender;
        this.email = email;
        this.phone = phone;
        this.deliveryAddress = deliveryAddress;
        this.orderAddress = orderAddress;
    }
}
export default UserModel;