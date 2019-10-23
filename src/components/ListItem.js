import React, { Component } from 'react';
import classnames from 'classnames';
import './ListItem.css';

import check from '../imgs/check.svg';
import checked from '../imgs/checked.svg';

class ListItem extends Component {
    render() {
        const { item, onClick } = this.props;
        let img = item.isComplete ? checked : check;

        return (
            <div className={classnames('item', {
                    'item-complete': item.isComplete
            })}>
                <img
                    src={img}
                    alt=''
                    onClick={onClick} />
                <div>{item.title}</div>
            </div>
        );
    }
}

export default ListItem;