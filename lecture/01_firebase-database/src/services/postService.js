import { db } from "../firebase/config.js";
import {
  doc,
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

// 게시글 CRUD

// posts [
// 	{
// 		title: 'xxx',
// 		content: 'xxx',
// 		createdAt: Timestamp
// 	}
// ]

// 현재 서비스의 컬렉션명을 상수화
const COLLECTION_NAME = "posts";

// 각 기능별 함수 정의
/**
 * 신규 게시글을 등록하는 함수
 * @param {Object} postData - 등록할 게시글 데이터 {title, content}
 * @return {string} 생성된 게시글 고유 ID
 */
const createPost = async (postData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...postData,
      createdAt: serverTimestamp(),
    });

    return docRef;
  } catch (error) {
    console.log("Error adding document: ", error);
    throw error;
  }
};

/**
 * 전체 게시글 목록을 조회하는 함수
 * @returns {Array} 조회된 게시글 배열 (각 게시글 객체에 ID 포함)
 */
const getPosts = async () => {
  try {
    // 조회
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = (await getDocs(q)).docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    // 가공된 데이터 반환
    return querySnapshot;
  } catch (error) {
    console.log("게시글 목록 조회 오류");
    throw error;
  }
};

/**
 * 단일 게시글을 조회하는 함수
 * @param {string} postId - 조회할 게시글의 고유 ID
 * @returns {Object} 조회된 게시글 객체 (ID 포함)
 */
const getPost = async (postId) => {
  try {
    const docSnapshot = await getDoc(doc(db, COLLECTION_NAME, postId));

    if (!docSnapshot.exists()) {
      throw new Error("해당 ID의 게시글이 존재하지 않습니다.");
    }

    return { id: docSnapshot.id, ...docSnapshot.data() };
  } catch (error) {
    console.log("게시글 단일 조회 오류");
    throw error;
  }
};

/**
 * 특정 게시글 수정하는 함수
 * @param {string} postId 수정할 게시글 고유 ID
 * @param {Object} postData 수정할 게시글 데이터 {title, content}
 */
const updatePost = async (postId, postData) => {
  try {
    await updateDoc(doc(db, COLLECTION_NAME, postId), {
      ...postData,
    });

    console.log("게시글 수정 완료");
  } catch (error) {
    console.log("게시글 수정 오류");
    throw error;
  }
};

/**
 * 특정 게시글을 삭제하는 함수
 * @param {string} postId 삭제할 게시글 고유 ID
 */
const deletePost = async (postId) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, postId));
    console.log("게시글 삭제 완료");

    return true;
  } catch {
    console.log("게시글 삭제 오류");

    return false;
  }
};

export { createPost, getPosts, getPost, updatePost, deletePost };
