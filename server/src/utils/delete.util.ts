const fs = require("fs");

export const deleteFile = function (file: string | undefined): void {
  if (file) {
    fs.unlink("src/public/avatars/" + file, (err: any) => {});
  }
};
