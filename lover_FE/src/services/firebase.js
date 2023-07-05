import { initializeApp } from "@firebase/app";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
    // Thêm cấu hình Firebase của bạn ở đây
    apiKey: "AIzaSyCsLtfXRnMh36DyM2C6y5ffdTXaKZAM4-I",
    authDomain: "quang-7e2eb.firebaseapp.com",
    projectId: "quang-7e2eb",
    storageBucket: "quang-7e2eb.appspot.com",
    messagingSenderId: "432810140051",
    appId: "1:432810140051:web:a71ad866b6445a6d394866",
    measurementId: "G-FX66SEMWHZ"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };