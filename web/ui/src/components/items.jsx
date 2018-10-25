import React, {Component} from 'react';
import ItemDetails from "./itemDetails";
import ItemMenuEntry from "./itemMenuEntry";
import ItemModal from "./itemModal";

export default class Items extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            filteredItems: [],
            filterActive: false,
            selectedItem: {},
            showNewItemModal: false,
        };

        this.updateItem = this.updateItem.bind(this);
        this.storeItem = this.storeItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.isSelected = this.isSelected.bind(this);
    }

    render() {
        return (
            <section className="section">
                <div className="columns">
                    <div className="column is-3 box">
                        <div className="level">
                            <div className="level-left">
                                <div className="level-item">
                                    <div className="field has-addons">
                                        <p className="control has-icons-left">
                                            <input className="input" type="text" placeholder="Find item"
                                                   onChange={this.filterChange}/>
                                            <span className="icon is-small is-left">
                                                <i className="fa fa-search"/>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="level-right">
                                <div className="level-item">
                                    <a className="button is-primary" onClick={this.showNewItemModal.bind(this, true)}>
                                        <span className="icon">
                                          <i className="fa fa-plus-circle"/>
                                        </span>
                                        <span>Add item</span>
                                    </a>
                                </div>
                                <div className="level-item">
                                    <div className="button is-danger is-outlined"
                                         disabled={this.isEmpty(this.state.selectedItem)}
                                         onClick={this.deleteItem}>
                                    <span className="icon is-small">
                                      <i className="fa fa-trash"/>
                                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <aside className="menu">
                            <p className="menu-label">
                                All Items
                            </p>
                            <ul className="menu-list">
                                {this.renderItemList()}
                            </ul>
                        </aside>
                    </div>
                    <div className="column is-9">
                        <ItemDetails item={this.state.selectedItem} onUpdate={this.updateItem}
                                     onNewItem={this.storeItem}/>
                    </div>
                </div>

                < ItemModal active={this.state.showNewItemModal} onSave={this.storeItem}/>
            </section>
        );
    }

    componentWillMount() {
        this.fetchItems()
    }

    fetchItems() {
        fetch("/api/items")
            .then(response => response.json())
            .then(items => this.setState({
                items: items,
            }));
    }

    renderItemList() {
        let itemList = this.state.items;
        if (this.state.filterActive) {
            itemList = this.state.filteredItems;
        }

        let key = 0;
        return itemList.map(
            i => <ItemMenuEntry name={i.name} key={key++} selected={this.isSelected(i)}
                                onSelect={this.itemSelected.bind(this, i)}
                                onDelete={this.deleteItem.bind(this, i)}/>)
    }

    isSelected(i) {
        if (this.isEmpty(this.state.selectedItem)) {
            return "";
        }
        return i.unique.id === this.state.selectedItem.unique.id;
    }

    itemSelected(item) {
        this.setState({
            selectedItem: item
        });
        this.renderItemList()
    }

    updateItem(updatedItem) {
        let items = this.state.items;
        let indexOfUpdatedItem = -1;
        for (let i = 0; i < items.length; i++) {
            if (items[i].unique.id === updatedItem.unique.id) {
                indexOfUpdatedItem = i;
                break;
            }
        }
        items[indexOfUpdatedItem] = updatedItem;
        this.setState({
            items: items,
            selectedItem: updatedItem
        });

        if (this.state.filterActive) {
            let filteredItems = this.state.filteredItems;
            let indexOfUpdatedItem = -1;
            for (let i = 0; i < filteredItems.length; i++) {
                if (filteredItems[i].unique.id === updatedItem.unique.id) {
                    indexOfUpdatedItem = i;
                    break;
                }
            }
            filteredItems[indexOfUpdatedItem] = updatedItem;
            this.setState({
                filteredItems: filteredItems
            })
        }

        /* store on server....*/
        fetch("/api/items", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(updatedItem)
            }
        )
            .then(response => response.json())
    }

    storeItem(newItem) {
        let that = this;
        fetch("/api/items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(newItem)
            }
        )
            .then(response => response.json())
            .then((itemWithId) => {
                that.fetchItems();
                that.itemSelected(itemWithId);
                that.showNewItemModal(false);
            })
    }

    deleteItem() {
        let that = this;
        let item = this.state.selectedItem
        if (window.confirm('Are you sure you wish to delete this item?\n' + item.name)) {
            fetch("/api/items", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    body: JSON.stringify(item)
                }
            )
                .then(() => {
                        that.fetchItems();
                        that.setState({
                            selectedItem: {}
                        })
                    }
                )
        }
    }

    showNewItemModal(active) {
        this.setState({
            showNewItemModal: active
        })
    }

    filterChange = (event) => {
        let filterCriterium = event.target.value;
        if (!filterCriterium) {
            this.setState({
                filterActive: false
            })
        }
        let filteredItems = this.state.items.filter(item => {
            return item.name.toLowerCase().includes(filterCriterium.toLowerCase())
        });
        this.setState({
            filteredItems: filteredItems,
            filterActive: true
        });
    }

    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

}

