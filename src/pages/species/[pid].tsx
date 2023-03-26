import Header from "@/components/Header";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
	getSpeciesDetail,
	getSpeciesDetailItemList,
	getSpeciesDetailItemSingle,
} from "@/services/speciesDetail.service";
import { iSpeciesDetail } from "@/interfaces/speciesDetail.interface";
import DetailItem from "@/components/DetailItem";
import Link from "next/link";
import buildLinkElements, {
	iBuildLinkElementsLink,
} from "@/helpers/buildLinkElements.helper";

export default function speciesDetail() {
	const router = useRouter();
	const pid = router.query.pid;
	const [data, handledata] = useState<iSpeciesDetail>();
	const [films, handleFilms] = useState<iBuildLinkElementsLink[]>([]);
	const [homeworld, handleHomeworld] = useState<iBuildLinkElementsLink[]>([]);
	const [people, handlePeople] = useState<iBuildLinkElementsLink[]>([]);
	const [filmsContent, handleFilmsContent] = useState<JSX.Element[]>([]);
	const [homeworldContent, handleHomeworldContent] = useState<JSX.Element[]>(
		[]
	);
	const [peopleContent, handlePeopleContent] = useState<JSX.Element[]>([]);

	useEffect(() => {
		if (pid != undefined) {
			const apiUrl = `https://swapi.dev/api/species/${pid}/`;
			getSpeciesDetail(apiUrl, (response: any) => {
				handledata(response.data);
			});
		}
	}, [pid]);

	useEffect(() => {
		if (data?.films) {
			getSpeciesDetailItemList(
				data?.films,
				(response: iBuildLinkElementsLink[]) => {
					handleFilms(response);
				}
			);
		}
		if (data?.homeworld) {
			getSpeciesDetailItemSingle(
				data?.homeworld,
				(response: iBuildLinkElementsLink[]) => {
					handleHomeworld(response);
				}
			);
		}
		if (data?.people) {
			getSpeciesDetailItemList(
				data?.people,
				(response: iBuildLinkElementsLink[]) => {
					handlePeople(response);
				}
			);
		}
	}, [data]);

	useEffect(() => {
		handleFilmsContent([...buildLinkElements("/films", films)]);
	}, [films]);

	useEffect(() => {
		handleHomeworldContent([...buildLinkElements("/homeworld", homeworld)]);
	}, [homeworld]);

	useEffect(() => {
		handlePeopleContent([...buildLinkElements("/people", people)]);
	}, [people]);

	return (
		<>
			<Head>
				<title>Star Wars | Espèces | {data?.name}</title>
			</Head>
			<Header />
			<main>
				<h1>{data?.name}</h1>
				<DetailItem title="Hauteur">
					{data?.average_height + "cm"}
				</DetailItem>
				<DetailItem title="Espérance de vie">
					{data?.average_lifespan + " années"}
				</DetailItem>
				<DetailItem title="Classification">
					{data?.classification}
				</DetailItem>
				<DetailItem title="Langue">{data?.language}</DetailItem>
				<DetailItem title="Filmes">{filmsContent}</DetailItem>
				<DetailItem title="Planète d'origine">
					{homeworldContent}
				</DetailItem>
				<DetailItem title="Personnes connues">
					{peopleContent}
				</DetailItem>
			</main>
		</>
	);
}
