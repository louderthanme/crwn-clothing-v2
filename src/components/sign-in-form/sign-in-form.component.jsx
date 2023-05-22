import { useState, useContext } from 'react'
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import { UserContext } from '../../context/user.context'

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields; //setting it to the default empty strings

    const { setCurrentUser } = useContext(UserContext)

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password)
            setCurrentUser(user)
            resetFormFields();

        } catch (e) {
            switch (e.code) {
                case 'auth/wrong password':
                    alert('wrong password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(e)
            }
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value })

    };

    return (
        <div className="sign-up-container">

            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput onChange={handleChange}
                    label='Email'
                    name="email"
                    type="email"
                    value={email}
                    required
                />
                <FormInput onChange={handleChange}
                    label='Password'
                    name="password"
                    value={password}
                    type="password"
                    required
                />

                <div className='buttons-container'>
                    <Button type="submit"> Sign In </Button>
                    {/* this button is type button because by default inside a form it's a submit button and I don't want my sign in with google to also submit what may be on the fields */}
                    <Button type="button" buttonType='google' onClick={signInWithGoogle}> Sign In With Google</Button>
                </div>
            </form>
        </div>

    )

}

export default SignInForm