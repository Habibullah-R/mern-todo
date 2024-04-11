const User = require('../models/auth.model.js')

const deleteAcc = async (req,res,next)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.clearCookie('authentic_Token');
        res.status(200).json('User deleted.')
    } catch (error) {
        next(error);
    }
}

module.exports = { deleteAcc }