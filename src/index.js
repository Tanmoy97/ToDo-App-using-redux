import React from "react";
import ReactDOM from "react-dom";
import ListItems from "./Listitems";

import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      currentItem: {
        text: "",
        key: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }

  handleChange(event) {
    let { value } = event.target;
    this.setState({
      currentItem: {
        text: value,
        key: Date.now()
      }
    });
  }

  addItem(event) {
    event.preventDefault();
    let newItem = this.state.currentItem;
    if (newItem.text !== "") {
      const newItems = [...this.state.items, newItem];
      this.setState({
        items: newItems,
        currentItem: {
          text: "",
          key: ""
        }
      });
    }
    console.log(this.state.items);
  }

  deleteItem(key) {
    const filteredItem = this.state.items.filter((item, index) => {
      return item.key !== key;
    });
    this.setState({
      items: filteredItem,
      currentItem: {
        text: "",
        key: ""
      }
    });
  }

  setUpdate(text, key) {
    const items = this.state.items;
    items.forEach(item => {
      if (item.key === key) {
        item.text = text;
      }
    });
    this.setState({
      items: items
    });
  }

  render() {
    return (
      <div className="App">
        <header>
          <h3 style={{ color: "#fff", paddingTop: "20px" }}>ToDo World</h3>
          <form id="to-do-form" onSubmit={this.addItem}>
            <input
              type="text"
              placeholder="Enter Task"
              value={this.state.currentItem.text}
              onChange={this.handleChange}
            />
            <button type="submit">Add</button>
          </form>
          <ListItems
            items={this.state.items}
            deleteItem={this.deleteItem}
            setUpdate={this.setUpdate}
          />
        </header>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
