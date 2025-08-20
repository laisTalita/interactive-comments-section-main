import { useEffect, useState } from 'react'
import './EditForm.css'
function EditForm({func,id, content}) {
   
const [text,setText] = useState('')


useEffect(()=>{
    setText(content)
},[content])
 
    return(
    <form action="" id='form_update' onSubmit={(e)=>{ e.preventDefault(); func(id,text)}}>
        <textarea value={text} onChange={e =>
            setText(e.target.value)
        }> </textarea> 
        <button type="submit">update</button>
    </form>
)
}export default EditForm