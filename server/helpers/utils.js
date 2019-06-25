import bcrypt from 'bcryptjs';
import { ideaMetricsCount } from './defaults';

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
