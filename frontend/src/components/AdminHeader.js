import styles from '../styles/adminheader.module.css'
const AdminHeader = () => {
    return(
        <div>
            <header>
                <nav>
                    <div className={styles.logofield}>
                        <img className={styles.logo} src="../logo192.png"/>
                        <h5>E-Speaking</h5>
                    </div>
                </nav>
            </header>
        </div>
    )
}
export default AdminHeader;