import { IUser } from "../interfaces/user";

export class Profile {
    _id: string;
    firstname: string;
    lastname: string;
    account: string;
    email: string;  
    phone: string;
    constructor(user: IUser) {
        this._id = user._id || '';
        this.firstname = user.firstname || '';
        this.lastname = user.lastname || '';
        this.account = user.account;
        this.email = user.email;      
        this.phone = user.phone;        
    }
    fullname(): string {
        return (this.firstname || this.lastname) ? `${this.lastname} ${this.firstname}` : this.email;
    }
}