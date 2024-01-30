import styles from './Footer.module.scss';

const Footer = () => (
    <footer className={`bg-dark ${styles.footer}`}>
      <div className="text-center">
        <small>
          Copyright &copy; Zadanie Rekrutacyjne {new Date().getFullYear()}
        </small>
      </div>
    </footer>
);

export default Footer;
