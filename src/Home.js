import React, { useState } from "react";
import axios from 'axios'
import { Alert } from 'reactstrap';
import GitHubResume from "./components/Resume";
const Home = () => {
    const [isData, setIsData] = useState(false);
    const [error, setError] = useState("");
    const [userProfile, setUserProfile] = useState({})
    const [userRepo, setUserRepo] = useState({})
    const [username, setUsername] = useState("")

    const fetchData = async () => {
        const userdata = await axios.get(`https://api.github.com/users/${username}`)
        const userrepo = await axios.get(` https://api.github.com/users/${username}/repos`)
        setIsData(true)
        console.log(userdata.data)
        if(userdata.data.login){
            setUserProfile(userdata.data)
            setUserRepo(userrepo.data)
            setError("")
        }
    }
    const handleChange = ev => {
        setUsername(ev.target.value)
    }
    const handleSubmit = () => {
        fetchData()
        .then(
            console.log(userProfile)
        )
        .catch((err) => {
            setError(err['response']['data']['message'])
        })
    }


    return (
        <div className="container">
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
                !isData?<div>No Data</div>
                :
                error?<Alert color="danger">{error}</Alert>
                :
                <div className="container">
                    <GitHubResume userProfile={userProfile} userRepo={userRepo}/>
                </div>
            }

        </div>
    )
}
export default Home;