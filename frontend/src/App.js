import Comment from "./components/Comment";
import { useState,useEffect} from "react";
import Form from "./components/Form";
import Delete from "./components/Delete";

function App() {

  const[dados,setDados] = useState([])
  const[replying,setReplying] = useState(null)
  const[replyingToId,setReplyingToId] = useState(null)
  const[component_delete, setComponent_delete]= useState(null)
  const[idComponent_delete, setIdComponent_delete]= useState(null)
  const[editForm,setEditForm] = useState(null)

  const commentActions = {
    replying,
    setReplying,
    replyingToId,
    setReplyingToId,
    setComponent_delete,
    setIdComponent_delete,
    print,
    setEditForm,
    editForm,
    update,
    vote,
  }

     const fetch_init = ()=>{
      fetch('https://interactive-comments-section-main-70m9.onrender.com/comments')
        .then(res => res.json())
        .then(data => {
          setDados(data);
        })
        .catch(error => {
          console.log(error);
        });
    }
      useEffect(() => {
          fetch_init()
     },[])
    function vote(id, userId, x) {
      fetch("https://interactive-comments-section-main-70m9.onrender.com/comments/vote",{
        method:"put",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({id, userId,x})
      })
      .then(res=> res.json())
      .then(() =>{
        fetch_init()
      })
      .catch(err =>{
        console.log(err)
      })
    }
    function update(id, text) {
       fetch('https://interactive-comments-section-main-70m9.onrender.com/comments/updade',{
          method:'put',
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify({
            id, text
          })
        }).then(res=> res.json())
        .then(()=>{
          fetch_init()
          setEditForm(null)
        })
          .catch(erro =>{
            console.log("erro")
          })
    }
    function print(content,replying_to =null,parent_id =null,user_id) {

      fetch('https://interactive-comments-section-main-70m9.onrender.com/comments/dados',{
        method:'post',
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          content, replying_to,parent_id,user_id
        })
      }).then(res=> res.json())
      .then(()=>{
        fetch_init()
         setReplying(null);
          setReplyingToId(null);
      })
      .catch(err =>{
        console.log(err)
      })
    }

    

  return (
    <div className="App">
      {
        component_delete &&(
          <Delete 
            onCancel={() => setComponent_delete(false)}
            component_id={()=> {
              fetch('https://interactive-comments-section-main-70m9.onrender.com/comments/delete', {
                  method:"delete",
                  headers:{"Content-Type":"application/json"},
                  body: JSON.stringify({
                   id_comment: idComponent_delete
                  })}
              )
              .then(res => res.json())
              .then(resul =>{
                fetch_init()
                setComponent_delete(false); 
              })
              .catch(err =>{
                console.log("erro ao deletar")
              })
          }} 
          />
        )
      }
      <main>
       {
          dados?(
            dados.map(comment =>(  
           <Comment  
            key={comment?.id} 
            comment={comment} 
            actions={commentActions}
          >
            {
             comment.replies && 
             comment.replies.map(reply => (
              <Comment 
                key={reply?.id} 
                comment={reply} 
                actions={commentActions} 
                />
              ))}
              
            </Comment>
            ))
          ):
        (<p>Carregando</p>)
        }
      </main>
      <Form buttonName={"Send"} func={(text) => print(text, replying,replyingToId,1)}/>

      <footer> 
        <p>Challenge by <a href="https://www.frontendmentor.io/profile/laisTalita"target="_blank">Frontend Mentor</a>. Coded by <a href="https://github.com/laisTalita"target="_blank">Lais Talita</a>.</p> 
      </footer>
    </div>
  );
}

export default App;
