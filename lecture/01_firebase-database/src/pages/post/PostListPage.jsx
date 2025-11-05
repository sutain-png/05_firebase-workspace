import React, { useEffect, useState } from "react";
import PostItem from "../../components/post/PostItem";
import { getPosts } from "../../services/postService";
import { useNavigate } from "react-router-dom";

const PostListPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      const posts = await getPosts();

      setPosts(posts);
    };

    fetchPosts();

    setLoading(false);
  }, []);

  return (
    <div>
      <h2>게시글 목록</h2>
      <button onClick={() => navigate("/posts/new")}>게시글 등록</button>
      <div>
        {loading ? (
          <div>로딩중...</div>
        ) : (
          posts.map((post) => (
            <PostItem key={post.id} post={post} mode="list" />
          ))
        )}
      </div>
    </div>
  );
};

export default PostListPage;
