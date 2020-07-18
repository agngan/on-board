import React, {Component} from 'react';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import "./CategoriesDropdown.css"

class CategoriesDropdown extends Component {

    state = {
        category: "Category",
        categories: [
            "Abstract",
            "Adventure",
            "Card game",
            "Luck",
            "Math"
        ]
    };

    onCategorySelect = eventKey => {
        const newState = this.state;
        newState.category = eventKey;
        this.setState(newState);
        this.props.onCategoryChange(eventKey);
        console.log(this.state);
    };

    render() {
        return (
                <div className="categories-dropdown">
                    <DropdownButton size="sm" variant="primary" title={this.state.category} onSelect={this.onCategorySelect}>
                        {this.state.categories.map(category => <Dropdown.Item key={category}
                                                                              eventKey={category}>{category}</Dropdown.Item>)}
                    </DropdownButton>
                </div>
        );
    }
}

export default CategoriesDropdown;