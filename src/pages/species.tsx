import Head from "next/head";
import styles from "@/styles/pages/species.module.scss";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { getSpecies } from "@/services/species.service";
import { iSpecies } from "@/interfaces/species.interface";
import List from "@/components/List";
import ListItem from "@/components/ListItem";

export default function Home() {
	const apiUrl = "https://swapi.dev/api/species/";
	const [items, handleItems] = useState<iSpecies[]>([]);
	const [nextUrl, handleNextUrl] = useState("");

	useEffect(() => {
		console.log("222");
		getSpecies(apiUrl, (response: any) => {
			handleItems([...response.data.results]);
			handleNextUrl(response.data.next);
		});
	}, []);

	const getNextPage = () => {
		getSpecies(nextUrl, (response: any) => {
			handleItems([...items, ...response.data.results]);
			handleNextUrl(response.data.next);
		});
	};

	let button = null;
	if (nextUrl != null) {
		button = (
			<button className="btn" onClick={() => getNextPage()}>
				Plus d'items
			</button>
		);
	}

	return (
		<>
			<Head>
				<title>Star Wars | Espèces</title>
			</Head>
			<Header />
			<main>
				<h1>Espèces</h1>
				<List>
					{items.map((item, index) => (
						<ListItem
							title={item.name}
							href={
								"/species/" +
								item.url.split("/")[
									item.url.split("/").length - 2
								]
							}
							key={"list-item-" + index}
						/>
					))}
				</List>
				<div className={styles.btnCtn}>{button}</div>
			</main>
		</>
	);
}
