import axios from "axios";

const api = axios.create({
    baseURL: "http://quicklink/api",
});

export const shortenUrl = (originalUrl) => {
    return api.post("/url/shorten", { originalUrl });
};

export const getAllUrls = () => {
    return api.get("/url/info/all");
};