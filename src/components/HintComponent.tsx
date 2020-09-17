import React, { Component } from 'react';
import { IHintComponent } from '../interfaces/interfaces'

class HintComponet extends Component<IHintComponent, {}> {
    constructor(props: IHintComponent) {
        super(props);
    }

    render() {
        return (
            <div className="user-hint" style={{top: this.props.coords.top, left: this.props.coords.left}}>
                { this.props.hintText }
            </div>
        )
    } 
}

export default HintComponet;