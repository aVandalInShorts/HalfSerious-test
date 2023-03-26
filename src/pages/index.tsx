import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/pages/home.module.scss";
import axios from "axios";
import Header from "@/components/header";

export default function Home() {
	axios
		.get("https://swapi.dev/api/")
		.then((response) => console.log("response", response));

	return (
		<>
			<Head>
				<title>Star Wars</title>
			</Head>
			<Header />
			<main className={styles.main}></main>
		</>
	);
}
