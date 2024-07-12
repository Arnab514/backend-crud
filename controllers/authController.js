const formidable = require('formidable')
const validator = require('validator') 
class AuthController {
    registerPage = (req , res) => {
        return res.render('../view/dashboard/register.ejs' , {error : ''})
    }
    userRegister = async(req , res) => {
        const form = new formidable.IncomingForm({multiples: true})
        form.parse(req , (err, fields, files) => {

            // console.log('Fields:', fields);
            // console.log('Files:', files);
            
            // const {name , email , password} = fields
            // let {image} = files
            
            // Ensure fields are not arrays
            const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
            const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;
            const password = Array.isArray(fields.password) ? fields.password[0] : fields.password;
            let image = Array.isArray(files.image) ? files.image[0] : files.image;
            
            // Log processed image
            console.log('Processed Image:', image);

            const error = {}

            // Handle the case where `image` is an array
            if (Array.isArray(image)) {
                image = image[0];
            }

            if(validator.isEmpty(name)) {
                error.name = "Please provide a name"
            }

            if(validator.isEmpty(email)) {
                error.email = "Please provide a email"
            }

            if(!validator.isEmpty(email) && !validator.isEmail(email)) {
                error.email = "Please provide a valid email"
            }

            if(validator.isEmpty(password)) {
                error.password = "Please provide a password"
            }
            
            // Check if `image` exists and has the `originalFilename` property
            if (!image || !image.originalFilename || validator.isEmpty(image.originalFilename)) {
                error.image = "Please provide an image";
            }

            if (Object.keys(error).length > 0) {
                return res.render('dashboard/register' , {error})
            }
            else{
                console.log("errror not found")
            }
        })
    }
}
module.exports = new AuthController()