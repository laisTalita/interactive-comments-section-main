const {Sequelize,DataTypes} =  require('sequelize')

const sequelize = new Sequelize(
process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host:process.env.DB_HOST,
    dialect:process.env.DB_DIALECT,
   dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
   }
  }
  );

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

await Comments.update(
  { score: 12 },       
  { where: { user_id: 2 } } 
);

await Comments.update(
  { score: 5 },       
  { where: { user_id: 3 } } 
);


async function initializeDatabase() {
  try {
    await sequelize.sync();
    const userCount = await Users.count();
    if (userCount ===0) {
      await Users.bulkCreate([
      { id: 1, username: 'juliusomo', avatar_url: './images/avatars/image-juliusomo.png' },
      { id: 2, username: 'amyrobson', avatar_url: './images/avatars/image-amyrobson.png' },
      { id: 3, username: 'maxblagun', avatar_url: './images/avatars/image-maxblagun.png' },
      { id: 4, username: 'ramsesmiron', avatar_url: './images/avatars/image-ramsesmiron.png' },
    ]);
    }
    const commentExists = await Comments.findByPk(4);

      if (!commentExists) {
        await Comments.create({
          id: 4,
          user_id: 1,
          parent_id: 2,
          replying_to: 'ramsesmiron',
          content: 'I couldn\'t agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.',
          score: 2,
          created_at: '2025-08-10 16:24:43'
        });
      }
    console.log('Database initialized!');
  } catch (error) {
    console.error('Erro ao inicializar o banco:', error);
  }
}

initializeDatabase();

module.exports ={sequelize, Users, Comments}
