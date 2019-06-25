import dotenv from 'dotenv';

import Models from '../models';
import DB from '../helpers/db';
import { invalidToken, tokenRequired } from '../helpers/defaults';
import { verifyToken } from '../helpers/utils';

dotenv.config();

const { User: UserModel } = Models;

/**
 * Middleware that authencticates routes
 *
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {object} next - next object
 * @returns {object} next object
 */
const authenticate = async (req, res, next) => {
    try {
        const { authorization: bearerToken } = req.headers;

        if (!bearerToken || bearerToken.split(' ')[0] !== 'Bearer') {
            const error = {
                message: tokenRequired,
                status: 401
            };

            throw error;
        }

        const token = bearerToken.split(' ')[1];
        // verify token
        const userData = await verifyToken(token);

        const { id } = userData;
        const user = await DB.findOne(UserModel, { where: { id }, deletedAt: null });

        if (!user) {
            const error = {
                message: invalidToken,
                status: 401
            };

            return next(error);
        }

        req.user = user;
        return next();
    } catch (error) {
        return next(error);
    }
};

export default authenticate;
