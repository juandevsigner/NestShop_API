import { v4 as uuid } from 'uuid';

export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file) return callback(new Error('File is empty'), false);

  const [_, fileExtension] = file.mimetype.split('/');
  const fileName = `${uuid()}.${fileExtension}`;

  callback(null, fileName);
};
