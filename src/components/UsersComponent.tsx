import React, { MouseEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { showMoreUsers } from '../redux/root/actions';
import { IRootState } from '../interfaces/interfaces';

import UserComponet from './UserComponent';
import HintComponet from './HintComponent';
import ShowMoreButtonComponent from './ShowMoreButtonComponent';

interface coordsType {
    top: string;
    left: string;
}

const UsersComponent: React.FunctionComponent = () => {
    const [hintActive, setHintActive] = useState<boolean>(false);
    const [hintText, setHintText] = useState<string>('');
    const [hintCoords, setHintCoords] = useState<coordsType>({top: '0px', left: '0px'});

    const dispatch = useDispatch();
    const users = useSelector((state: IRootState) => state.users);
    const usersActions = useSelector((state: IRootState) => state.usersActions);

    useEffect(() => {
        dispatch(showMoreUsers());
    }, []);

    const clickHandler = () => {
        dispatch(showMoreUsers());
    }

    const onMouseOverHandler = (event: MouseEvent<HTMLDivElement>) => {
        const target: any = event.target;
        const hint = target.dataset.hint;

        if(!hint) return;

        const coords = target.getBoundingClientRect();

        let top = coords.top - 40;

        if(top < 60) {
            top = coords.bottom + 5;
        }
        const left = coords.left;

        setHintText(hint);
        setHintCoords({top: top + 'px', left: left + 'px'});
        setHintActive(true);
    }

    const onMouseOutHandler = () => {
        setHintActive(false);
        setHintText('');
        setHintCoords({top: '0px', left: '0px'});
    }

    return (
        <div className="users-block">
            <div className="users-group-title">
                <div className="users-title">
                    Our cheerful users
                </div>
                <div className="users-subtitle">
                    Attention! Sorting users by registration date
                </div>
            </div>
            <div className="users-group-users" onMouseOver={onMouseOverHandler} onMouseOut={onMouseOutHandler}>
                {
                    users.map(user => {
                        return (
                            <UserComponet key={user.id} name={user.name} photo={user.photo} phone={user.phone} email={user.email} position={user.position} />
                        )
                    })
                }
            </div>
            
            {
                usersActions.showButton ?  <ShowMoreButtonComponent onClick={clickHandler} /> : null
            }

            {
                hintActive ? <HintComponet hintText={hintText} coords={hintCoords}/> : null
            }
        </div>
    );
}

export default UsersComponent;