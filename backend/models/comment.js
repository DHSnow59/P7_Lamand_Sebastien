module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comments", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: Sequelize.INTEGER,
            required: true,
            allowNull: false,
        },
        post_id: {
            type: Sequelize.INTEGER,
            required: true,
            allowNull: false,
        },
        contenu: {
            type: Sequelize.TEXT,
            required: true,
            allowNull: false,
        },
    });

    return Comment;
};