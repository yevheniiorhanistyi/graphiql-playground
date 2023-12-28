import styles from './RootIcon.module.scss';

const RootIcon = () => (
  <svg
    className={styles.root_icon}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default RootIcon;
