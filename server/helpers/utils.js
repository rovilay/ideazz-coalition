import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { ideaMetricsCount, verifyTokenError } from './defaults';

dotenv.config();

const {
    SECRET,
    TOKEN_EXPIRES_IN
} = process.env;

export const hashPassword = async (userModel) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userModel.password, saltRounds);
        await userModel.setDataValue('password', hashedPassword);
    } catch (error) {
        throw error;
    }
};

export const calcIdeaMetricsAvg = (ideaModel) => {
    /* eslint max-len: 0 */
    const metricsAvg = (ideaModel.confidence + ideaModel.ease + ideaModel.impact) / ideaMetricsCount;
    ideaModel.setDataValue('average', metricsAvg);
};

/**
 * Compares a password with a hashed password
 *
 * @param {*} hashedPassword
 * @param {*} password
 * @returns {boolean} true/false depending on if there is a match or not
 */
export const comparePassword = async (hashedPassword, password) => {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        throw error;
    }
};


/**
 * Generates user token using jsonwebtoken
 *
 * @param {object} user - user information to include in toke
 * @returns {string} token
 */
export const generateToken = async (user) => {
    try {
        const { id, name, email } = user;

        const token = await jwt.sign({ id, email, name }, SECRET,
            { expiresIn: TOKEN_EXPIRES_IN });

        return token;
    } catch (error) {
        throw error;
    }
};

/**
 * Verifies usertoken using jsonwebtoken
 *
 * @param {string} token - token to verify
 * @returns {object} user data
 */
export const verifyToken = (token) => {
    if (token) {
        jwt.verify(token, SECRET, (error, userData) => {
            if (error || userData === undefined) {
                throw new Error(verifyTokenError);
            }

            return userData;
        });
    }
};
