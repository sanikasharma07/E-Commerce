import multer from "multer";

const storage = multer.diskStorage({
    filename: function(req, file, callback) {
        // Adds the exact millisecond to the start of the file name
        callback(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage })

export default upload