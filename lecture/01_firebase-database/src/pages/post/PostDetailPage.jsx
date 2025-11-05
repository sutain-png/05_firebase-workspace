import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPost } from "../../services/postService";
import PostItem from "../../components/post/PostItem";

const PostDetailPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBackToList = () => {
    navigate("/posts");
  };

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);

      const post = await getPost(id);
      setPost(post);
      // return await getPost(id);
      console.log(post);
      setLoading(false);
    };

    fetchPost();
  }, []);

  return (
    <div>
      <h2>게시글 상세</h2>
      {loading ? <div>로딩중...</div> : <PostItem post={post} mode="detail" />}
      <button onClick={handleBackToList}>목록으로</button>
    </div>
  );
};

export default PostDetailPage;
