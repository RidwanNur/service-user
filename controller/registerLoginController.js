const { User, RefreshToken } = require('../models');
const bcrypt = require('bcrypt');
const Validator = require('fastest-validator');
const valid = new Validator();


const Register = async (req, res) => {
    const { email, password, name, profession } = req.body;
    const validateSchema = {
        name: 'string | empty: false',
        email : 'email | empty: false',
        password : 'string | min:6',
        profession: 'string | optional'
    };

    const validate = valid.validate(req.body, validateSchema);
    if(validate.length){
        return res.status(400).json({
            status:"error",
            data:validate
        });
    }
    const user = await User.findOne({
        where: {email}
    });
    if(user){
        return res.status(409).json({
            status:'error', 
            message:'email already exist!'
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = {
        password : hashedPassword,
        name,
        profession,
        email,
        role: 'student'
    };

    const createdUser = await User.create(data);
    return res.status(201).json({
        status: 'success',
        data: {
            id: createdUser.id,
            name:createdUser.name
        }
    });

}

const Login = async(req, res) => {
    const { email, password } = req.body;
    const validateSchema = {
        email: 'string | empty:false',
        password : 'string | min:6'
    };

    const validate = valid.validate(req.body, validateSchema);
    if (validate.length){
        return res.status(400).json({
            status : 'error',
            data: validate 
        });
    }
    const user = await User.findOne({
        where : {email}
    });
    
    if(!user){
        return res.status(404).json({
            status : 'error',
            message : 'Account Not Found, Please Register!'
        });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword){
        res.status(400).json({
            status: 'error',
            message: 'Invalid Password'
        });
    }

    res.status(200).json({
    status: 'Success',
    data : {
        id : user.id,
        name : user.name,
        email : user.email,
        role : user.role,
        avatar : user.avatar,
        profession : user.profession
    }
    });
}

const Logout = async(req,res) => {
    const userId = req.body.user_id;
    // const {userId} = req.body;
    const user = await User.findByPk(userId);

    if(!user){
        return res.status(400).json({
            status: 'Erorr',
            message: 'User not found'
        });
    }

    await RefreshToken.destroy({
        where : {
            user_id : userId
        }
    });

    return res.status(200).json({
        status: 'Success',
        message: 'Refresh Token Deleted'
    });
}


module.exports = {
    Register,
    Login,
    Logout
};