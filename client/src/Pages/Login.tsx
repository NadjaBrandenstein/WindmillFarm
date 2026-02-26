import '../CSS/Login.css'
import {useNavigate} from "react-router-dom";
import {useLogin} from "../Hooks/useLogin.ts";

function Login() {

    const navigate = useNavigate();

    const {
        username,
        setUsername,
        password,
        setPassword,
        showPassword,
        setShowPassword,
        error,
        handleSubmit,
    } = useLogin();

    return(
        <div className="login-box">
            <form className="content-login" onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <input className="input user-input input-login"
                           type="text"
                           placeholder="Username"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                           required
                    />
                </div>

                <div className="input-wrapper password-wrapper">
                    <input className="input lock-input input-login"
                           type={showPassword ? "text" : "password"}
                           placeholder="Password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           required
                    />

                    <button type="button"
                            className="show-password-btn"
                            onClick={() => setShowPassword}
                    >
                        <img className="eye-icon"/>
                    </button>
                </div>

                {error && <p className="error">{error}</p>}

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