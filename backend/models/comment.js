module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comments", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        auteur: {
            type: Sequelize.STRING,
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