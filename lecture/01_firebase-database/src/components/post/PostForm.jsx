import React, { useState } from "react";
import { createPost, updatePost } from "../../services/postService";
import { useNavigate } from "react-router-dom";

const PostForm = ({ mode, initialForm }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleFormDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handlePostSubmit = async () => {
    if (!formData.title || !formData.content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    if (mode === "create") {
      await createPost(formData);
      navigate("/posts");
    } else if (mode === "edit") {
      await updatePost(initialForm.id, formData);
      navigate(`/posts/${initialForm.id}`);
    }
  };

  return (
    <form action={handlePostSubmit}>
      <input
        type="text"
        id="title"
        placeholder="제목"
        value={formData.title}
        onChange={handleFormDataChange}
      />
      <br />
      <textarea
        id="content"
        placeholder="내용"
        value={formData.content}
        onChange={handleFormDataChange}
      />
      <br />
      <button type="submit">
        {mode === "create" ? "등록하기" : "수정하기"}
      </button>
    </form>
  );
};

export default PostForm;
