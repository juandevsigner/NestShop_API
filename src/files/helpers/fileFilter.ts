export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file) return callback(new Error('File is empty'), false);
  const [_, extension] = file.mimetype.split('/');
  const validExtension = ['jpg', 'jpeg', 'png', 'gif'];

  if (validExtension.includes(extension)) {
    return callback(null, true);
  }

  callback(null, false);
};
