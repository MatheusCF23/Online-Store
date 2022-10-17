import PropTypes from 'prop-types';
import { Component } from 'react';

export default class CartItem extends Component {
  // removeItem = (id) => {
  //   const { getFromLocal } = this.props;
  //   const list = getFromLocal();
  //   console.log(list);
  //   const newList = list.filter((item) => item.id !== id);
  //   console.log(newList);
  //   localStorage.setItem('cartItems', JSON.stringify(newList));
  // };

  render() {
    const { id,
      price,
      title,
      thumbnail,
      counter, removeAllFromCart, addToCart, item, removeItemFromCart } = this.props;
    return (
      <div>
        <div>
          <img src={ thumbnail } alt={ title } />
          <span data-testid="shopping-cart-product-name">
            {title}
          </span>
          <span>
            {price}
          </span>
          <span
            data-testid="shopping-cart-product-quantity"
          >
            {counter}
          </span>
          <span>
            {`ID: ${id}`}
          </span>
          <button
            type="button"
            data-testid="product-increase-quantity"
            onClick={ () => addToCart(item) }
            disabled={ counter >= item.available_quantity }
          >
            +
          </button>
          <button
            type="button"
            data-testid="product-decrease-quantity"
            onClick={ () => removeItemFromCart(item) }
            disabled={ counter === 1 }
          >
            -
          </button>
          <button
            type="button"
            data-testid="remove-product"
            onClick={ (event) => removeAllFromCart(id, event) }
          >
            Remove do Carrinho
          </button>
        </div>
      </div>
    );
  }
}

CartItem.propTypes = {
  id: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  counter: PropTypes.number.isRequired,
  removeAllFromCart: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  item: PropTypes.shape().isRequired,
  removeItemFromCart: PropTypes.func.isRequired,
};
