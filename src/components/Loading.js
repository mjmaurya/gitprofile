import React from "react";

const Loading = () => {
    return (
        <div className="container">
        <div className="row">
            <div className="col-md-12">
            <div className="loading">
                <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    };
    export default Loading;