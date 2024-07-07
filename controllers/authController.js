class authControler {
    registerPage = (req , res) => {
        return res.render('../view/dashboard/register.ejs')
    }
}
module.exports = new authControler()