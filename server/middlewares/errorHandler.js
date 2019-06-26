/* eslint no-unused-vars: 0 */
import { genericErrorMessage } from '../helpers/defaults';

/**
 * Middleware that Handles errors
 *
 * @param {object} error - error object
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {object} next - next object
 * @returns {object} response object
 */
const errorHandler = (error, req, res, next) => {
    const { errors, name } = error;

    if (name && name.toLowerCase().includes('sequelize')
        && !['SequelizeDatabaseError', 'SequelizeForeignKeyConstraintError'].includes(name)
    ) {
        const combinedErrors = {};
        errors.forEach((err) => {
            combinedErrors[err.path] = err.message;
        });

        error.status = 400;
        error.message = combinedErrors;
    }

    res.status(error.status || 500).json({
        success: false,
        error: error.message || error.errors || genericErrorMessage
    });
};

export default errorHandler;
