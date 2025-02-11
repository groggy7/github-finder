import { Link } from "react-router-dom";
import { GithubUser } from "../context/github/GithubReducer";

type UserCardProps = {
    user: GithubUser
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="flex flex-row gap-4 shadow-lg p-2 rounded-xl">
        <img src={user.avatar_url} alt={`${user.login}'s avatar`} className="w-16 rounded-full" />
        <div className="flex flex-col gap-2">
            <h3>{user.login}</h3>
            <Link to={`/user/${user.login}`} className="opacity-60">Visit Profile</Link>
        </div>
    </div>
  )
}