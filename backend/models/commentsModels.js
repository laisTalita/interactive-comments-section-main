const {Sequelize,DataTypes} =  require('sequelize')

const sequelize =new Sequelize('interactive_comments','root','',{host:'localhost',dialect:'mysql'});

const Users = sequelize.define('users',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
  },
  username: DataTypes.STRING,
  avatar_url: DataTypes.STRING
},{
  timestamps:false,
  tableName:'users'
});
const Comments = sequelize.define('comments', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true,
  },
  user_id: DataTypes.INTEGER,
  content: DataTypes.TEXT,
  created_at: DataTypes.DATE,
  score: DataTypes.INTEGER,
  parent_id: DataTypes.INTEGER,
  replying_to: DataTypes.STRING,
}, {
  timestamps: false,
  tableName: 'comments' 
});

Comments.hasMany(Comments,{as: "replies", foreignKey:'parent_id'})
Comments.belongsTo(Comments,{as:'parent', foreignKey:'parent_id'})
Comments.belongsTo(Users,{foreignKey:'user_id',as:'user'})
Users.hasMany(Comments,{foreignKey:'user_id'})


module.exports ={sequelize, Users, Comments}
