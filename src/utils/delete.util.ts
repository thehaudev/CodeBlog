const fs = require('fs');

export const deleteFile = function (file: any) {
    fs.unlink('src/public/avatars/' + file, (err: any) => {
        if (err) {
            throw err;
        }

        console.log("Delete File successfully.");
    });
}
