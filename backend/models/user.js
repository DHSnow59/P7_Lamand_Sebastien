module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            unique: true,
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
        },
        email: {
            unique: true,
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
            defaultValue: 0,
        },
    });

    return User;
};