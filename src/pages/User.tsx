import { useParams, Link } from "react-router-dom";
import React from "react";
import { UserContext } from "../context/github/GithubContext";
import { FaCodepen, FaStore, FaUserFriends, FaUsers, FaArrowLeft, FaStar } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";
import { IoWarning } from "react-icons/io5";

export default function User() {
    const params = useParams()
    const {user, repos, getUser, getUserRepos} = React.useContext(UserContext)

    React.useEffect(() => {
        if (params.login) {
            getUser(params.login);
            getUserRepos(params.login);
        }
    }, [])

    return user ? 
     <div className="flex flex-col gap-8 w-10/12 mx-auto p-8">
        <Link to=".." className="btn btn-ghost self-start ml-2.5"><FaArrowLeft className="mr-2" />Back to Search</Link>
        <div className="flex gap-8 px-6">
            <div className="relative">
                <img 
                    src={user.avatar_url} 
                    alt={`${user.login}'s avatar`} 
                    className="w-68 opacity-80" 
                />
                <div className="absolute bottom-0 left-0 p-4 bg-black/50 rounded-tr-2xl">
                    <h2 className="text-white font-bold">{user.name}</h2>
                    <p className="text-white">{user.login}</p>
                </div>
            </div>
            <div className="flex flex-col justify-between">
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
                            className="stat-value text-lg" 
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
        <div className="stats">
            <div className="stat relative p-4">
                <div className="stat-title">Followers</div>
                <div className="stat-value text-3xl">{user.followers}</div>
                <FaUsers className="text-4xl text-pink-500 absolute top-1/2 right-4 -translate-y-1/2" />
            </div>
            <div className="stat relative p-4">
                <div className="stat-title">Following</div>
                <div className="stat-value text-3xl">{user.following}</div>
                <FaUserFriends className="text-4xl text-pink-500 absolute top-1/2 right-4 -translate-y-1/2" />
            </div>
            <div className="stat relative p-4">
                <div className="stat-title">Public Repos</div>
                <div className="stat-value text-3xl">{user.public_repos}</div>
                <FaCodepen className="text-4xl text-pink-500 absolute top-1/2 right-4 -translate-y-1/2" />
            </div>
            <div className="stat relative p-4">
                <div className="stat-title">Public Gists</div>
                <div className="stat-value text-3xl">{user.public_gists}</div>
                <FaStore className="text-4xl text-pink-500 absolute top-1/2 right-4 -translate-y-1/2" />
            </div>
        </div>
        <div className="">
            <ul className="list bg-base-100 rounded-box shadow-md border">
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
    </div>
    : null
}