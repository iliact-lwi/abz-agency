import React from 'react';
import { Button } from 'react-bootstrap';
import { IShowMoreButtonComponentProps } from '../interfaces/interfaces';

const ShowMoreButtonComponent: React.FunctionComponent<IShowMoreButtonComponentProps> = ({onClick}) => {
    return (
        <div className="user-button-block">
            <Button variant="primary" className="user-button" onClick={onClick}>Show more</Button>
        </div>
    );
}

export default ShowMoreButtonComponent;