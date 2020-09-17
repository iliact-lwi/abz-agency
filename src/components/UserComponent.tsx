import React from 'react';
import { Image } from 'react-bootstrap';
import { IUserComponent } from '../interfaces/interfaces';

const UserComponent: React.FunctionComponent<IUserComponent> = (props) => {


    return (
        <div className="user-card">
            <Image src={props.photo} roundedCircle className="user-card-image"/>
            <div className="user-group-text">
                <div className="user-card-title" data-hint={props.name}>{props.name}</div>
                <div className="user-card-text" data-hint={props.position}>{props.position}</div>
                <div className="user-card-text" data-hint={props.email}>{props.email}</div>
                <div className="user-card-text" data-hint={props.phone}>{props.phone}</div>
            </div>
        </div>
    );
}

export default UserComponent;