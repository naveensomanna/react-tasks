import { comments } from "./data";
import "./App.css";
import Comment from "./Comment";
import { useState } from "react";
import { generateId } from "./utils";

export default function App() {
  const [data, setData] = useState([...comments]);

  const addComments = (parentId, text) => {
    const newMessage = {
      id: generateId(),
      name: "",
      comment: text,
      replies: [],
    };
    if (parentId === null) {
      setData([...data, newMessage]);
    } else {
      const parentCommentId = findParentComment(parentId);
      parentCommentId.replies.push(newMessage);
      setData([...data]);
    }
  };

  const findParentComment = (parentId, commts = data) => {
    const cloned = [...commts];
    for (let x of cloned) {
      if (x.id === parentId) {
        return x;
      } else {
        const foundInReplies = findParentComment(parentId, x.replies);
        if (foundInReplies) {
          return foundInReplies;
        }
      }
    }
    return null;
  };

  const handeRemove = (id) => {
    const updated=handleFindUpdate(id);
    setData(updated)
  };
  const handleFindUpdate = (id, dd = data) => {
    let cloned = [...dd];

    for (let x of cloned) {
      if (x.id === id) {
        cloned = cloned.filter((c) => c.id !== id);
      } else {
        x.replies= handleFindUpdate(id, x.replies);
      }
    }
    return cloned;
  };
  

  return (
    <section>
      <h1>Comments</h1>
      <ul className="comments">
        <Comt
          data={data}
          addComments={addComments}
          handleRemove={handeRemove}
        />
      </ul>
    </section>
  );
}

function Comt({ data, addComments, handleRemove }) {
  const [showReplies, setShowReplies] = useState("");

  const handleShowReplies = (id) => {
    if (showReplies === id) {
      setShowReplies("");
    } else {
      setShowReplies(id);
    }
  };

  return (
    <>
      {data.map((comment) => (
        <div key={comment.id} className="comment">
          <Comment
            comment={comment}
            addComments={addComments}
            handleRemove={handleRemove}
          />
          {comment.replies.length > 0 && (
            <a onClick={() => handleShowReplies(comment.id)}>
              {comment.replies.length} replies
            </a>
          )}
          {showReplies === comment.id && (
            <Comt
              data={comment.replies}
              addComments={addComments}
              handleRemove={handleRemove}
            />
          )}
        </div>
      ))}
    </>
  );
}
