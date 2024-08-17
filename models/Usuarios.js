module.exports = (sequelize, DataTypes)=>{
    const Usuario = sequelize.define('usuario', {
        id: DataTypes.INTEGER,
        username: DataTypes.STRING,
        status: DataTypes.CHAR
    }, {});
    Usuario.associate = function(models) {
        // associations can be defined here
    };    return Usuario;
}