const formidable = require('formidable')
const validator = require('validator') 
const authModel = require('../models/authModel.js')
const fs = require('fs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AuthController {
    registerPage = (req , res) => {
        return res.render('../view/dashboard/register.ejs' , {error : ''})
    }
    userRegister = async(req , res) => {
        const form = new formidable.IncomingForm({multiples: true})
        form.parse(req , async(err, fields, files) => {
            
            // Ensure fields are not arrays because it needs to be done when we are using formidable
            const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
            const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;
            const password = Array.isArray(fields.password) ? fields.password[0] : fields.password;
            let image = Array.isArray(files.image) ? files.image[0] : files.image;
            
            // Log processed image
            // console.log('Processed Image:', image);

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
            else {
                try {
                    const user = await authModel.findOne({email})
                    // console.log(user)
                    if (!user) {
                        image.originalFilename = Date.now() + image.originalFilename;
                        const distPath = __dirname + `/../view/assets/image/${image.originalFilename}`
                        fs.copyFile(image.filepath , distPath , async(err) => {
                            if (!err) {
                                const createUser = await authModel.create(
                                    {
                                        name,
                                        email,
                                        password: await bcrypt.hash(password , 9),
                                        image: image.originalFilename
                                    }
                                )
                                const token = jwt.sign({
                                    id: createUser.id,
                                    name: createUser.name,
                                    email: createUser.email,
                                    image: createUser.image
                                }, 'arnabmajumder', {
                                    expiresIn: '3d'
                                })
                                res.cookie('crudToken', token, {
                                    expires: new Date(Date.now() + 3*24*60*60*1000) //3d in millisecond
                                })

                                req.flash('success' , 'You are successfully registered')
                                return res.redirect('/dashboard')
                            }
                            else{
                                req.flash('error', 'Image upload failed, please try again')
                                return res.redirect('/register')

                            }
                        })
                    } else {
                        req.flash('error', 'Email already exists')
                        return res.redirect('/register')
                    }
                } catch (error) {
                    
                }
            }
        })
    }
}
module.exports = new AuthController()