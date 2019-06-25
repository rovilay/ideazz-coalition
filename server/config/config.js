require('dotenv').config();

const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_DATABASE,
    DB_TEST_DATABASE,
    DB_HOST,
    DB_PORT,
    DB_DIALECT,
} = process.env;

module.exports = {
    development: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        host: DB_HOST,
        port: DB_PORT,
        dialect: DB_DIALECT || 'postgres'
    },
    localTest: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_TEST_DATABASE,
        host: DB_HOST,
        port: DB_PORT,
        dialect: DB_DIALECT || 'postgres'
    },
    test: {
        use_env_variable: 'DB_URL_TEST'
    },
    production: {
        use_env_variable: 'DB_URL_PROD'
    }
};
