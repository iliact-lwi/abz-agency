import React from 'react';

import manLaptop from '../images/man-laptop-v1.svg';

import { Button } from 'react-bootstrap';

const AcquaintanceComponent: React.FunctionComponent = () => {
    return (
        <div className="acquaintance-block">
            <div>
                <div className="acquaintance-title">
                    Let's get acquainted
                </div>
            </div>
            <div className="acquaintance-group">
                <div className="padding-block">
                    <div className="acquaintance-block-image">
                        <img src={ manLaptop } className="acquaintance-image" alt="man-laptop" />
                    </div>
                </div> 
                <div className="acquaintance-text-group">
                    <div className="acquaintance-title-text">
                        I am cool frontend developer
                    </div>
                    <div className="acquaintance-text">
                        We will evaluate how clean your approach to writing CSS and Javascript code is. You can use any CSS and Javascript 3rd party libraries without any restriction.
                    </div>
                    <div className="acquaintance-text">
                        If 3rd party css/javascript libraries are added to the project via bower/npm/yarn you will get bonus points. If you use any task runner (gulp/webpack) you will get bonus points as well. Slice service directory page P​SD mockup​ into HTML5/CSS3. 
                    </div>
                    <Button variant="light" className="acquaintance-button" href="#reg">
                        Sign up now
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default AcquaintanceComponent;