import MainMenu from './../MainMenu/MainMenu';
import Footer from './../Footer/Footer';
import styles from './MainLayout.module.scss';
const MainLayout = ({ children }) => (
  <div className={styles.mainLayout}>
    <MainMenu />
    {children}
    <Footer />
  </div>
);

export default MainLayout;
