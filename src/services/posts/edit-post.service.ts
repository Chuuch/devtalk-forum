import { get, ref, update } from "firebase/database"
import { auth, db } from "../../config/firebase-config"
import moment from "moment";
import toast from "react-hot-toast";

export const editPost = async (postId: string, title: string, content: string) => {
    const postRef = ref(db, `posts/${postId}`);
    const postSnapshot = await get(postRef);
    const post = postSnapshot.val();
    const currentUserID = auth.currentUser?.uid;

    if (post && post.userID === currentUserID) {
        return update(postRef, {
            title: title,
            content: content,
            editedOn: moment().tz('Europe/Sofia').format('lll'),
        });
    }   else {
        toast.error('You are not authorized to edit this post.');
    }
};