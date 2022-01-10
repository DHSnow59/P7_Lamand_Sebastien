module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        pseudo: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
        },
        mdp: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
        },
        role: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
    });

    return User;
};