import React from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";



const GitHubResume = ({ userProfile,userRepo }) => {
    console.log(userProfile);
    userRepo.sort((a,b)=>{
        return a.stargazers_count>b.stargazers_count?-1:1
    })
    const topRepo = userRepo.slice(0,10)
    let languages=[]
    let starCounts=0
    userRepo.map((repo)=>{
        starCounts+=repo.stargazers_count
        if(repo.language){
            if (languages.indexOf(repo.language.toUpperCase()) === -1) {
                languages.push(repo.language.toUpperCase())
            }
        }
    });
    const DownloadPdf = () => {
        const resume = document.getElementById('resume')
        html2canvas(resume,{
            useCORS: true,
            allowTaint: true,
            scale: 1.1
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF()
            pdf.addImage(imgData, 'JPEG', 0, 0)
            pdf.save('resume.pdf')
        })
        .catch(err => {
            alert('Something went wrong, please try again')
        })
    }
    return (
        <div className="container">
            <div className="row" id='resume'>
                <div className="col-md-3">
                    <div className="details">
                        <div className="avatar">
                            <img src={userProfile.avatar_url} alt={userProfile.name} className="img-fluid" />
                            <p className="name">{userProfile.name}</p>
                        </div>
                        <div className="block follow">
                            <hr />
                            <div className="row">
                                <div className="col-md-6">
                                <span>Followers: </span>
                                    <span>{userProfile.followers}</span>
                                    </div>
                                <div className="col-md-6">
                                    
                                <span>Following: </span>
                                    <span>{userProfile.following}</span>
                                    </div>
                            </div>
                        </div>
                        <div className="block">
                            <hr />
                            <div className="row">
                                <div className="col-md-6">
                                <span>Public Repos: </span>
                                    <span>{userProfile.public_repos}</span>
                                    </div>
                                <div className="col-md-6">
                                <span>GitHub Stars: </span>
                                    <span>{starCounts}</span>
                                    </div>
                            </div>
                        </div>
                        <div className="block">
                        <hr />
                            <i className="fa fa-map-marker"> </i>
                            <span>{userProfile.location}</span>
                        </div>
                        <div className="block">
                            <h4>Organisations</h4>
                            <hr />
                            <i className="fa fa-users"></i>
                            <span>{userProfile.company}</span>
                        </div>
                        

                    </div>

                </div>
                <div className="col-md-6">
                    <div className="more-details">
                    <div className='header'>
                        <h1 className='name'>{userProfile.name}</h1>
                        <p className="login">@{userProfile.login}</p>
                    </div>
                    <div className='section'>
                        <h3>About</h3>
                    </div>
                    <div className='block'>
                        <p>{userProfile.bio}</p>
                    </div>
                    {
                        languages.length>0?
                        <div>
                            <div className='section'>
                        <h3>Skills</h3>
                    </div>
                    <div className='block'>
                            {
                                languages.map((language)=><span className='skill_data'>{language}</span>)
                            }
                    </div>
                        </div>
                        :null
                    }
                    {
                        topRepo.length>0?
                        <div>
                            <div className='section'>
                        <h3>Top Repositories</h3>
                    </div>
                    <div className='block'>
                            {
                                topRepo.map((repo)=><div className='repo_data'>
                                    <a href={repo.html_url} target='_blank' rel='noopener noreferrer'><i className='fa fa-folder'></i> {repo.name.replace(/[-]/g,' ')}</a>
                                </div>)
}
                    </div>
                        </div>
                        :null
                    }
                    {/* Social Links */}
                    <div className='section'>
                        <h3>Social Links</h3>
                    </div>
                    <div className='block'>
                        <div className='social'>
                            { userProfile.blog?<p><a className='social-links blog' href={userProfile.blog} target='_blank' rel='noopener noreferrer'><i className='fa fa-rss'></i></a>
                            {userProfile.blog}</p>:null}
                            { userProfile.email?<p><a className='social-links email' href={`mailto:${userProfile.email}`}><i className='fa fa-envelope'></i></a>
                            {userProfile.email}</p>:null}
                            { userProfile.twitter_username?<p><a className='social-links twitter' href={`https://twitter.com/${userProfile.twitter_username}`} target='_blank' rel='noopener noreferrer'><i className='fa fa-twitter'></i></a>
                            {`https://twitter.com/${userProfile.twitter_username}`}</p>:null}
                            { userProfile.html_url? <p><a className='social-links github' href={`${userProfile.html_url}`} target='_blank' rel='noopener noreferrer'><i className='fa fa-github'></i></a>
                            {userProfile.html_url}</p>:null}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className="row download-section">
                <div className="col-md-12">
                <button className='download btn btn-primary' onClick={DownloadPdf} > Download PDF <i className="fa fa-download"></i></button>
                </div>
            </div>
        </div>
    );
}
export default GitHubResume;