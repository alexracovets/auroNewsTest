import { firestore } from '../firebase';

const firestoreRef = (path) => {
    return firestore.ref(path);
};
export default firestoreRef;