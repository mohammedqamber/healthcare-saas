import { User } from "@/types";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword as firebaseCreateUser,
  updateProfile,
  User as FirebaseUser,
  signInWithEmailAndPassword as firebaseSignIn,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  sendPasswordResetEmail as firebaseSendPasswordReset,
} from "firebase/auth";

//firebase config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Convert Firebase User to my app's User type
function mapFirebaseUser(fbUser: FirebaseUser | null): User | null {
  if (!fbUser) return null;
  return {
    uid: fbUser.uid,
    email: fbUser.email,
    displayName: fbUser.displayName,
    photoURL: fbUser.photoURL,
  };
}

// APIs

export async function createUserWithEmailAndPassword(
  email: string,
  password: string,
): Promise<{ user: User }> {
  const userCredential = await firebaseCreateUser(auth, email, password);

  // Set display name from email prefix (optional)
  await updateProfile(userCredential.user, {
    displayName: email.split("@")[0],
  });

  return { user: mapFirebaseUser(userCredential.user)! };
}

export async function signInWithEmailAndPassword(
  email: string,
  password: string,
): Promise<{ user: User }> {
  const userCredential = await firebaseSignIn(auth, email, password);
  return { user: mapFirebaseUser(userCredential.user)! };
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

export function onAuthStateChanged(
  callback: (user: User | null) => void,
): () => void {
  return firebaseOnAuthStateChanged(auth, (fbUser) => {
    callback(mapFirebaseUser(fbUser));
  });
}

export function getCurrentUser(): User | null {
  return mapFirebaseUser(auth.currentUser);
}

export async function sendPasswordResetEmail(email: string): Promise<void> {
  await firebaseSendPasswordReset(auth, email);
}
