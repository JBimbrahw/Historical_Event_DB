const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('RandomFacts', 'postgres', 'Justin', {
    host: 'localhost',
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
