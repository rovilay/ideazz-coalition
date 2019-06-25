import {
    apiPrefix,
    appWelcomeMsg,
    nonExistingRouteMsg
} from '../helpers/defaults';
import errorHandler from '../middlewares/errorHandler';
import userRoutes from './userRoutes';


/**
 * Initializes routes
 *
 * @param {*} app - application
 * @returns {*} app with routes
 */
const routes = (app) => {
    app.get(['/', apiPrefix], (_, res) => {
        res.status(200).json({
            success: true,
            message: appWelcomeMsg
        });
    });

    app.use(apiPrefix, userRoutes);

    // add new routes before the errorHandler
    app.use(errorHandler);

    // catch all routers
    app.use('*', (_, res) => res.status(404).json({
        success: false,
        error: nonExistingRouteMsg
    }));

    return app;
};

export default routes;
