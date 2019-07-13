import Models from '../models';
import DB from '../helpers/db';
import { vetNumber } from '../helpers/utils';
import {
    defaultSuccessMsg, ideasNotFoundMsg, genericErrorMessage, ideaMetricsCount,
} from '../helpers/defaults';

const { Idea: IdeaModel } = Models;

class IdeaController {
    /**
     * Creates a IdeaModel
     *
     * @static
     * @param  {object} req - request object
     * @param  {object} res - response object
     * @param  {object} next - next object
     * @returns {object} response object
     * @memberof IdeaController     *
     */
    static async createIdea(req, res, next) {
        try {
            const { id: UserId } = req.user;
            const {
                title, confidence,
                ease, impact
            } = req.body;

            const conditions = {
                title,
                confidence: vetNumber(confidence),
                ease: vetNumber(ease),
                impact: vetNumber(impact),
                UserId
            };

            const newIdea = await DB.create(IdeaModel, conditions);

            if (newIdea) {
                return res.status(201).json({
                    success: true,
                    message: defaultSuccessMsg,
                    idea: newIdea
                });
            }
        } catch (error) {
            return next(error);
        }
    }

    static async getAllIdeas(req, res, next) {
        try {
            const { id: UserId } = req.user;
            // TODO: validate limit and offset
            const { limit = 10, offset = 0 } = req.query;
            const conditions = {
                limit,
                offset,
                order: [['average', 'DESC']],
                where: { UserId }
            };

            const ideas = await DB.findAll(IdeaModel, conditions);

            return res.status(200).json({
                success: true,
                message: defaultSuccessMsg,
                ideas: ideas.rows,
                offset,
                limit,
                total: ideas.count
            });
        } catch (error) {
            return next(error);
        }
    }

    static async getIdea(req, res, next) {
        try {
            const { id: UserId } = req.user;

            const { ideaId } = req.params;
            const conditions = {
                where: { id: ideaId, UserId }
            };

            const idea = await DB.findOne(IdeaModel, conditions);

            if (!idea) {
                const error = {
                    message: ideasNotFoundMsg,
                    status: 404
                };

                throw error;
            }

            return res.status(200).json({
                success: true,
                message: defaultSuccessMsg,
                idea,
            });
        } catch (error) {
            return next(error);
        }
    }

    static async updateIdea(req, res, next) {
        try {
            const { id: UserId } = req.user;
            const {
                title, confidence,
                ease, impact
            } = req.body;
            const { ideaId } = req.params;

            const idea = await DB.findOne(IdeaModel, {
                where: { UserId, id: ideaId, deletedAt: null }
            });

            if (!idea) {
                const error = {
                    message: ideasNotFoundMsg,
                    status: 404
                };

                throw error;
            }

            const conditions = {
                where: { UserId, id: ideaId }
            };

            const updateData = {
                title: title || idea.title,
                confidence: vetNumber(confidence) || idea.confidence,
                ease: vetNumber(ease) || idea.ease,
                impact: vetNumber(impact) || idea.impact,
            };

            const metricsAvg = (updateData.confidence + updateData.ease + updateData.impact)
                / ideaMetricsCount;

            updateData.average = parseFloat(metricsAvg.toFixed(1));

            const updatedIdea = await DB.update(IdeaModel, updateData, conditions);

            if (!updatedIdea[0]) {
                const error = {
                    message: genericErrorMessage,
                    status: 400
                };

                throw error;
            }

            return res.status(200).json({
                success: true,
                message: defaultSuccessMsg,
                idea: {
                    id: ideaId,
                    ...updateData
                }
            });
        } catch (error) {
            return next(error);
        }
    }

    static async deleteIdea(req, res, next) {
        try {
            const { id: UserId } = req.user;
            const { ideaId } = req.params;
            const conditions = {
                where: {
                    id: ideaId,
                    deletedAt: null,
                    UserId
                }
            };

            const idea = await DB.findOne(IdeaModel, conditions);

            if (!idea) {
                const error = {
                    message: ideasNotFoundMsg,
                    status: 404
                };

                throw error;
            }

            await DB.delete(IdeaModel, conditions);
            return res.status(200).json({
                success: true,
                message: defaultSuccessMsg,
            });
        } catch (error) {
            return next(error);
        }
    }
}

export default IdeaController;
