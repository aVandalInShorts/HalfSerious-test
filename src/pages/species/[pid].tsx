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

export default function speciesDetail() {
	const router = useRouter();
	const pid = router.query.pid;
	const [data, handledata] = useState<iSpeciesDetail>();
	const [films, handleFilms] = useState("");
	const [homeworld, handleHomeworld] = useState("");
	const [people, handlePeople] = useState("");

	useEffect(() => {
		if (pid != undefined) {
			const apiUrl = `https://swapi.dev/api/species/${pid}/`;
			getSpeciesDetail(apiUrl, (response: any) => {
				handledata(response.data);
			});
		}
	}, [pid]);

	useEffect(() => {
		console.log("data", data);
		console.log("GO");
		if (data?.films) {
			getSpeciesDetailItemList(data?.films, (data: string[]) => {
				handleFilms(data.join(", "));
			});
		}
		if (data?.homeworld) {
			getSpeciesDetailItemSingle(data?.homeworld, (data: string) => {
				handleHomeworld(data);
			});
		}
		if (data?.people) {
			getSpeciesDetailItemList(data?.people, (data: string[]) => {
				handlePeople(data.join(", "));
			});
		}
	}, [data]);

	return (
		<>
			<Head>
				<title>Star Wars | Espèces</title>
			</Head>
			<Header />
			<main>
				<h1>{data?.name}</h1>
				<DetailItem
					title="Hauteur"
					value={data?.average_height + "cm"}
				/>
				<DetailItem
					title="Espérance de vie"
					value={data?.average_lifespan + " années"}
				/>
				<DetailItem
					title="Classification"
					value={data?.classification}
				/>
				<DetailItem title="Langue" value={data?.language} />
				<DetailItem title="Filmes" value={films} />
				<DetailItem title="Planète d'origine" value={homeworld} />
				<DetailItem title="Personnes connues" value={people} />
			</main>
		</>
	);
}
