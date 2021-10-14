import React from 'react';

import notFound from '../../assets/img/page/404.svg';
import { Link } from 'react-router-dom';

const NotFound = () => {

    return (
        <>
            <div className="error-page">
                <div className="error-page-content">
                    <div className="error-img">
                        <div className="error-img-code">404</div>
                        <img src={notFound} alt="Test" />
                    </div>
                    <h1>Oops!</h1>
                    <h3>We can't seem to find the page you're looking for</h3>
                    <p className="text-muted mb-2">
                        Here are some helpful links instead:
                    </p>

                    <Link exact to="/" className="btn btn-primary"> Go to Homepage </Link>
                </div>
            </div>
        </>
    );
}

export default NotFound;
