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

export const calcIdeaMetricsAvg = async (ideaModel) => {
    try {
        /* eslint max-len: 0 */
        let metricsAvg = (Number(ideaModel.confidence)
            + Number(ideaModel.ease) + Number(ideaModel.impact)) / ideaMetricsCount;
        metricsAvg = parseFloat(metricsAvg.toFixed(1));
        await ideaModel.setDataValue('average', metricsAvg);
    } catch (error) {
        throw error;
    }
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
        return jwt.verify(token, SECRET, (error, userData) => {
            if (error || userData === undefined) {
                throw new Error(verifyTokenError);
            }

            return userData;
        });
    }
};

/**
 * Verifies if value is an integer
 *
 * @param {any} value - value to verify
 * @returns {number} - parsed integer value or unparsed value
 */
export const vetNumber = (value) => {
    if (value && Number.isInteger(value)) {
        return parseInt(value, 10);
    }

    return Number(value);
};
