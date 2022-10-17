import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class CartButton extends Component {
  render() {
    const { cart } = this.props;
    console.log('oi', cart);
    return (
      <div>
        <Link to="/cart">
          <button
            type="button"
            data-testid="shopping-cart-button"
          >
            Clique para retornar ao Carrinho
            <span data-testid="shopping-cart-size">{` (${cart.length})`}</span>
          </button>
        </Link>
      </div>
    );
  }
}

CartButton.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
