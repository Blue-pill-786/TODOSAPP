
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home(){

    return(
        <div className={styles.container}>
           
            <div className={"btn btn-warning "+styles.link} >

            <Link to='/todo'>To do App</Link>
            </div>
           
            <div className={"btn btn-warning "+styles.link}>

            <Link to='/notes'> Note Keeper</Link>
            </div>
        </div>
    )
}

export default Home;