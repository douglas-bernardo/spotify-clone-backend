import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

import Playlist, { IMusics } from '../models/Playlist';

export default {

    async index(request: Request, response: Response) {
        const playlists = await Playlist.find();

        return response.json(playlists);
    },


    async show(request: Request, response: Response) {
        const { id } = request.params;

        const playlist = await Playlist.findById(id);

        if (!playlist) {
            return response.status(400).json({ error: 'Playlist not found' });
        }

        return response.json(playlist);
    },

    async findByOwnerId(request: Request, response: Response) {

        const { id } = request.params;

        const owner_playlists = await Playlist.find({
            owner_id: id,
        });

        return response.json(owner_playlists);

    },


    async create(request: Request, response: Response) {

        const {
            owner_id,
            nome,
            capa,
            descricao
        } = request.body;

        const requestMusics = request.body.musicas;

        const musicas = requestMusics.map((obj: IMusics) => ({ ...obj, id: uuid() }))

        const data = {
            owner_id,
            nome,
            capa,
            descricao,
            musicas
        };

        const playlist = await Playlist.create(data);

        return response.json(playlist);
    },

    async update(request: Request, response: Response) {
        const id = request.params.id;

        const playlist = await Playlist.findByIdAndUpdate(
            id,
            request.body, { new: true }
        );

        return response.json(playlist);
    }

}