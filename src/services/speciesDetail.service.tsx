import axios from "axios";

const getSpeciesDetail = (url: string, cb: any) => {
	handleRequest(url, cb);
};

const getSpeciesDetailItemList = (array: string[] | undefined, cb: any) => {
	if (array) {
		const requests: any = [];

		for (const index in array) {
			requests.push(axios.get(array[index]));
		}

		Promise.all(requests).then((results) => {
			const FormattedData: string[] = results.map(
				(item) => item.data.title || item.data.name
			);
			cb(FormattedData);
		});
	}
};

const getSpeciesDetailItemSingle = (url: string | undefined, cb: any) => {
	axios.get(url).then((result) => {
		cb(result.data.title || result.data.name);
	});
};

const handleRequest = (url: string, cb: any) => {
	axios.get(url).then((response) => {
		cb(response);
	});
};

export {
	getSpeciesDetail,
	getSpeciesDetailItemList,
	getSpeciesDetailItemSingle,
};
