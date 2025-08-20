const express = require("express")
const cors = require("cors")

const {sequelize} = require('./models/commentsModels')
const commentsRoutes = require('./routes/commentsRoutes')

sequelize.authenticate()
  .then(() => console.log('Conectado ao banco'))
  .catch(err => console.error('Erro de conexão:', err));
 
const app = express()

app.use(cors({
    origin: 'http://localhost:3000' }
)); 

app.use(express.json())
app.use("/comments", commentsRoutes)

app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});

