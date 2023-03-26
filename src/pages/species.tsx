import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/pages/home.module.css";
import axios from "axios";

export default function Home() {
	axios
		.get("https://swapi.dev/api/")
		.then((response) => console.log("response", response));

	return (
		<>
			<Head>
				<title>Star Wars | Espèces</title>
			</Head>
			<main className={styles.main}></main>
		</>
	);
}
