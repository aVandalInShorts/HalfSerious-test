import Link from "next/link";

export interface iBuildLinkElementsLink {
	id: string | number;
	value: string;
}

export default (baseUrl: string, data: iBuildLinkElementsLink[]) => {
	const allElements: JSX.Element[] = [];

	data.forEach((item: iBuildLinkElementsLink, index: number) => {
		allElements.push(
			<Link
				href={`${baseUrl}/${item.id}/`}
				key={baseUrl + "-link-" + index}
			>
				{item.value}
			</Link>
		);

		if (index !== data.length - 1)
			allElements.push(<span key={baseUrl + "-span-" + index}>, </span>);
	});

	return allElements;
};
