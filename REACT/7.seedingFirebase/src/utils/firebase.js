import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  writeBatch,
  serverTimestamp,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3jIjqE3tmuipMnBoSGAzn9iSZ7oN5w-M",
  authDomain: "movida2-dfb5b.firebaseapp.com",
  projectId: "movida2-dfb5b",
  storageBucket: "movida2-dfb5b.firebasestorage.app",
  messagingSenderId: "187963468439",
  appId: "1:187963468439:web:e98896cdc6fa988f5297d2",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();

export const db = getFirestore();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  try {
    if (!email || !password) return;
    const response = await signInWithEmailAndPassword(auth, email, password);
    const user = response.user;

    const userData = await getUser(user.uid);
    return userData;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
};

export const getUser = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData;
    }
  } catch (error) {
    console.error(error);
  }
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { email, displayName } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userDocRef;
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.id);
    batch.set(docRef, { ...object, createdAt: serverTimestamp() });
  });

  await batch.commit();
  console.log(`Documentos de ${collectionKey} añadidos ✅`);
};

export const getCategories = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  const categories = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return categories;
};

export const getProductsByCategory = async (categoryId) => {
  const productsRef = collection(db, "products");
  const q = query(productsRef, where("categoryId", "==", categoryId));
  const querySnapshot = await getDocs(q);

  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });

  return products;
};

export const getProductById = async (id) => {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() };
  return null;
};

export const updateProduct = async (id, data) => {
  const docRef = doc(db, "products", id);
  await updateDoc(docRef, data);
};

export const deleteProduct = async (id) => {
  const docRef = doc(db, "products", id);
  await deleteDoc(docRef);
};
