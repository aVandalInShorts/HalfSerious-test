import Header from "@/components/Header";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
	getStarshipsDetail,
	getStarshipsDetailItemList,
} from "@/services/starshipsDetail.service";
import { iStarships } from "@/interfaces/starshipsDetail.interface";
import DetailItem from "@/components/DetailItem";
import buildLinkElements, {
	iBuildLinkElementsLink,
} from "@/helpers/buildLinkElements.helper";
import Link from "next/link";
import styles from "@/styles/pages/speciesDetail.module.scss";

export default function speciesDetail() {
	const router = useRouter();
	const pid = router.query.pid;
	const [data, handledata] = useState<iStarships>();
	const [films, handleFilms] = useState<iBuildLinkElementsLink[]>([]);
	const [filmsContent, handleFilmsContent] = useState<JSX.Element[]>([]);
	const [pilots, handlePilots] = useState<iBuildLinkElementsLink[]>([]);
	const [pilotsContent, handlePilotsContent] = useState<JSX.Element[]>([]);

	useEffect(() => {
		if (pid != undefined) {
			const apiUrl = `https://swapi.dev/api/starships/${pid}/`;
			getStarshipsDetail(apiUrl, (response: any) => {
				handledata(response.data);
			});
		}
	}, [pid]);

	useEffect(() => {
		if (data?.films) {
			getStarshipsDetailItemList(
				data?.films,
				(response: iBuildLinkElementsLink[]) => {
					handleFilms(response);
				}
			);
		}
		if (data?.pilots) {
			getStarshipsDetailItemList(
				data?.pilots,
				(response: iBuildLinkElementsLink[]) => {
					handlePilots(response);
				}
			);
		}
	}, [data]);

	useEffect(() => {
		handleFilmsContent([...buildLinkElements("/films", films)]);
	}, [films]);

	useEffect(() => {
		handlePilotsContent([...buildLinkElements("/people", pilots)]);
	}, [pilots]);

	return (
		<>
			<Head>
				<title>Star Wars | Planètes | {data?.name}</title>
			</Head>
			<Header />
			<main>
				<h1>{data?.name}</h1>
				<DetailItem title="MGLT (Mégalimière par heure)">
					{data?.MGLT}
				</DetailItem>
				<DetailItem title="Cargo">
					{data?.cargo_capacity + " kg"}
				</DetailItem>
				<DetailItem title="Équipage">{data?.crew}</DetailItem>
				<DetailItem title="Passagers">{data?.passengers}</DetailItem>
				<DetailItem title="Classe">{data?.starship_class}</DetailItem>
				<DetailItem title="Modèle">{data?.model}</DetailItem>
				<DetailItem title="Longueur">{data?.length + " m"}</DetailItem>
				<DetailItem title="Pilotes">{pilotsContent}</DetailItem>
				<DetailItem title="Films">{filmsContent}</DetailItem>

				<div className={styles.btnCtn}>
					<Link href="/starships" className={"btn"}>
						Retour aux espèces
					</Link>
				</div>
			</main>
		</>
	);
}
