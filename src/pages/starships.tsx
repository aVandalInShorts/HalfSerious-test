import Head from "next/head";
import styles from "@/styles/pages/species.module.scss";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { getStarships } from "@/services/starships.service";
import { iStarships } from "@/interfaces/starships.interface";
import List from "@/components/List";
import ListItem from "@/components/ListItem";
import getIdFromUrl from "@/helpers/getIdFromUrl.helper";

export default function Home() {
	const apiUrl = "https://swapi.dev/api/starships/";
	const [items, handleItems] = useState<iStarships[]>([]);
	const [nextUrl, handleNextUrl] = useState<string | null>(null);

	useEffect(() => {
		getStarships(apiUrl, (response: any) => {
			handleItems([...response.data.results]);
			handleNextUrl(response.data.next);
			console.log("response", response);
		});
	}, []);

	const getNextPage = () => {
		if (nextUrl !== null) {
			getStarships(nextUrl, (response: any) => {
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
				<title>Star Wars | Vaissaux</title>
			</Head>
			<Header />
			<main>
				<h1>Vaissaux</h1>
				<List>
					{items.map((item, index) => (
						<ListItem
							title={item.name}
							href={"/starships/" + getIdFromUrl(item.url)}
							key={"list-item-" + index}
						/>
					))}
				</List>
				<div className={styles.btnCtn}>{button}</div>
			</main>
		</>
	);
}
