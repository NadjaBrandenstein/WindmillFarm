import '../CSS/Login.css'
import {useNavigate} from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    return(
        <div className="login-box">

                <div className="input-wrapper">
                    <input className="input-login" type="text" placeholder="Username"/>
                </div>



            <input className="input" type="password" placeholder="Password" />
            <button className="button-login" type="button" onClick={() => navigate("/register")}>
                Register
            </button>
            <button className="button-login">Login</button>
        </div>
    )
}

export default Login;