import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where, addDoc } from "firebase/firestore";
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

const destinationsRef = collection(database, "destinations");

const useDocs = (query) => {
    const [state, setState] = useState({
        loading: true,
        error: null,
        data: null
    });

    useEffect(() => {
        getDocs(query).then((value) => {
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

export const useDestinations = () => {
    return useDocs(destinationsRef);
}

export const useMyDestination = () => {
    return useDocs(query(destinationsRef, where("userUid", "==", auth.currentUser.uid)));
}

export const useAddDestination = () => {
    const [isLoading, setIsLoading] = useState(false);

    const addDestination = async (data) => {
        if (isLoading) return { success: false };
        const currentUser = auth.currentUser;
        if (!currentUser) return { success: false, error: new Error("Not logged in") };

        setIsLoading(true);
        try {
            const res = await addDoc(destinationsRef, {
                ...data,
                userUid: currentUser.uid
            })
            return {
                success: true,
                data: res
            }
        } catch (e) {
            setIsLoading(false);
            return {
                success: false,
                error: e
            }
        }
    }

    return {
        isLoading,
        addDestination
    }
}