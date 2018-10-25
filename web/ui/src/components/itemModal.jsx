import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ItemModal extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            newItemName: ""
        }

        this.show = this.show.bind(this);
        this.isActive = this.isActive.bind(this);
        this.newItemEntered = this.newItemEntered.bind(this);
        this.saveNewItem = this.saveNewItem.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            show: nextProps.active
        })
    }

    render() {
        return (
            <div className={this.isActive()}>
                <div className="modal-background"/>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Add a new Item</p>
                        <button className="delete" aria-label="close"
                                onClick={this.show.bind(this, false)}/>
                    </header>
                    <section className="modal-card-body">
                        <div className="field">
                            <label className="label">Item Name</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Text input"
                                       value={this.state.newItemName} onChange={this.newItemEntered}/>
                            </div>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success" onClick={this.saveNewItem}>Save changes</button>
                        <button className="button" onClick={this.show.bind(this, false)}>Cancel</button>
                    </footer>
                </div>
            </div>
        );
    }

    isActive() {
        let className = "modal";
        if (this.state.show) {
            className += " is-active";
        }
        return className
    }

    show(show) {
        this.setState({
            show: show
        })
    }

    newItemEntered(event) {
        this.setState({
            newItemName: event.target.value
        })
    }

    saveNewItem() {
        let newItem = {name: this.state.newItemName};
        this.props.onSave(newItem);
        this.show(false);
    }
}

ItemModal.propTypes = {
    active: PropTypes.bool,
    selected: PropTypes.bool,
    onSave: PropTypes.func
};

