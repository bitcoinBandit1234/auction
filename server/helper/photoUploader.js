const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "auctionImg");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
    
    // checking the extension of the image uploaded by the user
    
const filefilter = (req, file, cb) => {
    if (
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg"
      ){
        cb(null, true);
      } else {
        cb(null, false);
      }
    };
    
    const upload = multer({ storage: storage, fileFilter: filefilter });

    module.exports = upload;
    