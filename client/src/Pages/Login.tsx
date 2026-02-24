import '../CSS/Login.css'

function Login() {


    return(
        <div>

            <input className="input" type="text" placeholder="Username"/>
            <input className="input" type="password" placeholder="Password" />
            <button className="button-login">Register</button>
            <button className="button-login">Login</button>

        </div>
    )
}

export default Login;