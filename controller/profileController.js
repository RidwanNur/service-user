const {User} = require('../models');
const bcrypt = require('bcrypt');
const Validator = require('fastest-validator');
const valid = new Validator();
const TimeFormat = require('moment');
const { DateTime } = require('luxon');


const GetListUsers = async(req,res) => {
    
    const listId = req.query.user_id || [];
    sql_All = {
        attributes : ['id', 'name', 'email', 'role', 'profession', 'avatar']
    };

    console.log(listId);

    
    if(listId.length){
        sql_All.where = {
            id : listId
        }
    };
    const users = await User.findAll(sql_All);

    res.status(200).json({
        status: 'success',
        data: users
    });
}

const Getuser = async (req, res) => { //GET USER BY ID
    const {userId} = req.params;

    const user = await User.findByPk(userId, {
        attributes : ['id','name','email','avatar','profession','role'],
    });
    console.log(user);

    if(!user){
        res.status(404).json({
            status: 'Error',
            message: 'User not found'
        });
    }

    res.status(200).json({
        data: user,
        message: 'OK'
    });
}

const UpdateUser = async (req,res) => {
    const {email, password, name, profession, avatar} = req.body;
    const {userId} = req.params;

    const validateSchema = {
        name: 'string | empty: false',
        email: 'email | empty: false',
        password: 'string | min:6',
        profession: 'string | optional',
        avatar: 'string | optional'
    };
    const validate = valid.validate(req.body, validateSchema);

    if(validate.length){
        return res.status(400).json({
            status: "Error",
            data: validate
        });
    }

    const user = await User.findByPk(userId);
    if(!user){
        return res.status(404).json({
            status: 'Error',
            message:'User not found!'
        });
    }   
    if(email){
        const emailChecking = await User.findOne({
            where : {email}
        });

        if(emailChecking && email !== user.email) {
            res.status(409).json({
                status: "Error",
                message: "Email Already Exist!",
            });
        }
    }

    const time = new Date();
    console.log(time)
  
    const hashedPassword = await bcrypt.hash(password, 10);
    await user.update({
        email,
        hashedPassword,
        name,
        profession,
        avatar,
        updated_at: time,
    },
    {
        where : {
            id: userId
        }
    });

    res.status(200).json({
        status: "Success",
        message : "Update Success"
    });
    
}

module.exports = {
    UpdateUser,
    Getuser,
    GetListUsers,
}