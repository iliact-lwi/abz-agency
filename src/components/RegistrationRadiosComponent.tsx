import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { IRootState, IRegistrationRadiosComponent } from '../interfaces/interfaces';

import { getPositions } from '../redux/root/actions';

const RegistrationRadiosComponent: React.FunctionComponent<IRegistrationRadiosComponent> = ({onChange}) => {
    const dispatch = useDispatch();
    const positions = useSelector((state: IRootState) => state.positions);

    useEffect(() => {
        dispatch(getPositions());
    }, []);

    return (
        <Form onChange={onChange}>
            <Form.Group>
                {
                    positions.map(pos => {
                        return (
                            <Form.Check 
                            type="radio"
                            label={pos.name} 
                            key={pos.id} 
                            id={"position" + pos.id.toString()} 
                            name="positionsRadio"
                            value={pos.id} 
                            />
                        )
                    })
                }
            </Form.Group>
        </Form>
    );
}

export default RegistrationRadiosComponent;