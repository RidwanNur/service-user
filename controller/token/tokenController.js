const {User, RefreshToken} = require('../../models');
const Validator = require('fastest-validator');
const valid = new Validator();

const createToken = async (req,res) =>{
    const userId = req.body.user_id;
    const refreshToken = req.body.refresh_token;
    const validateSchema = {
        refresh_token: 'string',
        user_id: 'number',
    };

    const validate = valid.validate(req.body, validateSchema);

    if(validate.length){
        return res.status(400).json({
            status: 'Error',
            message: validate
        });
    }

    const user = await User.findByPk(userId);
    if(!user){
        return res.status(404).json({
            status: 'Error',
            message: 'User Not Found'
        });
    }

    const createdRefreshToken = await RefreshToken.create({
        token: refreshToken,
        user_id: userId,
        created_at: new Date(),
        updated_at:new Date()
    });
    return res.status(202).json({
        data: {
            id : createdRefreshToken.id,
            token : createdRefreshToken.token
            },
        message: 'Token Created'
    });
}

const getToken = async(req,res) => {
    const {refresh_token} = req.query;
    const token = await RefreshToken.findOne({
        where: {
            token: refresh_token,
        }
    });

    if(!token){
        return res.status(400).json({
            status: 'Error',
            message: 'Invalid token',
        });
    }

    return res.status(200).json({
        status:'Succes',
        data:token,
    });
}


module.exports = {
    createToken,
    getToken,
}