import axios from "axios";

// const BASE_URL = "https://pixabay.com/api/";
// const API_KEY = "34882126-23c8752d62a2e062d45efec22";

// export const getPictures = (search) => {
//     return fetch(`${BASE_URL}?q=${search}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
//         .then((res) => res.json());
// }

export const getPictures = async (search, page) => {
 
     const params = new URLSearchParams({
        key: "34882126-23c8752d62a2e062d45efec22",
        q: search,
        image_type: "photo",
        orientation: "horizontal",
        page,
        per_page: 12,
     });
     
    const { data } = await axios.get(`https://pixabay.com/api/?${params.toString()}`);
    return data;
};

