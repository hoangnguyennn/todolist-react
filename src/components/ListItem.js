import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

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
            })} >
                <img
                    src={img}
                    alt=''
                    onClick={onClick} />
                <div>{item.title}</div>
            </div>
        );
    }
}

ListItem.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string,
        isComplete: PropTypes.bool
    }),
    onClick: PropTypes.func
}

export default ListItem;