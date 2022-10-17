import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import CartButton from './CartButton';
import Rating from './Rating';

export default class Details extends Component {
  constructor(props) {
    super(props);

    const { match } = this.props;
    const id = match.params.slug;
    this.state = {
      product: {},
      reviews: JSON.parse(localStorage.getItem(id)) || [],
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const productId = match.url.split('/')[2];
    getProductById(productId).then((result) => (
      this.setState({ product: result })
    ), this.iniciaLocal());
  }

  iniciaLocal = () => {
    const { match } = this.props;
    const id = match.params.slug;
    if (localStorage.getItem(id) === null) {
      localStorage.setItem(id, JSON.stringify([]));
    }
  };

  updateLocal = (email, text, rating) => {
    const { match } = this.props;
    const id = match.params.slug;
    const list = JSON.parse(localStorage.getItem(id));

    list.push({
      email,
      text,
      rating,
    });

    localStorage.setItem(id, JSON.stringify(list));
    this.setState({ reviews: list });
  };

  render() {
    console.log(this.props);
    const { product, reviews } = this.state;
    const { addToCart, cart } = this.props;
    return (
      <div>
        <CartButton cart={ cart } />
        <Link to="/">
          <button type="button">Voltar pra home</button>
        </Link>
        {Object.keys(product).length > 0
          ? (
            <>
              <img
                data-testid="product-detail-image"
                src={ product.thumbnail }
                alt={ product.title }
              />
              <p data-testid="product-detail-name">{ product.title }</p>
              {product.shipping.free_shipping
                && <p data-testid="free-shipping">Frete Grátis!</p>}
              <p data-testid="product-detail-price">{`R$ ${product.price}`}</p>
              <p>{`Itens vendidos: ${product.sold_quantity}`}</p>
              <p>{`Quantidade disponível: ${product.available_quantity}`}</p>
              {product.pictures.length > 1
                && product.pictures.map((pic) => (
                  <img src={ pic.url } alt={ pic.id } key={ pic.id } />
                ))}
              <button
                data-testid="product-detail-add-to-cart"
                type="button"
                onClick={ () => addToCart(product) }
              >
                Adicionar ao carrinho
              </button>
            </>
          )
          : <p>Carregando</p>}
        <Rating updateLocal={ this.updateLocal } />
        { reviews.length > 0
          && reviews.map((review, index) => (
            <div key={ index }>
              <p data-testid="review-card-email">{review.email}</p>
              <p data-testid="review-card-rating">{review.rating}</p>
              <p data-testid="review-card-evaluation">{review.text}</p>
            </div>
          ))}
      </div>
    );
  }
}

Details.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
    params: PropTypes.shape({
      slug: PropTypes.string,
    }).isRequired,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
  cart: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
