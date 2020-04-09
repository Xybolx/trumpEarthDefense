import React from 'react';

const SpecialAlert = props => {

    return (
        <div style={ !props.isOpen ? { display: "none", fontSize: "12px" } : { maxWidth: "540px", display: "block", fontSize: "15px" } } id="shame-alert" role="alert" className="alert alert-warning alert-dismissible fade show container">
            <div className="card mb-3" style={{maxWidth: "540px"}}>
                <div className="row no-gutters">
                    <div className="col-md-4 alert-img">
                        <img width="35%" height="35%" className="img-fluid" src="suprise.png" alt="Trump" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <p className="card-text">{props.message}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="row">
                <div className="col-md-6 alert-img jumbotron">
                    <img style={{ width: 50, height: 50 }} className="img-fluid" src="suprise.png" alt="Trump" />
                </div>
                <div className="col-md-6 jumbotron">
                    <small className="xx-small">
                        {props.message}
                    </small>
                </div>
            </div> */}
        </div>
    );
};

export default SpecialAlert;
