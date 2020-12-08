import { Router } from 'express';

import PlaylistsController from './controllers/PlaylistsController';
import UserController from './controllers/UserController';

const routes = Router();

routes.get('/playlists', PlaylistsController.index);
routes.post('/playlists', PlaylistsController.create);
routes.get('/playlists/:id', PlaylistsController.show);
routes.put('/playlists/:id',PlaylistsController.update);
routes.get('/playlists/owner/:id', PlaylistsController.findByOwnerId);

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);
routes.post('/login', UserController.login);

export default routes;
