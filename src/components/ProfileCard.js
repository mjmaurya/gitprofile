import axios from "axios";
import React, { useState } from "react";
import html2canvas from 'html2canvas';
import Loading from "./Loading";

const userProfile = {
    login: 'mjmaurya', id: 45433443, node_id: 'MDQ6VXNlcjQ1NDMzNDQz',
    avatar_url: "https://avatars.githubusercontent.com/u/45433443?v=4",
    bio: "Full-Stack Developer",
    blog: "https://linktr.ee/mjmaurya",
    company: "@CodeyScript ",
    created_at: "2018-11-28T17:15:34Z",
    email: "gcssm1999@gmail.com",
    events_url: "https://api.github.com/users/mjmaurya/events{/privacy}",
    followers: 21,
    followers_url: "https://api.github.com/users/mjmaurya/followers",
    following: 28,
    following_url: "https://api.github.com/users/mjmaurya/following{/other_user}",
    gists_url: "https://api.github.com/users/mjmaurya/gists{/gist_id}",
    gravatar_id: "",
    hireable: true,
    html_url: "https://github.com/mjmaurya",
    id: 45433443,
    location: "Patna",
    login: "mjmaurya",
    name: "Manoj Kumar",
    node_id: "MDQ6VXNlcjQ1NDMzNDQz",
    organizations_url: "https://api.github.com/users/mjmaurya/orgs",
    public_gists: 0,
    public_repos: 81,
    received_events_url: "https://api.github.com/users/mjmaurya/received_events",
    repos_url: "https://api.github.com/users/mjmaurya/repos",
    site_admin: false,
    starred_url: "https://api.github.com/users/mjmaurya/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/mjmaurya/subscriptions",
    twitter_username: "import_manoj",
    type: "User",
    updated_at: "2022-05-13T18:40:35Z",
    url: "https://api.github.com/users/mjmaurya"
}
const ProfileCard = () => {
    const ACCESS_TOKEN = process.env.REACT_APP_GITHUB_ACCESS_TOKEN;
    const [userProfiles, setuserProfiles] = useState(userProfile)
    const [headeColor, setHeaderColor] = useState("#000")
    const [imageRadius, setImageRadius] = useState("50")
    const [username, setUsername] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const handleChange = (ev) => {
        setUsername(ev.target.value)
    }
    const handleSubmit = () => {
        setError("")
        setIsLoading(true)
        axios.get(`https://api.github.com/users/${username}`, {
            headers: {
                'Authorization': `token ${ACCESS_TOKEN}`
            }
        })
            .then(response => {
                setuserProfiles(response.data)
                setIsLoading(false)
            })
            .catch(error => {
                setError(error.message)
                setIsLoading(false)
                setuserProfiles(userProfile)
                alert("User Not Found")
            })
    }



    const downloadImage = () => {
        const element = document.getElementById("profile-card");
        html2canvas(element,
            {useCORS: true,
            allowTaint: true})
            .then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            var a=document.createElement('a');
            a.href = imgData;
            a.download = 'profile-card.png';
            a.click();
        });

    }
    return (
        
        <div className="container main">
            <div className="row">
                <div className="col-sm-4">
                </div>
                <div className="col-sm-4">
                    <div className="p-3">
                        <p className="h4 font-weight-normal">Enter Your username</p>
                    </div>
                    <div className="p-1 bg-light rounded rounded-pill shadow-sm mt-4 mb-4">
                        <div className="input-group">
                            <input type="search" placeholder="username" value={username} onChange={handleChange} aria-describedby="button-addon1" className="form-control border-0 bg-light" />
                            <div className="input-group-append">
                                <button id="button-addon1" type="submit" onClick={handleSubmit} className="btn btn-link text-primary"><i className="fa fa-search"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                </div>
            </div>
            {isLoading ? <Loading/> :
            <div className="row">
                <div className="col-md-6">
                    <div className="customize">
                        <div >
                            <h3>Customize</h3>
                        </div>
                        <div className="form-group m-2">
                            <label htmlFor="exampleFormControlSelect1">Header Color</label>
                            <input type="color" className="form-control mt-2" value={headeColor} onChange={(e) => setHeaderColor(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">Image Radius</label>
                            <input className="form-control mt-2" type="range" min="0" max="100" value={imageRadius} onChange={(e) => setImageRadius(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card-details">
                        <div className="profile" id="profile-card">
                            <div className="profile-header" style={{ backgroundColor: headeColor }}>
                            </div>
                            <div className="profile-img">
                                <img src={userProfiles.avatar_url} style={{ backgroundColor: headeColor, borderRadius: `${imageRadius}%` }} alt={userProfiles.name} className="img-fluid" />
                            </div>
                            <div className="profile-body">
                                <div className="profile-name">
                                    <h3 className="name">{userProfiles.name}</h3>
                                    <p className="login">@{userProfiles.login}</p>
                                </div>
                                <div className="profile-bio">
                                    <p>{userProfiles.bio}</p>
                                </div>
                                <div className="followers">
                                    <div className="row">
                                        <div className="col-4">
                                            <div className="followers-count-button">
                                                <p>Followers</p>
                                                <p>{userProfiles.followers}</p>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="followers-count-button">
                                                <p>Following</p>
                                                <p>{userProfiles.following}</p>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="followers-count-button">
                                                <p>Repos</p>
                                                <p>{userProfiles.public_repos}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-links">
                                    {userProfiles.blog ? <a className="blog" href={userProfiles.blog} target="_blank" rel="noopener noreferrer"><i className="fa fa-link"></i></a> : null}
                                    {userProfiles.email ? <a className="email" href={`mailto:${userProfiles.email}`}><i className="fa fa-envelope"></i></a> : null}
                                    {userProfiles.html_url ? <a className="github" href={userProfiles.html_url} target="_blank" rel="noopener noreferrer"><i className="fa fa-github"></i></a> : null}
                                    {userProfiles.twitter_username ? <a className="twitter" href={`https://twitter.com/${userProfiles.twitter_username}`} target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter"></i></a> : null}
                                </div>
                            </div>
                        </div>

                        <div className="profile-footer">
                            <div className="download">
                                <button className="btn btn-primary" onClick={downloadImage}>Download</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}
        </div>
    );
};
export default ProfileCard;