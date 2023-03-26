import Head from "next/head";
import styles from "@/styles/pages/species.module.scss";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { getFilms } from "@/services/films.service";
import { iFilms } from "@/interfaces/films.interface";
import List from "@/components/List";
import ListItem from "@/components/ListItem";
import getIdFromUrl from "@/helpers/getIdFromUrl.helper";

export default function Home() {
	const apiUrl = "https://swapi.dev/api/films/";
	const [items, handleItems] = useState<iFilms[]>([]);
	const [nextUrl, handleNextUrl] = useState<string | null>(null);

	useEffect(() => {
		getFilms(apiUrl, (response: any) => {
			handleItems([...response.data.results]);
			handleNextUrl(response.data.next);
			console.log("response", response);
		});
	}, []);

	const getNextPage = () => {
		if (nextUrl !== null) {
			getFilms(nextUrl, (response: any) => {
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
				<title>Star Wars | Filmes</title>
			</Head>
			<Header />
			<main>
				<h1>Filmes</h1>
				<List>
					{items.map((item, index) => (
						<ListItem
							title={item.title}
							href={"/films/" + getIdFromUrl(item.url)}
							key={"list-item-" + index}
						/>
					))}
				</List>
				<div className={styles.btnCtn}>{button}</div>
			</main>
		</>
	);
}
