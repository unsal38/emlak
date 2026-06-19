const multer = require('multer')
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            
            cb(null, 'public/images/mulk-images/5x5'); 
        },
        filename: (req, file, cb) => {
            const uzanti = file.mimetype
            const uzanti_split = uzanti.split('/')[1]
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, file.fieldname + '-' + `${uniqueSuffix}.` + uzanti_split);
        }
    });
    const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true); // Kabul et
        } else {
            cb(new Error('Sadece JPEG ve PNG dosyalarına izin verilir!'));
        }
    };
    const limits = {
        fileSize: 3 * 500 * 500,
        files: 3,
        fieldSize: 3 * 500 * 500
    }
    const upload_large = multer({ storage, fileFilter, limits }).array('files', 3)
    

module.exports = {
    upload_large
}