import React, {Component} from 'react';
import PropTypes from 'prop-types';


export default class ItemMenuEntry extends Component {

    render() {
        return (
            <li onClick={this.props.onSelect} style={this.styleItem()}>
                <a>
                    <div className="level">
                        <div className="level-left">
                            <div className="level-item">
                                <div style={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxWidth: "350px",
                                    maxHeight: "25px"
                                }}>{this.props.name}</div>
                            </div>
                        </div>
                    </div>
                </a>
            </li>
        );
    }

    styleItem() {
        if (this.props.selected) {
            console.log("selected", this.props.name);
            return {backgroundColor: "#f5f5f5"}
        }
        return {};
    }
}

ItemMenuEntry.propTypes = {
    name: PropTypes.string,
    onSelect: PropTypes.func
};