import React, {Component} from 'react';
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import "./CategoriesDropdown.css"

class CategoriesDropdown extends Component {

    state = {
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
                    {this.state.categories.map(category => <Dropdown.Item key={category.id}
                                                                          eventKey={category}
                                                                          onSelect={() => this.onCategorySelect(category)}>{category.name}</Dropdown.Item>)}
                </DropdownButton>
            </div>
        );
    }
}

export default CategoriesDropdown;