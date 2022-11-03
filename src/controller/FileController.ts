import multer from 'multer';
import path from 'path';
import {v4 as uuidv4} from 'uuid';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../public/uploads'),
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });

export const deleteFile = (filename: string) => {
  const filePath = path.join(__dirname, '../../public/uploads', filename);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(err);
    }
  });
}