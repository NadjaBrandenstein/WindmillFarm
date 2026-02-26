import '../CSS/Login.css'
import {useNavigate} from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    return(
        <div className="login-box">
            <form className="content-login">
                <div className="input-wrapper">
                    <input className="input user-input input-login"
                           type="text"
                           placeholder="Username"
                           required
                    />
                </div>

                <div className="input-wrapper password-wrapper">
                    <input className="input lock-input input-login"
                           //type={showPassword ? "text" : "password"}
                           placeholder="Password"
                           required
                    />

                    <button type="button"
                            className="show-password-btn"
                        //onClick={() => setShowPassword}
                    >
                        <img className="eye-icon"/>
                    </button>
                </div>

                <div className="button-wrapper">
                    <button className="button-login"
                            type="button"
                            onClick={() => navigate("/register")}>
                        Register
                    </button>

                    <button className="button-login" type="submit">
                        Login
                    </button>
                </div>

            </form>

        </div>
    )
}

export default Login;