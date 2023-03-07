const multer = require('multer');
const path = require('path');

const storageAvatar = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, './src/public/avatars');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req: any, file: any, cb: any) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const storageImage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, './src/public/images');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req: any, file: any, cb: any) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req: any, file: any, cb: any) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

export const uploadAvatar = multer({ storage: storageAvatar, fileFilter: imageFilter })
export const uploadImage = multer({ storage: storageImage, fileFilter: imageFilter })