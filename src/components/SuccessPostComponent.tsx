import React from 'react';
import { Alert } from 'react-bootstrap';

const SuccessPostComponent: React.FunctionComponent = () => {
    return (
        <Alert variant="success" className="registration-post-success">Form submitted successfully</Alert>
    );
}

export default SuccessPostComponent;