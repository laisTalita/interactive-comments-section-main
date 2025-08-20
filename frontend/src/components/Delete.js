import './Delete.css'
function Delete({onCancel,component_id}) {
    return(
        <section className='modal_delete'>
            <div className="confirm_modal">
                <h2>Delete comment</h2>
                <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                <div className='flex_buttons'>
                    <button onClick={onCancel} >no, cancel</button>
                    <button onClick={component_id} className='but_delete'>yes, delete
                    </button>
                </div>
            </div>
        </section>
    )
} 
export default Delete