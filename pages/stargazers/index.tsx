import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

const Stargazers: NextPage = () => {
  const router = useRouter();
  const { name, description, stargazers_count } = router.query;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Link href="/">
          <a>
            <h1 className={styles.title}>{name}</h1>
          </a>
        </Link>
        <p className={styles.description}>{description}</p>
        <p>
          <strong>🍴 {stargazers_count}</strong>
        </p>
      </main>
    </div>
  );
};

export default Stargazers;
