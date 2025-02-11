import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
    }
})

export async function searchUsers(search: string) {
    try {
        const response = await axiosInstance.get(`/search/users?q=${search}`);
        return response.data.items;
    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function getUser(username: string) {
    try {
        const response = await axiosInstance.get(`/users/${username}`)
        return response.data
    } catch (err) {
        console.error(err)
    }
}

export async function getUserRepos(username: string) {
    try {
        const response = await axiosInstance.get(`/users/${username}/repos`)
        return response.data
    } catch (err) {
        console.error(err)
    }
}