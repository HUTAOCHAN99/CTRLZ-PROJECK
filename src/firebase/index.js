import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where, addDoc, getDoc, doc, setDoc, deleteDoc, FieldValue, increment, updateDoc, runTransaction, orderBy, limit } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
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
const storage = getStorage(app)
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

const usePendingData = (func, mapper) => {
    const [state, setState] = useState({
        loading: true,
        error: null,
        data: null
    });

    const refresh = () => {
        func().then((value) => {
            setState({
                loading: false,
                error: null,
                data: mapper(value)
            });
        }).catch((err) => {
            console.error(err);
            setState({
                loading: false,
                error: err.message,
                data: null
            })
        });
    }

    useEffect(() => {
        refresh();
    }, []);

    return { state, refresh };
}

const useDocInternal = (doc) => {
    return usePendingData(() => getDoc(doc), (value) => ({ id: value.id, ...value.data() }));
}

const useDoc = (doc) => {
    return useDocInternal(doc).state
}

const useDocsInternal = (query) => {
    return usePendingData(() => getDocs(query), (value) => value.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
}


const useDocs = (query) => {
    return useDocsInternal(query).state
}

export const useDestinations = () => {
    return useDocs(destinationsRef);
}

export const useTopDestinations = () => {
    return useDocs(query(destinationsRef, orderBy("numRating", "desc"), orderBy("avgRating", "desc"), limit(3)))
}

export const useDestinationById = (id) => {
    return useDoc(doc(database, "destinations", id));
}

export const incrementDestinationVisitCount = (id) => {
    return updateDoc(doc(destinationsRef, id), {
        visitCount: increment(1)
    });
}

const getReviewDocRef = (id) => doc(destinationsRef, id, "reviews", auth.currentUser.uid)

export const useDestinationUserRating = (id) => {
    return useDocInternal(getReviewDocRef(id))
}

export const useSubmitRating = (id) => {
    return useAction(async (data) => {
        await runTransaction(database, async (transaction) => {
            const destinationDoc = (await transaction.get(doc(destinationsRef, id))).data();

            let numRating = destinationDoc.numRating ? destinationDoc.numRating : 0;
            let sumRating = destinationDoc.sumRating ? destinationDoc.sumRating : 0;

            const oldRatingDoc = await transaction.get(getReviewDocRef(id));

            if (oldRatingDoc.exists()) {
                const doc = oldRatingDoc.data();

                if (doc.rating) {
                    numRating--;
                    sumRating -= doc.rating;
                }
            }

            numRating++;
            sumRating += data.rating;
            await transaction.set(doc(destinationsRef, id), { numRating, sumRating, avgRating: sumRating / numRating }, {merge: true});
            await transaction.set(getReviewDocRef(id), data, { merge: true })
        });
    })
}

export const useMyDestination = () => {
    return useDocs(query(destinationsRef, where("userUid", "==", auth.currentUser.uid)));
}

const useAction = (action) => {
    const [isLoading, setIsLoading] = useState(false);

    const runAction = async (data) => {
        if (isLoading) return { success: false };

        setIsLoading(true);
        try {
            const res = await action(data);
            setIsLoading(false);
            return {
                success: true,
                data: res
            }
        } catch (e) {
            console.error(e);
            setIsLoading(false);
            return {
                success: false,
                error: e
            }
        }
    }

    return {
        isLoading,
        runAction
    }
}

export const useAddDestination = () => {
    const { isLoading, runAction } = useAction(async (data) => {
        const currentUser = auth.currentUser;
        if (!currentUser) throw new Error("Not logged in");

        return await addDoc(destinationsRef, {
            ...data,
            userUid: currentUser.uid
        })
    }
    )
    return {
        isLoading,
        addDestination: runAction
    }
}

export const useEditDestination = () => {
    const { isLoading, runAction } = useAction(async ({ id, data }) => {
        return await setDoc(doc(database, "destinations", id), data, { merge: true });
    })
    return {
        isLoading,
        editDestination: runAction
    }
};

export function useDeleteDestination(id) {
    const { isLoading, runAction } = useAction(async () => {
        return await deleteDoc(doc(database, "destinations", id));
    })
    return {
        isLoading,
        deleteDestination: runAction
    }
}

const destinationStorageRef = ref(storage, "destinations");

const getDestinationImageRef = (id) => ref(destinationStorageRef, `${id}/image`);

export const useUploadDestinationImage = (id) => {
    const { isLoading, runAction } = useAction(async (file) => {
        return await uploadBytes(getDestinationImageRef(id), file);
    })
    return {
        isLoading,
        uploadDestinationImage: runAction
    }
}

export const useDestinationImageUrl = (id) => {
    const { state, refresh } = usePendingData(async () => {
        try {
            return await getDownloadURL(getDestinationImageRef(id));
        } catch (error) {
            if (error.code == 'storage/object-not-found') {
                return null;
            }
            throw error;
        }
    }, (doc) => doc)

    return {
        url: state,
        refresh
    }
}

const getPanoramasRef = (destinationId) => collection(doc(database, "destinations", destinationId), "panoramas")
const getPanoramasImageRef = (destinationId, panoramaId) => ref(destinationStorageRef, `${destinationId}/panoramas/${panoramaId}`)

export function useDestinationsPanorama(id) {
    return useDocsInternal(getPanoramasRef(id));
}

export const useAddDestinationsPanorama = (id) => {
    const { isLoading, runAction } = useAction(async ({ name, image }) => {
        const currentUser = auth.currentUser;
        if (!currentUser) throw new Error("Not logged in");

        const { id: panoramaId } = await addDoc(getPanoramasRef(id), {
            name
        })
        return await uploadBytes(getPanoramasImageRef(id, panoramaId), image)
    }
    )
    return {
        isLoading,
        addPanorama: runAction
    }
}

export const useEditDestinationsPanorama = (id, panoramaId) => {
    const { isLoading, runAction } = useAction(async ({ name, image }) => {
        const currentUser = auth.currentUser;
        if (!currentUser) throw new Error("Not logged in");

        await setDoc(doc(getPanoramasRef(id), panoramaId), {
            name
        }, { merge: true })
        if (image != null) {
            return await uploadBytes(getPanoramasImageRef(id, panoramaId), image);
        }
    }
    )
    return {
        isLoading,
        editPanorama: runAction
    }
}

export function useDestinationPanoramaUrl(destinationId, panoramaId) {
    const { state, refresh } = usePendingData(async () => {
        try {
            return await getDownloadURL(getPanoramasImageRef(destinationId, panoramaId));
        } catch (error) {
            if (error.code == 'storage/object-not-found') {
                return null;
            }
            throw error;
        }
    }, (doc) => doc)

    return {
        url: state,
        refresh
    }
}

export function useDeleteDestionationPanorama(destinationId, panoramaId) {
    const { isLoading, runAction } = useAction(async () => {
        return deleteDoc(doc(getPanoramasRef(destinationId), panoramaId));
    })

    return {
        isLoading,
        deletePanorama: runAction
    }
}