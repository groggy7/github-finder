import { useParams, useNavigate } from "react-router-dom";
import React from "react";
import { UserContext } from "../context/github/GithubContext";
import { FaCodepen, FaStore, FaUserFriends, FaUsers, FaArrowLeft, FaStar } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";
import { IoWarning } from "react-icons/io5";
import { getUser, getUserRepos } from "../context/github/GithubActions";
import spinner from "../assets/loading.svg"

export default function User() {
    const params = useParams()
    const {user, repos, loading, dispatch} = React.useContext(UserContext)
    const navigate = useNavigate()

    React.useEffect(() => {
        dispatch({ type: 'SET_LOADING' })
        async function getUserData() {
            if (params.login) {
                const user = await getUser(params.login)
                const repos = await getUserRepos(params.login)

                dispatch({type: 'SET_USER', user: user})
                dispatch({type: 'SET_REPOS', repos: repos})
            }
        }

        getUserData()
    }, [])

    React.useEffect(() => {
        return () => {
            dispatch({ type: 'CLEAR_USER'})
        }
    }, [])

    function handleBack() {
        dispatch({ type: 'CLEAR_USER'})
        navigate('..')
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <img src={spinner} alt="loading" width="40px" />
            </div>
        )
    }

    return user ? 
     <div className="flex flex-col justify-center mx-auto gap-6 py-2 px-4 w-full md:px-8">
        <button onClick={handleBack} className="btn btn-ghost self-start">
            <FaArrowLeft className="mr-2" />Back to Search
        </button>
        <div className="flex flex-wrap gap-8 md:flex-nowrap">
            <div className="relative">
                <img 
                    src={user.avatar_url} 
                    alt={`${user.login}'s avatar`} 
                    className="opacity-80 w-full max-w-80" 
                />
                <div className="absolute bottom-0 left-0 p-4 bg-black/50 rounded-tr-2xl">
                    <h2 className="text-white font-bold">{user.name}</h2>
                    <p className="text-white">{user.login}</p>
                </div>
            </div>
            <div className="flex flex-col justify-between gap-4">
                <div className="flex gap-4 items-end">
                    <h1 className="text-2xl">{user.name}</h1>
                    <div className="badge badge-soft badge-accent">{user.type}</div>
                    {user.hireable === true && <div className="badge badge-soft badge-info">Hireable</div>}
                </div>
                <p>{user.bio}</p>
                <a className="btn btn-outline self-start" href={user.html_url} target="_blank">VISIT GITHUB PROFILE</a>
                <div className="stats bg-gray-700">
                    <div className="stat">
                        <h3 className="stat-title">Location</h3>
                        <p className="stat-value text-lg">{user.location || "no info"}</p>
                    </div>
                    <div className="stat">
                        <h3 className="stat-title">Website</h3>
                        <a 
                            className="stat-value text-lg break-all overflow-hidden underline" 
                            href={user.blog && !user.blog.startsWith('http') ? `https://${user.blog}` : user.blog} 
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {user.blog || "no info"}
                        </a>
                    </div>
                    <div className="stat">
                        <h3 className="stat-title">Twitter</h3>
                        <p className="stat-value text-lg">{user.twitter_username || "no info"}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="stats grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1">
            <div className="stat relative p-4">
                <div className="stat-title pr-12">Followers</div>
                <div className="stat-value text-3xl pr-12">{user.followers}</div>
                <FaUsers className="text-4xl text-pink-500 absolute top-1/2 right-4 -translate-y-1/2" />
            </div>
            <div className="stat relative p-4">
                <div className="stat-title pr-12">Following</div>
                <div className="stat-value text-3xl pr-12">{user.following}</div>
                <FaUserFriends className="text-4xl text-pink-500 absolute top-1/2 right-4 -translate-y-1/2" />
            </div>
            <div className="stat relative p-4">
                <div className="stat-title pr-12">Public Repos</div>
                <div className="stat-value text-3xl pr-12">{user.public_repos}</div>
                <FaCodepen className="text-4xl text-pink-500 absolute top-1/2 right-4 -translate-y-1/2" />
            </div>
            <div className="stat relative p-4">
                <div className="stat-title pr-12">Public Gists</div>
                <div className="stat-value text-3xl pr-12">{user.public_gists}</div>
                <FaStore className="text-4xl text-pink-500 absolute top-1/2 right-4 -translate-y-1/2" />
            </div>
        </div>
        <ul className="list bg-base-100 rounded-box">
            <li className="p-4 pb-2 text-lg tracking-wide font-bold underline underline-offset-4">Latest Repositories</li>
            {
                repos.map(repo => (
                <li className="list-row" key={repo.id}>
                    <div className="flex flex-col gap-3">
                        <a href={repo.html_url} target="_blank" className="text-lg">{repo.name}</a>
                        {repo.description ?? <p className="m-0">{repo.description}</p>}
                        <div className="flex gap-4">
                            <div className="badge badge-soft badge-success"><FaStar /> {repo.watchers_count}</div>
                            <div className="badge badge-soft badge-error"><IoWarning /> {repo.open_issues_count}</div>
                            <div className="badge badge-soft badge-warning"><FaCodeFork /> {repo.forks_count}</div>
                        </div>
                    </div>
                </li>
                ))
            }
        </ul>
    </div>
    : null
}