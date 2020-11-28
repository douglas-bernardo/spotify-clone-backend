import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

interface Musics {
    id: string;
    nome: string;
    cantor: string;
    duracao: string;
    url_audio: string;
}

interface Playlist {
    id: string;
    owner_id: string;
    nome: string;
    capa: string;
    descricao: string;
    musicas: Array<Musics>;
}

const playlists: Array<Playlist> = new Array<Playlist>();

export default {

    index(request: Request, response: Response) {
        return response.json(playlists);
    },


    show(request: Request, response: Response) {
        const { id } = request.params;

        const playlist = playlists.filter(pl => pl.id === id);

        return response.json(playlist);
    },

    create(request: Request, response: Response) {

        const {
            owner_id,
            nome,
            capa,
            descricao
        } = request.body;

        const requestMusics = request.body.musicas;

        const musicas = requestMusics.map((obj: Musics)=> ({ ...obj, id: uuid() }))

        const data = {
            id: uuid(),
            owner_id,
            nome,
            capa,
            descricao,
            musicas
        };

        playlists.push(data);

        return response.json(data);
    },

    update(request: Request, response: Response) {
        const id = request.params.id;

        const {
            owner_id,
            nome,
            capa,
            descricao,
            musicas
        } = request.body;

        const playlistIndex = playlists.findIndex(playlist => playlist.id === id);

        if (playlistIndex < 0) {
            return response.status(400).json({error: 'Not found'});
        }

        const playlist = {
            id,
            owner_id,
            nome,
            capa,
            descricao,
            musicas
        };

        playlists[playlistIndex] = playlist;

        return response.json(playlist);
    }

}