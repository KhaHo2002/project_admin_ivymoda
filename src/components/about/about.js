import { useEffect } from "react";
// import axios from "../../customize/customAxios";
import WeatherState from "./weather";
const About = () => {

    useEffect(() => {
        // setTimeout(() => {
        //     axios.get('http://localhost:8081/health').then(res => {
        //         console.log(res);
        //     })
        // })

    }, [])
    return (
        <>
            <div className="App">
                < WeatherState/>
            </div>
        </>
    )
}


export default About;