import { UserAuth } from '../context/AuthContext';
import styles from '../styles/adminheader.module.css'
const AdminHeader = () => {
    const {logOut} = UserAuth();
    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <div>
            <header>
                <nav>
                    <div className={styles.logofield}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <img className={styles.logo} src="../logo192.png" alt=''/>
                            <h5>E-Speaking</h5>
                        </div>
                        <p onClick={handleSignOut}>Log Out</p>
                    </div>
                </nav>
            </header>
        </div>
    )
}
export default AdminHeader;