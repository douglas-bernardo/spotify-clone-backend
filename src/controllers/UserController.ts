import { Request, Response } from 'express';

import User from '../models/User';

export default {

    async index(request: Request, response: Response) {
        const users = await User.find();

        return response.json(users);
 
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const user = await User.findById(id);

        if (!user) {
            return response.status(400).json( { error: 'User not found' } );
        }

        return response.json(user);
    },

    async login(request: Request, response: Response){

        const { email, password } = request.body;

        const user = await User.findOne({
            email,
        });

        if (!user) {
            return response.status(401).json( { error: 'Incorrect email/password combination!' } );
        }

        if (user.password !== password) {
            return response.status(401).json( { error: 'Incorrect email/password combination!' } );
        }

        return response.json(user);

    },

    async create(request: Request, response: Response) {

        const user = await User.create(request.body);

        return response.json(user);

    },

    async update(request: Request, response: Response) {
        
        const id = request.params.id;

        const user = await User.findByIdAndUpdate(id, request.body, { new: true });

        return response.json(user);

    }

}