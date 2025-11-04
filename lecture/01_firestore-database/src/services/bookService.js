import { addDoc, collection, deleteDoc, deleteField, doc, getDoc, getDocs, increment, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config.js";

// console.log(db)

//도서 관련 데이터 CRUD
/*
books(컬렉션) [
문서(document) { 
  title: 'xxx',     // 필드(Filed)
  author: 'xxx,     // 필드(Filed)
  price: xx,        // 필드(Filed)
  createAt: new Date()
  }, 
문서(document) {
  title: 'xxx',     // 필드(Filed)
  author: 'xxx,     // 필드(Filed)
  price: xx,        // 필드(Filed)
  createAt: new Date()
  }, 
문서(document) {
  title: 'xxx',     // 필드(Filed)
  author: 'xxx,     // 필드(Filed)
  price: xx,        // 필드(Filed)
  createAt: new Date()
  }, 


]
*/

// 1) 새로운 문서 추가(addDoc, collection)

// async function addBook () {
//   // Firestore 측에서 신규로 추가된 doc객체의 고유 ID 생성
//   const docRef = await addDoc(collection(db, "books"), {
//     title: "firebase의 모든것",
//     author: "모닥불",
//     price: 10000,
//     createAt: new Date()
//   })

//   console.log('추가 완료된 도서의 고유 ID 식별자:', docRef.id);

// }

// // addBook()

// // 2) 새로운 도서(문서) 추가 (setDoc, doc)
// const addBook = async () => {
// // 직접 고유 ID 지정하고 싶을 떄
// await setDoc(doc(db, "books", "bk_001"), {
//   title: '리엑트의 못드것',
//   author: '조코팅',
//   price: 20000,
//   createAt: new Date()
// })

// }
// addBook();

// 3) 문서 조회 - 전체 문서 조회(getDocs, collection)
// const getBooks = async () => {
//   const querySnap = await getDocs(collection(db, "books"));

  // console.log('조회된 문서(도서) 개수', querySnap.size);
  // console.log('조회된 문서가 비어있는지', querySnap.empty);
  // console.log('조회된 문서 목록(배열):', querySnap.docs)

  // querySnap.docs.forEach((doc) => console.log(doc.id, doc.data()));

//   const books = querySnap.docs.map((doc) => {
//     return {
//       id: doc.id,
//       ...doc.data(),
//     };
//   });
//   // console.log(books)
//   console.table(books);
// };

// getBooks();


// // 4) 문서 조회 - 단일 문서 가져오기 ()
// const getBook = async (bookId) => {
//   const docSanp = await getDoc(doc(db, "books", bookId));

//   if(docSanp.exists()) {
//     console.log(docSanp.id);
//     console.log(docSnap.data());
//     console.log(docSnap.get('title'));
//   }else {
//     console.log('조회결과가 없습니다. ID를 확인해주세요')
//   }

// }

// getBook('Pw0WiVp7YomxSNQTmfIr');


// 5) 문서 수정(updateDoc. doc)
// // bookId를 인자로 받도록 수정
// const updateBook = async (bookId) => { 
//   // doc() 호출을 닫고, 쉼표로 필드 객체를 분리
//   await updateDoc(doc(db, "books", bookId), { 
//     title: '수정 테스트',
//     author: deleteField(),
//     price: increment(5000),
//     createAt: serverTimestamp() // 서버 시간 설정 원할 때
//   });
//   console.log(`문서 ID: ${bookId} 수정 완료.`);
// };

// updateBook('zwW0IXbJ0IiyulLWukm3');



// 6) 문서 삭제 (deleteDoc, doc)
const deleteBook = async (bookId) => {
  await deleteDoc(doc(db, "books", bookId ));

}

deleteBook('zwW0IXbJ0IiyulLWukm3');