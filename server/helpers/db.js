/**
 * Handles operations on DB
 *
 * @exports
 * @class DB
 */
class DB {
    /**
     * Finds a resource in the DB
     *
     * @static
     * @param {*} Model - Model of Collections to query
     * @param {object} conditions - conditions to query the DB
     * @param {string} [exclude=''] - resource properties to exclude
     * @returns {object} found resource
     * @memberof DB
     */
    static async findOne(Model, conditions) {
        try {
            const resource = await Model.findOne(conditions);
            return resource;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Finds multiple resources at once in the DB
     *
     * @static
     * @param {*} Model - Model of Collections to query
     * @param {object} conditions - conditions to query the DB
     * @param {object} options - options for the query
     * @returns {Array} found entries
     * @memberof DB
     */
    static async findAll(Model, conditions) {
        try {
            const entries = await Model.findAndCountAll(conditions);
            return entries;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Creates new resource in the DB
     *
     * @static
     * @param {*} Model - Model of Collections to query
     * @param {object} conditions - conditions to query the DB
     * @returns {object} new resource
     * @memberof DB
     */
    static async create(Model, conditions) {
        try {
            const newResource = await Model.create(conditions);
            return newResource;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Updates a rosource in the DB
     *
     * @static
     * @param {*} Model - Model of Collections to query
     * @param {*} data - data to update the resource with
     * @param {object} conditions - conditions to query the DB
     * @param {*} options
     * @returns {object} updated resource
     * @memberof DB
     */
    static async updateOne(Model, data, conditions) {
        try {
            const updatedResource = await Model.Update(data, conditions);
            return updatedResource;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Deletes a resource in the DB by ID
     *
     * @static
     * @param {*} Model - Model of Collections to query
     * @param {string} conditions - conditions to query the DB
     * @returns {null} nothing
     * @memberof DB
     */
    static async delete(Model, conditions) {
        try {
            await Model.destroy(conditions);
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Deletes multple resources in the DB
     *
     * @static
     * @param {*} Model - Model of Collections to query
     * @param {object} conditions - conditions to query the DB
     * @returns {null} nothing
     * @memberof DB
     */
    static async deleteAll(Model, conditions) {
        try {
            await Model.deleteMany(conditions);
            return;
        } catch (error) {
            throw error;
        }
    }
}

export default DB;
