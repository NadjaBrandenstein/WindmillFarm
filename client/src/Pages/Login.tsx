import '../CSS/Login.css'
import {useNavigate} from "react-router-dom";
import {useLogin} from "../Hooks/useLogin.ts";
import OpenEye from '../assets/OpenEye.png';
import ClosedEye from '../assets/ClosedEye.png';

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
                            onClick={() => setShowPassword(!showPassword)}
                    >
                        <img className="eye-icon"
                             src={showPassword ? ClosedEye : OpenEye}
                             alt={showPassword ? "Hide password" : "Show password"}/>
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