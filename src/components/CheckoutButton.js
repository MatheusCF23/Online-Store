import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CheckoutButton extends Component {
  render() {
    return (
      <div>
        <Link to="/checkout">
          <button
            type="button"
            data-testid="checkout-products"
          >
            Finalizar compra!
          </button>
        </Link>
      </div>
    );
  }
}
