const { Sequelize, Model, DataTypes } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_NAME || 'RandomFacts', process.env.DB_USER || 'postgres', process.env.DB_PASSWORD || 'Secret123', {
    //host: 'database-history.c38rmlslmqvn.us-east-1.rds.amazonaws.com',
    host: process.env.DB_HOST || 'database-history.c38rmlslmqvn.us-east-1.rds.amazonaws.com',
    dialect: 'postgres',
    port: '5432'
});


sequelize.authenticate().then(x => console.log(`successfully connected to the database ${x}`))
    .catch(err => console.log(`error connecting to the database ${err}`))


class Facts extends Model {}

Facts.init({
    fact: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'facts'
})

Facts.sync({ alter: true })



exports.Facts = Facts
