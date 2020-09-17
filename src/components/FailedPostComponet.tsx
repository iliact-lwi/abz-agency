import React from 'react';
import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { IRootState } from '../interfaces/interfaces';

const FailedPostComponent: React.FunctionComponent = () => {
    const failed = useSelector((state: IRootState) => state.validation.postFailed);

    return (
        <Alert variant="danger" className="registration-post-failed"> { failed } </Alert>
    );
}

export default FailedPostComponent;