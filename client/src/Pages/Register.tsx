
function Register(){

    return(
        <div className="register-box">

            <form className="">
                <h1>Register</h1>

                <div className="register-row">
                    <label>Name: </label>
                    <input className="input-register"
                           type="text"
                           placeholder="First Name"
                           required
                    />
                </div>
                <div className="register-row">
                    <label>Last Name: </label>
                    <input className="input-register"
                           type="text"
                           placeholder="Last Name"
                           required
                    />
                </div>
                <div className="register-row">
                    <label>Username: </label>
                    <input className="input-register"
                           type="text"
                           placeholder="Username"
                           required
                    />
                </div>
                <div className="register-row">
                    <label>Password: </label>
                    <input className="input-register"
                           type="password"
                           placeholder="Password"
                           required
                    />
                </div>

                <button className="button-register" type="submit">Register</button>
                <button className="button-register" onClick={() => {window.history.back()}}>Cancel</button>
            </form>

        </div>
    )

}

export default Register;