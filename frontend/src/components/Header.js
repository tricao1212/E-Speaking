import { Container } from "react-bootstrap";
import styles from "../styles/header.module.css"
function Header() {
    return(
        <header>
            <Container>
                <div className={styles.logoField}>
                    <div>
                        <img className={styles.logo} src="logo192.png" alt=""/>
                    </div>
                    <nav >
                        <ul className={styles.menuItems}>
                            <li className={styles.menuItem}>Home</li>
                            <li className={styles.menuItem}>Home</li>
                            <li className={styles.menuItem}>Home</li>
                        </ul>
                    </nav>
                </div>
            </Container>
        </header>
    )
}
export default Header;