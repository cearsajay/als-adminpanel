import React from 'react';

import logo from '../../assets/img/logo.png';
import topleft from '../../assets/img/top-left.svg';
import right1 from '../../assets/img/right1.svg';
import topright from '../../assets/img/bottom-left.svg';
import right2 from '../../assets/img/right2.svg';
import { Link } from 'react-router-dom';

const ComingSoon = () => {

    return (
        <>
            <div className="full-page">
                <div className="coming-soon-part">
                    <div className="cornerimages-sc">
                        <img src={topleft} alt="corner one" class="react-reveal" />
                        <img src={right1} alt="corner one" class="react-reveal" />
                        <img src={topright} alt="corner one" class="react-reveal" />
                        <img src={right2} alt="corner one" class="react-reveal" />
                    </div>
                    <div className="container-sc">
                        <div className="mainContentSection-sc text-center">
                            <div className="cs-logo mb-5">
                                <img src={logo} className="img-fluid" alt="logo" />
                            </div>
                            <h1>Coming Soon</h1>
                            <h2 className="text-muted">We are launching soon please reload after days.</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ComingSoon;
