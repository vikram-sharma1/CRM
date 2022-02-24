
const multer  = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"../upload"))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() 
      cb(null,uniqueSuffix+ file.originalname )
    }
  })
  function fileFilter (req, file, cb) {

    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
  if(file.mimetype=="image/jpeg" || file.mimetype=="image/png" || file.mimetype=="image/jpg"){
    cb(null, true)
  }
    // To reject this file pass `false`, like so:
    else{
        cb(null, false)
  
    }
      

  
  }
module.exports = multer({ storage ,fileFilter})