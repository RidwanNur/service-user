module.exports = (sequelize, Datatypes) => {
    const User = sequelize.define('User', {
        id:{
            type: Datatypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
        },
        name:{
            type:Datatypes.STRING,
            allowNull:false
        },
        email:{
            type:Datatypes.STRING,
            allowNull:false,
            unique:true
        },
        password:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        role: {
            type:Datatypes.ENUM,
            values: ['admin','student'],
            allowNull:false,
            defaultValue: 'student'
        },
        avatar:{
            type:Datatypes.STRING,
            allowNull:true
        },
        profession:{
            type:Datatypes.STRING,
            allowNull:true
        },
        createdAt:{
            field: 'created_at',
            type:Datatypes.DATE,
        },
        updatedAt:{
            field: 'updated_at',
            type:Datatypes.DATE,
        }
    },{
        tableName:'users',
        // timestamps:true
    });

    return User;
}