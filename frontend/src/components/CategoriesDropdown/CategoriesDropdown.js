import React, {Component} from 'react';
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import "./CategoriesDropdown.css"
import AxiosClient from "../Authentication/AxiosClient";

class CategoriesDropdown extends Component {

    state = {
        error: null,
        isLoaded: false,
        category: {
            name: "Category",
            id: ""
        },
        categories: [
            {
                name: "Abstract",
                id: "hBqZ3Ar4RJ"
            },
            {
                name: "Adventure",
                id: "KUBCKBkGxV"
            },
            {
                name: "Card game",
                id: "eX8uuNlQkQ"
            },
            {
                name: "Math",
                id: "POlqwScVxD"
            }
        ]
    };

    componentDidMount() {
        this.getCategories().then(this.processCategories(), this.handleError());
    }

    getCategories() {
        return AxiosClient.get("bga/categories").then(res => res.data);
    }

    processCategories() {
        return categories => {
            const newState = this.state;
            newState.isLoaded = true;
            newState.categories = categories;
            this.setState(newState);
        };
    }

    handleError() {
        return error => {
            const newState = this.state;
            newState.isLoaded = true;
            newState.error = error;
            this.setState(newState);
            console.log(error);
        }
    }

    onCategorySelect = eventKey => {
        const newState = this.state;
        newState.category = eventKey;
        this.setState(newState);
        this.props.onCategoryChange(eventKey);
    };

    render() {
        return (
            <div className="categories-dropdown">
                <DropdownButton size="sm" variant="primary" title={this.state.category.name}>
                    <div className="categories-menu overflow-auto scrollbar">
                        {this.state.categories.map(category => <Dropdown.Item key={category.id}
                                                                              eventKey={category}
                                                                              onSelect={() => this.onCategorySelect(category)}>{category.name}</Dropdown.Item>)}
                    </div>
                </DropdownButton>
            </div>
        );
    }
}

export default CategoriesDropdown;