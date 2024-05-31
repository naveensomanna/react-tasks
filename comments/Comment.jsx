import { useState } from "react";
import Reply from "./Reply";
import stc from 'string-to-color';


export default function Comment({ comment,addComments,handleRemove }) {
  const [isReply, setIsReply] = useState(false);

  const handleShowReply = () => {
    setIsReply(true);
  };


  const handleCancelReply=()=>{
    setIsReply(false)
  }
  return (
    <li>
      <div className="user-detail">
      <div style={{background:stc(comment.name)}} className="profile">
      {comment.name[0]}
      </div>
      <div>
      <h3>{comment.name}</h3>
      <p>{comment.comment}</p>
      <p onClick={handleShowReply} className="reply">Reply</p>
      <div>
        {isReply && <Reply id={comment.id} handleCancelReply={handleCancelReply} addComments={addComments}/>}
      </div>
      </div>
      </div>
      <i class="material-icons" onClick={()=>handleRemove(comment.id)}>delete</i>
    </li>
  );
}
