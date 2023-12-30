import { useState } from 'react'
import './register.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {

    const [checkToast, setCheckToast] = useState(false)
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        name: ""
    })

    const handleChange = (e) => {
        setInputs((preV) => ({...preV, [e.target.name]: e.target.value}))
    }
    // console.log('====================================');
    // console.log(inputs);
    // console.log('====================================');
    const handleClick = async (e) => {
        e.preventDefault()
         try{
            const response = await axios.post("http://localhost:3001/user/sign-up",{
                userId: inputs.username,
                password: inputs.password
            })

            if (response.status === 200) {
                console.log("Sign-up successful!");
                setCheckToast(true)
                toast.success('Registration successful!'); // Display success toast
                // Handle successful sign-up, e.g., redirect to a different page or display a success message.
              } else {
                console.error("Sign-up failed:", response.statusText);
                setCheckToast(true)
                toast.error(`Registration failed: ${response.statusText}`); // Display error toast
                // Handle the error, e.g., display an error message to the user.
              }
         }
         catch(err){
            console.log('====================================');
            console.log(err);
            console.log('====================================');
         }
    }

    return (
        <div className='register'>
            <div className='card'>
                <div className='left'>
                    <h1>OnlyMe</h1>
                    <p>
                    Share unforgettable memories and daily life stories only for your families and friends here.
                    </p>
                    <span>Do you have an account?</span>
                    <Link to='/login'>
                        <button>Login</button>
                    </Link>
                </div>
                <div className='right'>
                    <h1>Register</h1>
                    <form>
                        <input type='text' placeholder='Username' name='username' onChange={handleChange}/>
                        <input type='email' placeholder='Email'name='email' onChange={handleChange}/>
                        <input type='password' placeholder='Password'name='password' onChange={handleChange} />
                        <input type='text' placeholder='Name'name='name' onChange={handleChange}/>
                        <button onClick={handleClick}>Register</button>
                    </form>
                </div>
            </div>
            {checkToast && <ToastContainer />}
        </div>
    )
}

export default Register
