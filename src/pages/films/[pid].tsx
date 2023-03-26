import Header from "@/components/Header";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
	getFilmsDetail,
	getFilmsDetailItemList,
} from "@/services/filmsDetail.service";
import { iFilmsDetail } from "@/interfaces/filmsDetail.interface";
import DetailItem from "@/components/DetailItem";
import buildLinkElements, {
	iBuildLinkElementsLink,
} from "@/helpers/buildLinkElements.helper";

export default function speciesDetail() {
	const router = useRouter();
	const pid = router.query.pid;
	const [data, handledata] = useState<iFilmsDetail>();
	const [date, handleDate] = useState("");
	const [planets, handlePlanets] = useState<iBuildLinkElementsLink[]>([]);
	const [species, handleSpecies] = useState<iBuildLinkElementsLink[]>([]);
	const [starships, handleStarships] = useState<iBuildLinkElementsLink[]>([]);
	const [vehicles, handleVehicles] = useState<iBuildLinkElementsLink[]>([]);
	const [planetsContent, handlePlanetsContent] = useState<JSX.Element[]>([]);
	const [speciesContent, handleSpeciesContent] = useState<JSX.Element[]>([]);
	const [starshipsContent, handleStarshipsContent] = useState<JSX.Element[]>(
		[]
	);
	const [vehiclesContent, handleVehiclesContent] = useState<JSX.Element[]>(
		[]
	);

	useEffect(() => {
		if (pid != undefined) {
			const apiUrl = `https://swapi.dev/api/films/${pid}/`;
			getFilmsDetail(apiUrl, (response: any) => {
				handledata(response.data);
			});
		}
	}, [pid]);

	useEffect(() => {
		if (data?.planets) {
			getFilmsDetailItemList(
				data?.planets,
				(response: iBuildLinkElementsLink[]) => {
					handlePlanets(response);
				}
			);
		}
		if (data?.species) {
			getFilmsDetailItemList(
				data?.species,
				(response: iBuildLinkElementsLink[]) => {
					handleSpecies(response);
				}
			);
		}
		if (data?.starships) {
			getFilmsDetailItemList(
				data?.starships,
				(response: iBuildLinkElementsLink[]) => {
					handleStarships(response);
				}
			);
		}
		if (data?.vehicles) {
			getFilmsDetailItemList(
				data?.vehicles,
				(response: iBuildLinkElementsLink[]) => {
					handleVehicles(response);
				}
			);
		}

		handleDate(new Date(data?.release_date as Date).toLocaleDateString());
	}, [data]);

	useEffect(() => {
		handlePlanetsContent([...buildLinkElements("/planets", planets)]);
	}, [planets]);

	useEffect(() => {
		handleSpeciesContent([...buildLinkElements("/species", species)]);
	}, [species]);

	useEffect(() => {
		handleStarshipsContent([...buildLinkElements("/starships", starships)]);
	}, [starships]);

	useEffect(() => {
		handleVehiclesContent([...buildLinkElements("/vehicles", vehicles)]);
	}, [vehicles]);

	return (
		<>
			<Head>
				<title>Star Wars | Films | {data?.title}</title>
			</Head>
			<Header />
			<main>
				<h1>{data?.title}</h1>
				<DetailItem title="Réalisateur">{data?.director}</DetailItem>
				<DetailItem title="Producteurs">{data?.producer}</DetailItem>
				<DetailItem title="Sortie le">{date}</DetailItem>
				<DetailItem title="Planètes">{planetsContent}</DetailItem>
				<DetailItem title="Espèces">{speciesContent}</DetailItem>
				<DetailItem title="Vaissaux">{starshipsContent}</DetailItem>
				<DetailItem title="Véhicules">{vehiclesContent}</DetailItem>
			</main>
		</>
	);
}
