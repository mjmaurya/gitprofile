import React from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";



const GitHubResume = ({ userProfile }) => {


    const DownloadPdf = () => {
        const resume = document.getElementById('resume')
        html2canvas(resume,{
            useCORS: true,
            allowTaint: true,
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png')
            console.log(imgData)
            const pdf = new jsPDF()
            pdf.addImage(imgData, 'JPEG', 0, 0)
            pdf.save('resume.pdf')
        })
        .catch(err => {
            console.log(err)
        })
    }
    return (
        <div className="container">
            <div className="row" id='resume'>
                <div className="col-md-3">
                    <div className="details" style={{textAlign:'center',backgroundColor:'#2a9d8f'}}>
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
                            <i className="fa fa-map-marker"> </i>
                            <span>{userProfile.location}</span>
                        </div>
                        <div className="block organisations">
                            <h4>Organisations</h4>
                            <hr />
                            <i className="fa fa-users"></i>
                            <span>{userProfile.company}</span>
                        </div>
                        

                    </div>

                </div>
                <div className="col-md-9">
                    <div className="more-details">
                    <div className='header'>
                        <h1 className='name'>{userProfile.name}</h1>
                    </div>
                    <div className='section'>
                        <h3>About</h3>
                    </div>
                    <div className='block'>
                        <p>{userProfile.bio}</p>
                    </div>
                    </div>
                </div>
            </div>
            <button className='download btn btn-primary' onClick={DownloadPdf}>Download</button>
        </div>
    );
}
export default GitHubResume;