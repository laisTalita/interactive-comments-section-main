const{ Comments, Users} = require('../models/commentsModels')
const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime');
const { unescapeLeadingUnderscores } = require('typescript');
dayjs.extend(relativeTime)

async function getAll(req,res) {
  try {
    const comments = await Comments.findAll({
      where: { parent_id: null },
      order: [["id", "ASC"]],
      include: [
        {
          model: Users,as: 'user'
        },
        {
          model: Comments,as:'replies',
          include: [
            {
              model: Users,
              as: 'user'
            }
          ]
        }
      ]
    });
      const response = comments.map(comment =>{
        return {
          ...comment.toJSON(),
          timeAgo: dayjs(comment.created_at).fromNow(),
            replies: comment.replies.map(reply => ({
                ...reply.toJSON(),
          timeAgo: dayjs(reply.created_at).fromNow()
           }))
        }
      })
    
  res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
async function createComment(req,res) {
  const{content, replying_to,parent_id,user_id} = req.body

  try{
    const newComment = await Comments.create({
      content:content,
      replying_to:replying_to,
      parent_id:parent_id,
      user_id:user_id,
      created_at: new Date(),
      score: Math.floor(Math.random()*4),
    }) 
  
      res.json(newComment);
  }   
  catch(err){
    console.log(err)
    res.json(err.message)
  }
}
async function deleteComment(req,res) {
  const{id_comment} = req.body
  if (!id_comment) {
        return res.status(400).json({ message: "Comentário não encontrado" });
  }
  try{
    const delete_comment = await Comments.destroy({
      where: {id: id_comment}
    })   
  return res.json({ message: "Comentário deletado com sucesso" });
  }catch(err){
    console.log(err)
  }
}
async function alterComment(req,res) {
  try{
    const{ id, text} = req.body
    const update= await Comments.findByPk(id)
     update.content = text
     await update.save()
     res.json("comentário atualizado")
  }catch(err){
      res.json("erro"+err)
  }

}
async function score(req,res) {
   const {userId, id,x} = req.body

   if (userId !== 1) {
    const comment = await Comments.findByPk(id);
     
    if (x==='up') {
      comment.score +=x
    }
    else{
      comment.score -=x
    }
    await comment.save();
    return res.json({ score: comment.score });
}

}
module.exports={getAll, createComment,deleteComment, alterComment, score}

 
