const {Sequelize,DataTypes} =  require('sequelize')

const sequelize =new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {host:process.env.DB_HOST,dialect:process.env.DB_DIALECT,dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }});

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

async function initializeDatabase() {
  try {
    // Cria as tabelas, se não existirem
    await sequelize.sync({ force: true }); // force:true recria as tabelas a cada deploy

    // Insere os usuários
    await Users.bulkCreate([
      { id: 1, username: 'juliusomo', avatar_url: './images/avatars/image-juliusomo.png' },
      { id: 2, username: 'amyrobson', avatar_url: './images/avatars/image-amyrobson.png' },
      { id: 3, username: 'maxblagun', avatar_url: './images/avatars/image-maxblagun.png' },
      { id: 4, username: 'ramsesmiron', avatar_url: './images/avatars/image-ramsesmiron.png' },
    ]);

    // Insere os comentários
    await Comments.bulkCreate([
      { id:1, user_id:2, parent_id:null, replying_to:null, content:'Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You\'ve nailed the design and the responsiveness at various breakpoints works really well.', score:12, created_at:'2025-07-03 16:24:06' },
      { id:2, user_id:3, parent_id:null, replying_to:null, content:'Woah, your project looks awesome! How long have you been coding for? I\'m still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!', score:5, created_at:'2025-08-01 16:24:21' },
      { id:3, user_id:4, parent_id:2, replying_to:'maxblagun', content:'If you\'re still new, I\'d recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It\'s very tempting to jump ahead but lay a solid foundation first.', score:4, created_at:'2025-08-09 16:24:30' },
      { id:4, user_id:1, parent_id:2, replying_to:'ramsesmiron', content:'I couldn\'t agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.', score:2, created_at:'2025-08-10 16:24:43' },
    ]);

    console.log('Database initialized!');
  } catch (error) {
    console.error('Erro ao inicializar o banco:', error);
  }
}

// Chama a função
initializeDatabase();

module.exports ={sequelize, Users, Comments}
