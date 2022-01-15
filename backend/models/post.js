module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("posts", {
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
        titre: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
        },
        contenu: {
            type: Sequelize.TEXT,
            required: true,
            allowNull: false,
        },
        /*image_url: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
        },*/
    });

    return Post;
};