const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/imagenes/userImages');
	},
	filename: (req, file, cb) => {
		let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
		cb(null, fileName);
	}
})

const fileUpload = multer({ storage });

module.exports= fileUpload;

/*const path = require('path');
const multer = require ('multer');
let multerDiskStorage = multer.diskStorage(
    {
        destination: (req, file, callback) =>
        {let folder = path.join(__dirname, '../../public/imagenes/userImages');
        callback (null, folder)
        },
        filename: (req, file, callback) => {
            let imageName= Date.now() + path.extname(
                file.originalname
            );
            callback(null, imageName)
        }
    }
    )
        let fileUpload = multer ({
            storage: multerDiskStorage
        })

module.exports = fileUpload;*/

