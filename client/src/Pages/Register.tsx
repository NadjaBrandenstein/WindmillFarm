import '../CSS/Register.css'
import {useRegisterUser} from "../Hooks/useRegisterUser.ts";

function Register(){

    const {
        username,
        setUsername,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        password,
        setPassword,
        error,
        handleRegister,
    } = useRegisterUser();

    return(
        <div className="register-box">

            <form className="" onSubmit={handleRegister}>
                <h1>Register</h1>

                <div className="register-row">
                    <label>Name: </label>
                    <input className="input-register"
                           type="text"
                           placeholder="First Name"
                           value={firstName}
                           onChange={(e) => setFirstName(e.target.value)}
                           required
                    />
                </div>
                <div className="register-row">
                    <label>Last Name: </label>
                    <input className="input-register"
                           type="text"
                           placeholder="Last Name"
                           value={lastName}
                           onChange={(e) => setLastName(e.target.value)}
                           required
                    />
                </div>
                <div className="register-row">
                    <label>Username: </label>
                    <input className="input-register"
                           type="text"
                           placeholder="Username"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                           required
                    />
                </div>
                <div className="register-row">
                    <label>Password: </label>
                    <input className="input-register"
                           type="password"
                           placeholder="Password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           required
                    />
                </div>

                {error && <p className="error-message">{error}</p>}

                <div className="register-button-row">
                    <button className="button-register" type="submit">Register</button>
                    <button className="button-register" onClick={() => {window.history.back()}}>Cancel</button>
                </div>
            </form>

        </div>
    )

}

export default Register;