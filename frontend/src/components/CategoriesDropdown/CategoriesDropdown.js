import React, {Component} from 'react';
import DropdownButton from "react-bootstrap/DropdownButton";
import AxiosClient from "../Authentication/AxiosClient";
import CategoryCheckbox from "./CategoryCheckbox";
import "./CategoriesDropdown.css"

class CategoriesDropdown extends Component {

    state = {
        error: null,
        isLoaded: false,
        category: {
            name: "Category",
            id: ""
        },
        categories: [],
        chosenCategories: []
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
        newState.chosenCategories = eventKey.checked ?
            newState.chosenCategories.concat(eventKey.category) :
            newState.chosenCategories.filter(category => category.id !== eventKey.category.id);
        this.setState(newState);
        this.props.setCategories(newState.chosenCategories);
        console.log(newState.chosenCategories);
    };

    render() {
        return (
            <div className="categories-dropdown">
                <DropdownButton size="sm" variant="primary" title="Category">
                    <div className="categories-menu checkbox-menu overflow-auto scrollbar">
                        {this.state.categories.map(category => <CategoryCheckbox key={category.id}
                                                                                 name={category.name}
                                                                                 category={category}
                                                                                 onChange={this.onCategorySelect}/>)}
                    </div>
                </DropdownButton>
            </div>
        );
    }
}

export default CategoriesDropdown;