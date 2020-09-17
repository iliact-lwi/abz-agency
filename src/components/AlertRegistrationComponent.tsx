import React from 'react';
import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { IRootState } from '../interfaces/interfaces';

const AlertRegistrationComponent: React.FunctionComponent = () => {
    const alert = useSelector((state: IRootState) => state.validation.showAlert);


    return (
        <Alert variant="primary" className="registration-alert">
            <Alert.Heading>Validation error</Alert.Heading>
            <p>
                { alert }
            </p>
        </Alert>
    );
}

export default AlertRegistrationComponent;