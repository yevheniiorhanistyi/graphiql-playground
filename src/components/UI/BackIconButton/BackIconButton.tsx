import styles from './BackIconButton.module.scss';

const BackIconButton = () => (
  <svg
    className={styles.back_button}
    width="12"
    height="25"
    viewBox="0 0 12 25"
    fill="none"
    stroke="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.9025 23.3978L1.71613 14.2115C0.631244 13.1266 0.631244 11.3513 1.71613 10.2664L10.9025 1.08008"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default BackIconButton;
