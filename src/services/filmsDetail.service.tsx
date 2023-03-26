import axios from "axios";
import getIdFromUrl from "@/helpers/getIdFromUrl.helper";
import { iBuildLinkElementsLink } from "@/helpers/buildLinkElements.helper";

const getFilmsDetail = (url: string, cb: any) => {
	handleRequest(url, cb);
};

const getFilmsDetailItemList = (array: string[] | undefined, cb: any) => {
	if (array) {
		const requests: any = [];

		for (const index in array) {
			requests.push(axios.get(array[index]));
		}

		Promise.all(requests).then((results) => {
			const FormattedData: iBuildLinkElementsLink[] = results.map(
				(item) => ({
					id: getIdFromUrl(item.request.responseURL),
					value: item.data.title || item.data.name,
				})
			);
			cb(FormattedData);
		});
	}
};

const handleRequest = (url: string, cb: any) => {
	axios.get(url).then((response) => {
		cb(response);
	});
};

export { getFilmsDetail, getFilmsDetailItemList };
