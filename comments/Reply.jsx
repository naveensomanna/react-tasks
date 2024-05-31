import { useState } from "react";

export default function Reply({ id, handleCancelReply ,addComments}) {
  const [reply, setReply] = useState("");

  const handleClickReply = (parentId) => {
    addComments(parentId,reply)
    handleCancelReply()
  };
  return (
    <div>
      <input
        type="text"
        placeholder="reply"
        onChange={(e) => setReply(e.target.value)}
        value={reply}
      />
      <button onClick={handleCancelReply}>Cancel</button>
      <button onClick={() => handleClickReply(id)}>Reply</button>
    </div>
  );
}
