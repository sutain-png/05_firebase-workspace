import { Timestamp } from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../../services/postService";

// 한 게시글 정보를 표현하는 컴포넌트
//
// props 정의
// {
//   post: {
//     id: string;
//     title: string;
//     content: string;
//     createdAt: Timestamp;
//   }
//  mode: string // 'list' | 'detail'
// }

/**
 *
 * @param {object} post
 * @param {string} mode
 * @returns
 */
const PostItem = ({ post, mode }) => {
  const navigate = useNavigate();

  const handlePostClick = () => {
    if (mode === "list") {
      // /post/해당게시판ID
      navigate(`/posts/${post.id}`);
    }
  };

  const handlePostDeleteClick = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      (async () => {
        const isDeleted = await deletePost(post.id);

        if (isDeleted) {
          navigate("/posts");
          alert("삭제되었습니다.");
        } else {
          alert("삭제에 실패했습니다.");
        }
      })();
    }
  };

  const style = {
    border: "2px solid gray",
    margin: "10px",
    padding: "10px",
    cursor: mode === "list" ? "pointer" : "default",
    borderRadius: "5px",
  };

  return (
    <div style={style} onClick={handlePostClick}>
      {post.title}
      {mode === "list" && `(${post.createdAt.toDate().toLocaleString()})`}
      {mode === "detail" && (
        <>
          <p>{post.content}</p>
          <button>수정</button>
          <button onClick={handlePostDeleteClick}>삭제</button>
        </>
      )}
    </div>
  );
};

export default PostItem;
