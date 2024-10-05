import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

const firebaseConfig = {
    apiKey: import.meta.env.FIREBASE_APIKEY,
    authDomain: import.meta.env.FIREBASE_AUTHDOMAIN,
    projectId: import.meta.env.FIREBASE_PROJECTID,
    storageBucket: import.meta.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.FIREBASE_MESSAGINGSENDERID,
    appId: import.meta.env.FIREBASE_APPID
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
        }).catch((error) => {
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
}

export const logOut = () => signOut(auth)

export const useDestinations = () => {
    const [state, setState] = useState({
        loading: true,
        error: null,
        data: null
    });

    useEffect(() => {
        getDocs(collection(database, "destinations")).then((value) => {
            setState({
                loading: false,
                error: null,
                data: value.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            });
        }).catch((err) => {
            console.error(err);
            setState({
                loading: false,
                error: err.message,
                data: null
            })
        });
    }, []);

    return state;
}