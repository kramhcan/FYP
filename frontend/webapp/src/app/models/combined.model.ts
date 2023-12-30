import { User } from './users.model';
import { UserData } from './user_datas.model';

export interface CombinedModel {
    _id: string;
    name: string;
    dob: string;
    email: string;
    password: string;
    phone: number;
    role: string;
    __v: number;
    userData: UserData;
}
