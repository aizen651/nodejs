const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const controller = require('../controllers/productController')

const storage = multer.diskStorage({
  distination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    ext ? cb (null, true) : cb(new Error('Images only!'));
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', upload.single('image'), controller.create);
router.put('/:id', upload.single('image'), controller.update);
router.delete('/:id', controller.remove);

module.exports = router;