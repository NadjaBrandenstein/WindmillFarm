import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts'

function MainPage(){

    return(
        <div>
            <h3 className="header">Turbine Alpha</h3>

            <div className="grid">
                <ResponsiveContainer>
                    <LineChart>
                        <CartesianGrid />
                        <XAxis />
                        <YAxis />
                        <Tooltip />
                        <Line />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Alert/Command</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <button className="button-main">Start</button>
            <button className="button-main">Stop</button>

            <input className="input-main" type="text" placeholder="Blade Pitch"/>
            <button className="button-main">Submit</button>

        </div>
    )
}

export default MainPage;