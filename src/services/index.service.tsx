import { createApi } from "unsplash-js";
import { accessKey } from "@/helpers/unsplash.helper";

const unsplashApi = createApi({
	accessKey,
});

const getImage = () => {
	return unsplashApi.search.getPhotos({
		query: "Star Wars",
		page: 1,
		perPage: 1,
		orientation: "landscape",
	});
};

export { getImage };
