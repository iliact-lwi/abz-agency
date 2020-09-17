import React from 'react';

import { Button } from 'react-bootstrap';

const IntroductionComponent: React.FunctionComponent = () => {
    return (
        <div className="introduction-block">
            <div className="introduction-title">
                Test assignment for Frontend Developer position
            </div>
            <div className="introduction-text"></div>
            <Button variant="primary" className="introduction-button" href="#reg">
                Sign up now
            </Button>
        </div>
    )
}

export default IntroductionComponent;