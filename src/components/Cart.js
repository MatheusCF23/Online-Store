import PropTypes from 'prop-types';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import CheckoutButton from './CheckoutButton';

export default class Cart extends Component {
  constructor() {
    super();

    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    const list = this.getFromLocal();
    this.setState({ list });
  }

  getFromLocal = () => {
    const list = JSON.parse(localStorage.getItem('cartItems'));
    return list;
  };

  countItem = (id) => {
    const { cart } = this.props;
    const total = cart.reduce((acc, curr) => {
      if (curr.id === id) acc += 1;
      return acc;
    }, 0);
    return total;
  };

  filterCart = () => {
    const { list } = this.state;

    const ids = list.map((product) => product.id);
    const newList = list.filter(({ id }, index) => !ids.includes(id, index + 1));

    console.log(list, newList);
    return newList;
  };

  render() {
    const { list } = this.state;
    const { cart, removeAllFromCart, addToCart, removeItemFromCart } = this.props;
    console.log(cart);
    return (
      <>
        <Link to="/">
          <button type="button">Voltar pra home</button>
        </Link>
        <h1> Carrinho </h1>
        { list.length > 0
          ? this.filterCart()
            .map((item, index) => (
              <CartItem
                key={ index }
                id={ item.id }
                price={ item.price }
                title={ item.title }
                thumbnail={ item.thumbnail }
                counter={ this.countItem(item.id) }
                removeAllFromCart={ removeAllFromCart }
                addToCart={ addToCart }
                item={ item }
                removeItemFromCart={ removeItemFromCart }
              />))
          : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
        <CheckoutButton />
      </>
    );
  }
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape).isRequired,
  removeAllFromCart: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeItemFromCart: PropTypes.func.isRequired,
};
