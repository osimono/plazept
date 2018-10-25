import React, {Component} from 'react';

export default class ItemDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            somethingChanged: false,
            name: "",
            unit: "",
            unique: {id: -1}
        }


        this.nameChanged = this.nameChanged.bind(this)
        this.unitChanged = this.unitChanged.bind(this)
        this.updateItem = this.updateItem.bind(this)

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            somethingChanged: false,
            name: nextProps.item.name ? nextProps.item.name : "",
            unit: nextProps.item.unit ? nextProps.item.unit : "",
            unique: nextProps.item.unique ? nextProps.item.unique : {id: -1}
        })
    }

    render() {
        return (

            <div className="card">
                <header className="card-header">
                    <p className="card-header-title" style={this.headerStyle()}>
                        {this.props.item.name}
                    </p>
                </header>
                <div className="card-content">
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Text input"
                                   value={this.state.name} onChange={this.nameChanged}/>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Unit</label>
                        <div className="control">
                            <div className="select">
                                <select value={this.state.unit} onChange={this.unitChanged}>
                                    {this.renderUnits()}
                                </select>
                            </div>
                        </div>
                    </div>

                    <a className={this.saveButtonStyle()}
                       disabled={!this.state.somethingChanged}
                       onClick={this.updateItem}>Save</a>

                </div>
            </div>
        );
    }

    updateItem() {
        let updatedItem = {name: this.state.name, unit: this.state.unit, unique: this.state.unique};
        this.props.onUpdate(updatedItem);
    }

    renderUnits() {
        let key = 0;
        let units = ["", "gramm", "milliliter", "pieces"]
        return units.map(i => <option key={"unit" + key++}>{i}</option>)
    }

    nameChanged(event) {
        this.setState({
            somethingChanged: true,
            name: event.target.value
        });
    }

    unitChanged(event) {
        this.setState({
            somethingChanged: true,
            unit: event.target.value
        });
    }

    saveButtonStyle() {
        let style = "button";
        if (this.state.somethingChanged) {
            style += " is-primary";
        }
        return style;
    }

    headerStyle() {
        let bgColor = this.state.somethingChanged ? "#00d1b2" : "white";
        let col = this.state.somethingChanged ? "white" : "black";
        return {backgroundColor: bgColor, color: col}
    }
}