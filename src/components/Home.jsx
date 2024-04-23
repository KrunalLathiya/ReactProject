import React from 'react';

function Home() {
    return (
        <div className="container">
            <h1>Welcome to the Admin Panel</h1>
            <p>This is the homepage of your React application's admin panel. Here you can manage all the main features of the app.</p>
            <div className="row mt-4">
                <div className="col-md-4">
                    <div className="card text-center bg-primary text-white mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Feature One</h5>
                            <p className="card-text">Quick summary or access point to a significant feature of your application.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center bg-success text-white mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Feature Two</h5>
                            <p className="card-text">An overview of another feature, such as statistics or active users.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center bg-warning text-dark mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Feature Three</h5>
                            <p className="card-text">Links to different sections of the admin panel or quick actions.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
