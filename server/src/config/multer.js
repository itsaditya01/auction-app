const multer = require("multer");
const crypto = require("crypto");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.filename + "-" + Date.now());
//   },
// });

// const storage = multer.diskStorage({

//      destination: (req, file, cb) => {
//         cb(null, "uploads");
//       },
// });
// destination: "./uploads/",
// filename: function (req, file, callback) {
//   callback(
//     null,
//     file.originalname + "-" + Date.now() + path.extname(file.originalname)
//   );
// },

// const upload = multer({ storage: storage });
const diskStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const randomHash = crypto.randomUUID();
    const extension = file.originalname.split(".").at(-1);
    const filename = `${randomHash}.${extension}`;
    cb(null, filename);
  },
});
const upload = multer({
  storage: diskStorageEngine,
});
module.exports = upload;
