const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.replace(' ', '-')
        cb(null, file.fieldname + '-' + Date.now() + fileName)
    }
})

const upload = multer({ storage: storage })

module.exports = upload