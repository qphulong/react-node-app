import './register.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Register = () => {

    const [inputs,setInputs] = useState({
        username: "",
        email: "",
        password: "",
        name: ""
    })

    const handleChange = e => {
        setInputs(preV => ({...preV, [e.target.name]:  e.target.value}))
    };

    const handleClick = async (e) => {
        e.preventDefault()
        
        try{
            await axios.post("http://localhost:3001/user/sign-up",{
                userId: inputs.username,
                password: inputs.password
            })
        }
        catch{

        }

    }
    console.log('====================================');
    console.log(inputs);
    console.log('====================================');

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
                        <input type='text' placeholder='Username' name = 'username' onChange={handleChange}/>
                        <input type='email' placeholder='Email' name = 'email' onChange={handleChange}/>
                        <input type='password' placeholder='Password' name = 'password' onChange={handleChange}/>
                        <input type='text' placeholder='Name' name = 'name' onChange={handleChange}/>
                        <button onClick={handleClick}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
