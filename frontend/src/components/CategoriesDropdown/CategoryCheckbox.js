import React, {Component} from 'react';

class CategoryCheckbox extends Component {

    state = {
        category: {
            id: this.props.category.id,
            name: this.props.category.name
        },
        checked: false
    };

    onCategoryChange = event => {
        const newState = this.state;
        newState.checked = event.target.checked;
        this.setState(newState);
        this.props.onChange(newState);
    };

    render() {
        return (
            <li className={`box ${this.state.checked ? "active" : ""}`}>
                <label className="category-checkbox">
                    <input style={{opacity: 0}} type="checkbox" name={this.props.name}
                           onChange={this.onCategoryChange}/>
                    {this.props.name}
                </label>
            </li>
        );
    }
}

export default CategoryCheckbox;