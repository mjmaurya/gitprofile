import React, { useState } from "react";
import axios from 'axios'
import { Alert } from 'reactstrap';
import GitHubResume from "./components/Resume";
import Loading from "./components/Loading";
const Home = () => {
    const ACCESS_TOKEN = process.env.REACT_APP_GITHUB_ACCESS_TOKEN;
    const [isData, setIsData] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [userProfile, setUserProfile] = useState({})
    const [userRepo, setUserRepo] = useState({})
    const [username, setUsername] = useState("")

    const fetchRepo = async (totalPages) => {
        try {
            let userrepo= new Array()
            for (let i = 1; i <= totalPages; i++) {
                const response = await axios.get(`https://api.github.com/users/${username}/repos?page=${i}&per_page=100`, {
                    headers: {
                        'Authorization': `token ${ACCESS_TOKEN}`
                        }
                        });
                userrepo.push(...response.data)
            }
            setUserRepo(userrepo)

        } catch (error) {
            setError(error.message)
        }
    }
    const fetchData = async () => {
        setIsData(true)
        const userdata = await axios.get(`https://api.github.com/users/${username}`, {
            headers: {
                'Authorization': `token ${ACCESS_TOKEN}`
                }
                })
        const totalRepo =userdata.data.public_repos;
        const perPage = 100;
        const totalPages = Math.ceil(totalRepo / perPage);
        await fetchRepo(totalPages)
        if(userdata.data.login){
            setUserProfile(userdata.data)
            setError("")
        }
    }
    const handleChange = ev => {
        setUsername(ev.target.value)
    }
    const handleSubmit = () => {
        setError("");
        setIsLoading(true)
        fetchData()
        .then(()=>{
            setIsLoading(false)
        }
        )
        .catch((err) => {
            setError(err['response']['data']['message'])
        })
    }


    return (
        <div className="container-fluid main">
            <div className="row">
                <div className="col-sm-4">
                </div>
                <div className="col-sm-4">
                    <div className="p-1 bg-light rounded rounded-pill shadow-sm mt-4 mb-4">
                        <div className="input-group">
                            <input type="search" placeholder="What're you searching for?" value={username} onChange={handleChange} aria-describedby="button-addon1" className="form-control border-0 bg-light" />
                            <div className="input-group-append">
                                <button id="button-addon1" type="submit" onClick={handleSubmit} className="btn btn-link text-primary"><i className="fa fa-search"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                </div>
            </div>
            {
                !isData?<div style={{textAlign:"center"}}>
                    <img src='/home.png' className="img-fluid" alt="Responsive image"  width="500px"/>

                </div>
                :
                error?<Alert color="danger">{error}</Alert>
                :
                isLoading?<Loading/>
                :
                <div className="container">
                    <GitHubResume userProfile={userProfile} userRepo={userRepo}/>
                </div>
            }

        </div>
    )
}
export default Home;