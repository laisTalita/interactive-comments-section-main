import './Form.css'
import { useEffect,useState } from 'react'

function Form({buttonName,name,func}) {

    const[text,setText] = useState('')
    useEffect(()=>{
        if (name) {
        setText(`@${name}`)
        }
    },[name])
    
    function submit_Comment(e) {
        e.preventDefault()
        func(text)
        setText("")
    }
    return(
    <section className='form_section'>
        <div className='text_comment'>
            <form id='commentForm' className='form' onSubmit={submit_Comment} action="" >
            < textarea onChange={e => setText(e.target.value)} 
                placeholder= { text ? text :"Add a comment..."}
            ></textarea>
            </form>
            <img src='./images/avatars/image-juliusomo.png'/>
            <button form="commentForm" className='button_form' type='submit'>{buttonName}</button>
        </div>
    </section>
    )
} export default Form 