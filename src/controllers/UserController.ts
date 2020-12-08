import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

interface User {
    id: string;
    email: string;
    nickname: string;
    password: string;
    birthday: string;
    gender: string;
}

const users: Array<User> = new Array<User>();

export default {

    index(request: Request, response: Response) {
        return response.json(users);
    },

    show(request: Request, response: Response) {
        const { id } = request.params;

        const user = users.find(pl => pl.id === id);

        if (!user) {
            return response.status(400).json( { error: 'User not found' } );
        }

        return response.json(user);
    },

    login(request: Request, response: Response){

        const { email, password } = request.body;

        const user = users.find(pl => pl.email === email);

        if (!user) {
            return response.status(401).json( { error: 'Incorrect email/password combination!' } );
        }

        if (user.password !== password) {
            return response.status(401).json( { error: 'Incorrect email/password combination!' } );
        }

        return response.json(user);

    },

    create(request: Request, response: Response) {

        const {
            email,
            nickname,
            password,
            birthday,
            gender,
        } = request.body;

        const data = {
            id: uuid(),
            email,
            nickname,
            password,
            birthday,
            gender,
        };

        users.push(data);

        return response.json(data);
    },

    update(request: Request, response: Response) {
        const id = request.params.id;

        const {
            email,
            nickname,
            password,
            birthday,
            gender,
        } = request.body;

        const userIndex = users.findIndex(user => user.id === id);

        if (userIndex < 0) {
            return response.status(400).json( { error: 'User not found' } );
        }

        const user = {
            id,
            email,
            nickname,
            password,
            birthday,
            gender
        };

        users[userIndex] = user;

        return response.json(user);
    }

}