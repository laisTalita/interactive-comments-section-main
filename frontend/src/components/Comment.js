import './comment.css'
import { act, useState } from 'react';
import Form from './Form'
import EditForm from './EditForm';
function Comment({comment,children,actions}) {
    
const { id, content, score, timeAgo, replying_to, user, parent_id } = comment;

function scores(x) {
    let newVote = x
    if (actions.votes === x){
         newVote = null
    }
    actions.setVotes(newVote)
  actions.vote(id ,user.id,votes)
}
    return(
    <>
        <div className='const_comments'>
            <section  className='comment sec_comment'>
                <div className='container_pri'>
                    <div className='flex'>
                        <img src={user.avatar_url} alt={user.username}/>
                        <p className='name'>{user.username}</p>
                        {
                            user.id ===1?
                            (<p className='you'>you</p>):
                            (<span></span>)
                        }
                        <p className='text'>{timeAgo}</p>
                    </div>
                    <div className='text comment_p'>
                        {actions.editForm ===id?
                        (
                        <EditForm func={actions.update} 
                        id={id} content={content} 
                        />
                        ):(
                        <>
                        {replying_to ?(
                            <>
                                <span className='span_repling'>
                                    @{replying_to}
                                </span>
                                <p className='inline'>{content}</p>
                            </>
                        ) 
                        :(content)
                        }
                        </>
                        )} 
                    </div>
                </div>
                <div className='order'>
                    <button className='plus_less' onClick={()=>scores('up')}>
                        <img src='./images/icon-plus.svg'/>
                    </button>
                    <span className='likes'>{score}</span>

                    <button className='plus_less' onClick={()=>scores('down')}>
                        <img src='./images/icon-minus.svg'/>
                    </button>
                </div>
            {
                user.id !== 1 ? (
                    <button className='reply noJuli' 
                    onClick={()=>{
                        actions.setReplying(user.username);
                        actions.setReplyingToId(parent_id || id);
                    }}>
                    <img src='./images/icon-reply.svg'/> <p>Reply</p>
                    </button>
                ):
                (
                <div className='delete_alter reply'>
                    <button onClick={()=> {
                        actions.setComponent_delete(true);
                        actions.setIdComponent_delete(id)
                    }} >
                        <img src='./images/icon-delete.svg'/><p>Delete</p>
                    </button>
                    <button onClick={()=>{
                        actions.setEditForm(id)
                    }}>
                        <img src='./images/icon-edit.svg' /><p>Edit</p>
                    </button>
                </div>
                )
             }
            </section>
            {children &&
            <div className='start_replies'>
                <div className="line_wrapper">
                <div id='line'></div>
                </div>
                <div className="replies">
                    {children}
                </div>
            </div>
            }
        </div>
         {actions.replyingToId === id && (
            <Form className="form_reply" 
            func={(text)=> actions.print(text, actions.replying, actions.replyingToId, 1)}
            buttonName={"Reply"} name={actions.replying}/>
          )
        }
    </>
    )
}
export default Comment