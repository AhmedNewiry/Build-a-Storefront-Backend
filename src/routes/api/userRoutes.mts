import express from 'express';
import { index, show, create, authentication } from '../../handlers/users.mjs';
import verifyAuth from '../../middlewares/verifyAuthorization.mjs';
const user = express.Router();

user.route('/').get(verifyAuth, index).post(create);
user.route('/:id').get(verifyAuth, show);
user.route('/authenticate').post(authentication);

export default user;
