import { useState, useContext } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import { UserContext } from '../../context/user.context'
import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields; //setting it to the default empty strings


    const { setCurrentUser } = useContext(UserContext)

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('passwords do not match')
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password)
            setCurrentUser(user)

            await createUserDocumentFromAuth(user, { displayName })
            resetFormFields();

        } catch (e) {
            if (e.code === 'auth/email-already-in-use') {
                alert('Cannot create user email already in use')
            }
            console.error('user creation encountered an error', e)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value })
    };

    return (
        <div className='sign-up-container'>
            {/* on submit comes from react */}
            <h2> Don't have an account?</h2>
            <span> Sign up with your email and password </span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Display Name'
                    onChange={handleChange}
                    name="displayName"
                    type="text"
                    value={displayName}
                    required
                />
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
                <FormInput
                    label='Confirm Password'
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                    type="password"
                    required
                />

                <Button buttonType='google' type="submit"> Sign Up</Button>
            </form>

        </div>
    )
}

export default SignUpForm