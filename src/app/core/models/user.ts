import { IUser } from "../interfaces/user";

export class User {
    _id: string;
    firstname: string;
    lastname: string;
    account: string;
    email: string;
    password: string;
    phone: string;
    constructor(user: IUser) {
        this._id = user._id || '';
        this.firstname = user.firstname || '';
        this.lastname = user.lastname || '';
        this.account = user.account;
        this.email = user.email;
        this.password = user.password || '';
        this.phone = user.phone;        
    }
    fullname(): string {
        return (!this.firstname && !this.lastname) ? this.email : `${this.lastname} ${this.firstname}`;
    }
}
