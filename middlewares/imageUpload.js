const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

const fileFilter = function (req, file, cb) {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(new Error('Only PNG and JPEG images are allowed'))
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload.single('coverImage');
