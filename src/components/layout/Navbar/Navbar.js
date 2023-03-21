import { Link } from "react-router-dom"
import Container from "../Container/Container"
import Styles from "./Navbar.module.css"
import logo from "../../../img/costs_logo.png"

function Navbar(){
    return(
        <nav className={Styles.navbar}>
            <Container>
                <Link>
                    <img src={logo}/>
                </Link>
                <ul className={Styles.list}>
                    <li className={Styles.item}>
                        <Link to="/" className={Styles.item.a}> Home </Link>
                    </li>
                    <li className={Styles.item}>
                        <Link to="/projects" className={Styles.item.a}> Projetos </Link>
                    </li>
                    <li className={Styles.item}>
                        <Link to="/company" className={Styles.item.a}> Empresa </Link>
                    </li>
                    <li className={Styles.item}>
                        <Link to="/contatc" className={Styles.item.a}> Contato </Link>
                    </li>
                    {/* <li className={Styles.item}>
                        <Link to="/newproject" className={Styles.item.a}> newproject </Link>
                    </li> */}
                </ul>
            </Container>
        </nav>
    )
}
export default Navbar
