import Header from "@/components/Header";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
	getPlanetsDetail,
	getPlanetsDetailItemList,
} from "@/services/planetsDetail.service";
import { iPlanets } from "@/interfaces/planetsDetail.interface";
import DetailItem from "@/components/DetailItem";
import buildLinkElements, {
	iBuildLinkElementsLink,
} from "@/helpers/buildLinkElements.helper";

export default function speciesDetail() {
	const router = useRouter();
	const pid = router.query.pid;
	const [data, handledata] = useState<iPlanets>();
	const [films, handleFilms] = useState<iBuildLinkElementsLink[]>([]);
	const [filmsContent, handleFilmsContent] = useState<JSX.Element[]>([]);
	const [residents, handleResidents] = useState<iBuildLinkElementsLink[]>([]);
	const [residentsContent, handleResidentsContent] = useState<JSX.Element[]>(
		[]
	);

	useEffect(() => {
		if (pid != undefined) {
			const apiUrl = `https://swapi.dev/api/planets/${pid}/`;
			getPlanetsDetail(apiUrl, (response: any) => {
				handledata(response.data);
			});
		}
	}, [pid]);

	useEffect(() => {
		if (data?.films) {
			getPlanetsDetailItemList(
				data?.films,
				(response: iBuildLinkElementsLink[]) => {
					handleFilms(response);
				}
			);
		}
		if (data?.residents) {
			getPlanetsDetailItemList(
				data?.residents,
				(response: iBuildLinkElementsLink[]) => {
					handleResidents(response);
				}
			);
		}
	}, [data]);

	useEffect(() => {
		handleFilmsContent([...buildLinkElements("/films", films)]);
	}, [films]);

	useEffect(() => {
		handleResidentsContent([...buildLinkElements("/people", residents)]);
	}, [residents]);

	return (
		<>
			<Head>
				<title>Star Wars | Planètes | {data?.name}</title>
			</Head>
			<Header />
			<main>
				<h1>{data?.name}</h1>
				<DetailItem title="Climat">{data?.climate}</DetailItem>
				<DetailItem title="Diamètre">{data?.diameter}</DetailItem>
				<DetailItem title="gravity">{data?.gravity}</DetailItem>
				<DetailItem title="Période orbitale">
					{data?.orbital_period + " jours"}
				</DetailItem>
				<DetailItem title="Rotation">
					{data?.rotation_period + " heures"}
				</DetailItem>
				<DetailItem title="Résidents">{residentsContent}</DetailItem>
				<DetailItem title="Films">{filmsContent}</DetailItem>
			</main>
		</>
	);
}
