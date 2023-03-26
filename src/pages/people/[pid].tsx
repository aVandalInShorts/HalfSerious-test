import Header from "@/components/Header";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
	getPeopleDetail,
	getPeopleDetailItemList,
} from "@/services/peopleDetail.service";
import { iPeople } from "@/interfaces/peopleDetail.interface";
import DetailItem from "@/components/DetailItem";
import buildLinkElements, {
	iBuildLinkElementsLink,
} from "@/helpers/buildLinkElements.helper";

export default function speciesDetail() {
	const router = useRouter();
	const pid = router.query.pid;
	const [data, handledata] = useState<iPeople>();
	const [starships, handleStarShips] = useState<iBuildLinkElementsLink[]>([]);
	const [species, handleSpecies] = useState<iBuildLinkElementsLink[]>([]);
	const [vehicles, handleVehiculs] = useState<iBuildLinkElementsLink[]>([]);
	const [starshipsContent, handleStarShipsContent] = useState<JSX.Element[]>(
		[]
	);
	const [speciesContent, handleSpeciesContent] = useState<JSX.Element[]>([]);
	const [vehiclesContent, handleVehiculsContent] = useState<JSX.Element[]>(
		[]
	);

	useEffect(() => {
		if (pid != undefined) {
			const apiUrl = `https://swapi.dev/api/people/${pid}/`;
			getPeopleDetail(apiUrl, (response: any) => {
				handledata(response.data);
			});
		}
	}, [pid]);

	useEffect(() => {
		if (data?.starships) {
			getPeopleDetailItemList(
				data?.starships,
				(response: iBuildLinkElementsLink[]) => {
					handleStarShips(response);
				}
			);
		}
		if (data?.species) {
			getPeopleDetailItemList(
				data?.species,
				(response: iBuildLinkElementsLink[]) => {
					handleSpecies(response);
				}
			);
		}
		if (data?.vehicles) {
			getPeopleDetailItemList(
				data?.vehicles,
				(response: iBuildLinkElementsLink[]) => {
					handleVehiculs(response);
				}
			);
		}
	}, [data]);

	useEffect(() => {
		handleStarShipsContent([...buildLinkElements("/starships", starships)]);
	}, [starships]);

	useEffect(() => {
		handleSpeciesContent([...buildLinkElements("/species", species)]);
	}, [species]);

	useEffect(() => {
		handleVehiculsContent([...buildLinkElements("/planets", vehicles)]);
	}, [vehicles]);

	return (
		<>
			<Head>
				<title>Star Wars | Personnages | {data?.name}</title>
			</Head>
			<Header />
			<main>
				<h1>{data?.name}</h1>
				<DetailItem title="Genre">{data?.gender}</DetailItem>
				<DetailItem title="Couleur de cheveux">
					{data?.hair_color}
				</DetailItem>
				<DetailItem title="Hauteur">{data?.height + "cm"}</DetailItem>
				<DetailItem title="Poids">{data?.mass + "kg"}</DetailItem>
				<DetailItem title="Espèces">{speciesContent}</DetailItem>
				<DetailItem title="Vaissaux">{starshipsContent}</DetailItem>
				<DetailItem title="Véhicules">{vehiclesContent}</DetailItem>
			</main>
		</>
	);
}
