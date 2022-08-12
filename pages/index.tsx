import type { NextPage } from "next";
import Link from "next/link";
import useSWR, { SWRConfig, SWRConfiguration } from "swr";
import styles from "../styles/Home.module.css";

type swrProps = {
  name: string;
  description: string;
  subscribers_count: number;
  stargazers_count: number;
  forks_count: number;
};

const API_URL = "https://api.github.com/repos/vercel/swr";

function sleep(msec: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, msec);
  });
}

const fetcher = (url: string) =>
  fetch(url).then(async (res) => {
    sleep(3000);
    return res.json();
  });

const Home: NextPage = () => {
  const { data, error } = useSWR(API_URL, fetcher);

  if (error) return <div>An error has occurred.</div>;
  if (!data) return <div>Loading...</div>;

  const { name, description, subscribers_count, stargazers_count, forks_count }: swrProps = data;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>{name}</h1>
        <p className={styles.description}>{description}</p>
        <p>
          <Link href={{ pathname: "/forks", query: { name, description, forks_count } }}>
            <strong>🍴 forks_count</strong>
          </Link>
          <Link
            href={{ pathname: "/subscribers", query: { name, description, subscribers_count } }}
          >
            <strong>👁 subscribers_count</strong>
          </Link>
          <Link href={{ pathname: "/stargazers", query: { name, description, stargazers_count } }}>
            <strong>✨ stargazers_count</strong>
          </Link>
        </p>
      </main>
    </div>
  );
};

export default function Page({ fallback }: SWRConfiguration) {
  return (
    <SWRConfig value={{ fallback }}>
      <Home />
    </SWRConfig>
  );
}

export async function getServerSideProps() {
  const data = await fetcher(API_URL);
  return {
    props: {
      fallback: {
        API_URL: data,
      },
    },
  };
}
