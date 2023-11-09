import './login.scss'
import { Link } from 'react-router-dom';

function Login(){
    return (
        <div className = "login">
            <div className = "card">
                <div className = "left">
                    <h1>OnlyMe</h1>
                    <p>
                        Share unforgetable memories and daily life stories only for your families and friends here.
                    </p>
                    <span>Don't you have an account?</span>
                    <Link to={`/Register`}>
                        <button>Register</button>
                    </Link>
                </div>
                <div className = "right">
                    <h1>Login</h1>
                    <form>
                        <input type = 'text' placeholder = 'Username'/>
                        <input type = 'password' placeholder = 'Password'/>
                        <button>Login</button>
                    </form> 
                </div>
            </div>
        </div>
    )
}

export default Login;