import mongoose, { Schema, Document } from 'mongoose';

export interface IMusics extends Document{
    id: string;
    nome: string;
    cantor: string;
    duracao: string;
    url_audio: string;
}

interface IPlaylist extends Document{
    owner_id: string;
    nome: string;
    capa: string;
    descricao: string;
    musicas: Array<IMusics>;
}

const PlaylistSchema: Schema = new Schema({
    owner_id:{
        type: String,
        required: false,
    },
    nome: {
        type: String,
        required: true,
    },
    capa: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    musicas: [{
        type: Object
    }],
    createdAt:{
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model<IPlaylist>('Playlist', PlaylistSchema);