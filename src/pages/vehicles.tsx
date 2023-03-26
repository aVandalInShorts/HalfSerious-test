import Head from "next/head";
import styles from "@/styles/pages/species.module.scss";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { getVehicles } from "@/services/vehicles.service";
import { iVehicles } from "@/interfaces/vehicles.interface";
import List from "@/components/List";
import ListItem from "@/components/ListItem";
import getIdFromUrl from "@/helpers/getIdFromUrl.helper";

export default function Home() {
	const apiUrl = "https://swapi.dev/api/vehicles/";
	const [items, handleItems] = useState<iVehicles[]>([]);
	const [nextUrl, handleNextUrl] = useState<string | null>(null);

	useEffect(() => {
		getVehicles(apiUrl, (response: any) => {
			handleItems([...response.data.results]);
			handleNextUrl(response.data.next);
			console.log("response", response);
		});
	}, []);

	const getNextPage = () => {
		if (nextUrl !== null) {
			getVehicles(nextUrl, (response: any) => {
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
				<title>Star Wars | Véhicules</title>
			</Head>
			<Header />
			<main>
				<h1>Véhicules</h1>
				<List>
					{items.map((item, index) => (
						<ListItem
							title={item.name}
							href={"/vehicles/" + getIdFromUrl(item.url)}
							key={"list-item-" + index}
						/>
					))}
				</List>
				<div className={styles.btnCtn}>{button}</div>
			</main>
		</>
	);
}
