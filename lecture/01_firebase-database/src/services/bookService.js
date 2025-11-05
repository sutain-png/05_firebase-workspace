import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config.js";

// 도서 관련 페이지 DRUD
// console.log(db);

// 도서 관련 데이터 CRUD
// books(컬렉션, collection) [
// 	문서(document) [
// 			title: 'xxx',
// 			author: 'xxx',
// 			price: xx
// 	],
// 	문서(document) [
// 			title: 'xxx',
// 			author: 'xxx',
// 			price: xx
// 	],
// 	문서(document) [
// 			title: 'xxx',
// 			author: 'xxx',
// 			price: xx
// 	],
// ]

// 1) 새로운 도서(document, 문서) 추가 (addDoc, collection)
async function addBook1({ title, author, price }) {
  const docRef = await addDoc(collection(db, "books"), {
    title: title,
    author: author,
    price: price,
    createdAt: Date.now(),
  });

  console.log("Document written with ID: ", docRef.id);
}

// await addBook1({
//   title: "혼자 공부하는 자바스크립트",
//   author: "김옥지",
//   price: 18000,
// });

// 2) 새로운 도서(문서) 추가 (setDoc, doc)
const addBook2 = async ({ title, author, price }) => {
  await setDoc(doc(db, "books", "bk_001"), {
    title: title,
    author: author,
    price: price,
    createdAt: Date.now(),
  });
};

// addBook2({
//   title: "리액트를 다루는 기술",
//   author: "김민준",
//   price: 25000,
// });

// 3) 문서 조회 - 전체 문서 조회 (getDocs, collection)
const getBooks = async () => {
  const querySnap = await getDocs(collection(db, "books"));

  // console.log("조회된 문서(도서) 개수:", querySnap.size);
  // console.log("조회된 문서가 비어있는지:", querySnap.empty);
  // // console.log("조회된 문서 목록(배열):", querySnap.docs);

  // querySnap.forEach((doc) => {
  //   console.log(doc.id, "=>", doc.data());
  // });

  const books = querySnap.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });

  console.log(books);
};

// await getBooks();

// 4) 문서 조회 - 단일 문서 가져오기(getDoc, doc)
const getBook = async (id) => {
  const docSnap = await getDoc(doc(db, "books", id));

  if (!docSnap.exists()) {
    console.log("해당 도서 없음");
    return;
  }

  console.log("조회된 도서:", { id: docSnap.id, ...docSnap.data() });
};
// getBook("bk_001");

// 5) 문서 수정 (updateDoc, doc)
const updateBook = async (id, updateData) => {
  try {
    const docRef = doc(db, "books", id);

    await updateDoc(docRef, updateData);

    console.log("도서 정보 수정 완료");
  } catch {
    console.log("도서 정보 수정 실패");
  }
};
// updateBook("bk_001", {
//   title: "리액트를 다루는 기술 - 수정본",
//   author: deleteField(),
//   price: increment(5000),
//   createdAt: serverTimestamp(),
// });
// getBook("bk_001");

const deleteBook = async (id) => {
  try {
    await deleteDoc(doc(db, "books", id));
    console.log("도서 삭제 완료");
  } catch {
    console.log("도서 삭제 실패");
  }
};
deleteBook("bk_001");
getBook("bk_001");
