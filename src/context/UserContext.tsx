import React from "react"

export interface GithubUser {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    user_view_type: string;
}

type UserContextType = {
    users: GithubUser[]
}

export const UserContext = React.createContext<UserContextType>({users: []})

export default function UserProvider({ children }: { children: React.ReactNode }) {
    const [users, setUsers] = React.useState<GithubUser[]>([])

    React.useEffect(() => {
        fetch("https://api.github.com/users", {
            headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}` ,
                'Accept': 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        .then(res => res.json())
        .then(data => setUsers(data))
    }, [])

  return <UserContext.Provider value={{users}}>
    {children}
  </UserContext.Provider>
}