import Models from '../models';
import DB from '../helpers/db';
import { generateToken, comparePassword } from '../helpers/utils';
import {
    defaultSuccessMsg, invalidCredentials, unavailableUser,
} from '../helpers/defaults';

const { User: UserModel } = Models;

class UserController {
    /**
     * Creates a UserModel
     *
     * @static
     * @param  {object} req - request object
     * @param  {object} res - response object
     * @param  {object} next - next object
     * @returns {object} response object
     * @memberof UserController     *
     */
    static async createUser(req, res, next) {
        try {
            const { name = '', email = '', password = null } = req.body;

            const conditions = {
                name: name.toLowerCase(),
                email: email.toLowerCase(),
                password
            };

            if (password && password.length < 7) {
                const error = Error('password length must be greater than six');
                error.status = 400;
                return next(error);
            }

            const newUser = await DB.create(UserModel, conditions);

            if (newUser) {
                const token = await generateToken(newUser);

                return res.status(201).json({
                    success: true,
                    message: defaultSuccessMsg,
                    token
                });
            }
        } catch (error) {
            return next(error);
        }
    }

    /**
     * Logins in a contact
     *
     * @static
     * @param  {object} req - request object
     * @param  {object} res - response object
     * @param  {object} next - next object
     * @returns {object} response object
     * @memberof ContactController
     */
    static async loginUser(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email) {
                const error = Error(invalidCredentials);
                error.status = 400;
                return next(error);
            }

            const conditions = {
                where: { email, deletedAt: null }
            };
            const user = await DB.findOne(UserModel, conditions);

            if (!user) {
                const error = {
                    message: unavailableUser,
                    status: 404
                };

                throw error;
            }

            const { password: hashedPassword } = user;
            const passwordMatch = await comparePassword(hashedPassword, `${password}`);

            if (!passwordMatch) {
                const error = {
                    message: invalidCredentials,
                    status: 401
                };

                throw error;
            }

            const token = await generateToken(user);

            return res.status(200).json({
                success: true,
                message: defaultSuccessMsg,
                token
            });
        } catch (error) {
            return next(error);
        }
    }
}

export default UserController;
