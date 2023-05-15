import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        createUserDocumentFromAuth(user)
    }
    return (
        <div className="sign-in">
            <h1>sign in page</h1>
            <button onClick={logGoogleUser}>sign in with google Popup</button>
        </div>
    )
}

export default SignIn