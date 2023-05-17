import { useState } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields; //setting it to the default empty strings

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
        <div>
            <h1>i'm the sign up form</h1>
            {/* on submit comes from react */}
            <form onSubmit={handleSubmit}>

                <label htmlFor="">Display Name</label>
                <input
                    onChange={handleChange}
                    name="displayName"
                    type="text"
                    value={displayName}
                    required
                />

                <label htmlFor="">Email</label>
                <input onChange={handleChange}
                    name="email"
                    type="email"
                    value={email}
                    required
                />

                <label htmlFor="">Password</label>
                <input onChange={handleChange}
                    name="password"
                    value={password}
                    type="password"
                    required
                />

                <label htmlFor="">Confirm Password</label>
                <input
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                    type="password"
                    required
                />

                <button type="submit"> Sign Up</button>
            </form>

        </div>
    )
}

export default SignUpForm