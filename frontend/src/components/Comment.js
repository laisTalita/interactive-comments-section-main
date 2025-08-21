import './comment.css'
import { act, useState } from 'react';
import Form from './Form'
import EditForm from './EditForm';
function Comment({comment,children,actions}) {
    
const { id, content, score, timeAgo, replying_to, user, parent_id } = comment;

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
                                <p className='inline'>
                                  <span className='span_repling'>@{replying_to} </span>{content}
                                </p>
                            ) 
                            :(content)
                            }
                            </>
                        )} 
                    </div>
                </div>
                <div className='order'>
                    <button className='plus_less'  aria-label="Increment score" onClick={()=> actions.vote(id , user.id,"up")}>
                        <img src='./images/icon-plus.svg' alt=""/>
                    </button>
                    <span className='likes'>{score}</span>

                    <button className='plus_less' aria-label="Decrement score" onClick={()=> actions.vote(id,user.id,"down")}>
                        <img src='./images/icon-minus.svg' alt=""/>
                    </button>
                </div>
            {
                user.id !== 1 ? (
                    <button  className='reply noJuli' aria-label="Reply to.."  
                    onClick={()=>{
                        actions.setReplying(user.username);
                        actions.setReplyingToId(parent_id || id);
                    }}>
                    <img src='./images/icon-reply.svg' alt=""/> <p>Reply</p>
                    </button>
                ):
                (
                <div className='delete_alter reply'>
                    <button aria-label="Delete comment" onClick={()=> {
                        actions.setComponent_delete(true);
                        actions.setIdComponent_delete(id)
                    }} >
                        <img src='./images/icon-delete.svg' alt=""/><p>Delete</p>
                    </button>
                    <button aria-label="Alter comment" onClick={()=>{
                        actions.setEditForm(id)
                    }}>
                        <img src='./images/icon-edit.svg' alt=""/><p>Edit</p>
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
