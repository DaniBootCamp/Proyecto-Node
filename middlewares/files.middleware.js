const multer = require('multer');
const path = require('path');



const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const storage = multer.memoryStorage();

const VALID_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req, file, cb) => {
    if (!VALID_FILE_TYPES.includes(file.mimetype)) {
        const error = new Error("file not supported");
        cb(error)
    } else {
        cb(null, true);
    }
};

const upload = multer({
    storage,
    fileFilter,
});

const uploadToCloudinary = async (req, res, next) => {
	const bufferToStream = (buffer) => {
    const readable = new Readable({
      read() {
        this.push(buffer);
        this.push(null);
      },
    });
    return readable;
  };
  const data = await sharp(req.file.buffer).toBuffer();
  const stream = cloudinary.uploader.upload_stream(
    { folder: "TEMP" },
    (error, result) => {
      if (error) return next(error);
      req.file_url = result.secure_url;
      return next();
    }
  );
  bufferToStream(data).pipe(stream);
};

module.exports = { upload: upload, uploadToCloudinary };