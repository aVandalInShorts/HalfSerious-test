import Head from "next/head";
import styles from "@/styles/pages/species.module.scss";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { getPeople } from "@/services/people.service";
import { iPeople } from "@/interfaces/people.interface";
import List from "@/components/List";
import ListItem from "@/components/ListItem";
import getIdFromUrl from "@/helpers/getIdFromUrl.helper";

export default function Home() {
	const apiUrl = "https://swapi.dev/api/people/";
	const [items, handleItems] = useState<iPeople[]>([]);
	const [nextUrl, handleNextUrl] = useState<string | null>(null);

	useEffect(() => {
		getPeople(apiUrl, (response: any) => {
			handleItems([...response.data.results]);
			handleNextUrl(response.data.next);
		});
	}, []);

	const getNextPage = () => {
		if (nextUrl !== null) {
			getPeople(nextUrl, (response: any) => {
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
				<title>Star Wars | Personnages</title>
			</Head>
			<Header />
			<main>
				<h1>Personnages</h1>
				<List>
					{items.map((item, index) => (
						<ListItem
							title={item.name}
							href={"/people/" + getIdFromUrl(item.url)}
							key={"list-item-" + index}
						/>
					))}
				</List>
				<div className={styles.btnCtn}>{button}</div>
			</main>
		</>
	);
}
