import axios from "axios";
import { useState, useEffect } from "react";
import ListItem from "./ListItem";
import styles from "@/styles/components/handleList.module.scss";

interface handleListProps {
	url: string;
}

export default function handleList(props: handleListProps) {
	const [items, handleItems] = useState([]);
	const [nextUrl, handleNextUrl] = useState("");

	useEffect(() => {
		getPage(props.url);
	}, []);

	function getPage(url: string) {
		handleRequest(url);
	}

	function getNextPage() {
		handleRequest(nextUrl);
	}

	function handleRequest(url: string) {
		axios.get(url).then((response) => {
			const newItemsList: any = [...items, ...response.data.results];
			handleItems(newItemsList);
			handleNextUrl(response.data.next);
		});
	}

	return (
		<>
			<div className={styles.handleListMoreCtn}>
				<button
					className={styles.handleListMore}
					onClick={() => getNextPage()}
				>
					Plus d'items
				</button>
			</div>
		</>
	);
}
