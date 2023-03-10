// User Repository class

import { User } from '../interfaces/users.interface';
import { UserModel } from '../models/users.model';
import BaseRepository from './base.repository';

export default class UserRepository extends BaseRepository<User> {
    constructor() {
        super(UserModel);
    }

}
