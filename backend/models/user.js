module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
        },
        role: {
            type: Sequelize.INTEGER,
            required: true,
            allowNull: false,
            defaultValue: 0,
        },
    });

    return User;
};