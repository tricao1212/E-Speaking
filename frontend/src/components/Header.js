import styles from "../styles/header.module.css"
function Header() {
    console.log(styles);
    return(
        <header>
            <div>
                <img src="logo192.png"/>
            </div>
            <nav >
                <ul className={styles.menuItems}>
                    <li className={styles.menuItem}>Home</li>
                    <li className={styles.menuItem}>Home</li>
                    <li className={styles.menuItem}>Home</li>
                </ul>
            </nav>
        </header>
    )
}
export default Header;