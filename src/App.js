import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Details from './components/Details';
import Home from './components/Home';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      cart: JSON.parse(localStorage.getItem('cartItems')) || [],
    };
  }

  addToLocal = () => {
    const { cart } = this.state;
    localStorage.setItem('cartItems', JSON.stringify(cart));
  };

  addToCart = (item) => {
    this.setState((prevState) => ({
      cart: [...prevState.cart, item],
    }), this.addToLocal);
  };

  removeAllFromCart = (id, event) => {
    const { cart } = this.state;
    const newCart = cart.filter((products) => products.id !== id);
    this.setState(({
      cart: newCart,
    }), this.addToLocal);

    event.target.parentNode.remove();
  };

  removeItemFromCart = (item) => {
    const { cart } = this.state;
    const ids = cart.map((product) => product.id);
    const indexExists = -1;
    const index = ids.indexOf(item.id);
    if (index > indexExists) cart.splice(index, 1);
    this.setState(({
      cart,
    }), this.addToLocal);
  };

  checkoutClear = () => {
    this.setState({ cart: [] }, this.addToLocal);
  };

  render() {
    const { cart } = this.state;
    // console.log(cart);
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (<Home
              addToCart={ this.addToCart }
              cart={ cart }
            />) }
          />
          <Route
            path="/cart"
            render={ () => (<Cart
              cart={ cart }
              addToCart={ this.addToCart }
              removeAllFromCart={ this.removeAllFromCart }
              removeItemFromCart={ this.removeItemFromCart }
            />) }
          />
          <Route
            path="/details/:slug"
            render={ (props) => (<Details
              { ...props }
              addToCart={ this.addToCart }
              cart={ cart }
            />) }
          />
          <Route
            path="/checkout"
            render={ (props) => (<Checkout
              { ...props }
              cart={ cart }
              checkoutClear={ this.checkoutClear }
            />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
