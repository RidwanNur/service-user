module.exports = (sequelize, Datatypes) => {
    const RefreshToken = sequelize.define('RefreshToken', {
        id:{
            type: Datatypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
        },
        token:{
            type:Datatypes.TEXT,
            allowNull:false
        },
        user_id:{
            type:Datatypes.INTEGER,
            allowNull:false,
            unique:true
        },
        createdAt:{
            field: 'created_at',
            type:Datatypes.DATE,
            allowNull:true
        },
        updatedAt:{
            field: 'updated_at',
            type:Datatypes.DATE,
            allowNull:true,
            
        }
    },{
        tableName:'refresh_tokens',
        timestamps:true
    });


    return RefreshToken;
}