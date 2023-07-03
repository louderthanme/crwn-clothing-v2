import { useState } from 'react';
import { signInWithGooglePopup,  signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';

import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component'

import { ButtonsContainer, SignInContainer} from './sign-in-form.styles';

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields; // Extracting email and password from formFields state

    const resetFormFields = () => {
        setFormFields(defaultFormFields); // Resetting the form fields to their default values
    };

    const signInWithGoogle = async () => {
        await signInWithGooglePopup(); // Initiating the sign-in process with Google authentication
    console.log('success')
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signInAuthUserWithEmailAndPassword(email, password); // Signing in the user with email and password authentication
            resetFormFields(); // Resetting the form fields after successful sign-in
        } catch (err) {
            switch (err.code) {
                case 'auth/wrong password':
                    alert('Wrong password for email'); // Displaying an alert for wrong password error
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this email'); // Displaying an alert for no user found error
                    break;
                default:
                    console.log(err); // Logging any other error to the console
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value }); // Updating the formFields state with the changed input values
    };

    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                {/* Email input */}
                <FormInput
                    onChange={handleChange}
                    label="Email"
                    name="email"
                    type="email"
                    value={email}
                    required
                />
                {/* Password input */}
                <FormInput
                    onChange={handleChange}
                    label="Password"
                    name="password"
                    value={password}
                    type="password"
                    required
                />

                <ButtonsContainer>
                    {/* Sign In button */}
                    <Button type="submit">Sign In</Button>

                    {/* Sign In With Google button */}
                    {/* This button is of type "button" because, by default inside a form, the button acts as a submit button */}
                    {/* We don't want the Sign In With Google button to submit the form */}
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
                        Sign In With Google
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
};

export default SignInForm;
