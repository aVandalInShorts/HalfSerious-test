import Head from "next/head";
import styles from "@/styles/pages/home.module.scss";
import Header from "@/components/Header";
import HandleList from "@/components/HandleList";

export default function Home() {
	return (
		<>
			<Head>
				<title>Star Wars | Espèces</title>
			</Head>
			<Header />
			<main className={styles.main}>
				<HandleList url="https://swapi.dev/api/species" />
			</main>
		</>
	);
}
