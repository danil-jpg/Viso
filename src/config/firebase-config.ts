import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBJzLJPwp2YHKTx4mAbqs2AMtzKbqaf7PY',
    authDomain: 'viso-c7b15.firebaseapp.com',
    databaseURL: 'https://viso-c7b15-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'viso-c7b15',
    storageBucket: 'viso-c7b15.appspot.com',
    messagingSenderId: '585180504201',
    appId: '1:585180504201:web:1b355d2cab88ad96336658',
};

const app = initializeApp(firebaseConfig);

export const DB = getFirestore(app);
