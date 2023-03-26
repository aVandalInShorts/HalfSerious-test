import Head from "next/head";
import styles from "@/styles/pages/species.module.scss";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { getPlanets } from "@/services/planets.service";
import { iPlanets } from "@/interfaces/planets.interface";
import List from "@/components/List";
import ListItem from "@/components/ListItem";
import getIdFromUrl from "@/helpers/getIdFromUrl.helper";

export default function Home() {
	const apiUrl = "https://swapi.dev/api/planets/";
	const [items, handleItems] = useState<iPlanets[]>([]);
	const [nextUrl, handleNextUrl] = useState<string | null>(null);

	useEffect(() => {
		getPlanets(apiUrl, (response: any) => {
			handleItems([...response.data.results]);
			handleNextUrl(response.data.next);
		});
	}, []);

	const getNextPage = () => {
		if (nextUrl !== null) {
			getPlanets(nextUrl, (response: any) => {
				handleItems([...items, ...response.data.results]);
				handleNextUrl(response.data.next);
			});
		}
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
				<title>Star Wars | Planètes</title>
			</Head>
			<Header />
			<main>
				<h1>Planètes</h1>
				<List>
					{items.map((item, index) => (
						<ListItem
							title={item.name}
							href={"/planets/" + getIdFromUrl(item.url)}
							key={"list-item-" + index}
						/>
					))}
				</List>
				<div className={styles.btnCtn}>{button}</div>
			</main>
		</>
	);
}
