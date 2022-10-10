import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SearchInput extends Component {
  render() {
    return (
      <div>
        <Link to="/cart">
          <button
            type="button"
            data-testid="shopping-cart-button"
          >
            carrinho
          </button>
        </Link>
      </div>
    );
  }
}
