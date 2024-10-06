import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from "firebase-admin/auth"
import credential from "../admin-sdk-config.json" with {type: "json"};

if (process.argv.length < 3) {
    console.log("Invalid args");
    process.exit(-1);
}

const app = initializeApp({
    credential: cert(credential)
});
const auth = getAuth(app);

auth.getUserByEmail(process.argv[2]).then((value) => {
    return auth.setCustomUserClaims(value.uid, { admin: true })
}).then(() => {
    console.log("Success");
})