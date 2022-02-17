// Importation de Multer
const multer = require('multer');
// dictionnaire d'objet avec les différents MIME TYPES 
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    //la fonction destination indique à multer d'enregistrer les fichiers dans le dossier images
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    /*la fonction filename indique à multer d'utiliser le nom d'origine, 
    de remplacer les espaces par des underscores et d'ajouter un timestamp Date.now() comme nom de fichier*/
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

/* Exportation de  l'élément multer entièrement configuré, 
lui passons notre constante storage et lui indiquons que nous gérerons uniquement les téléchargements de fichiers image.*/
module.exports = multer({ storage: storage }).single('file');