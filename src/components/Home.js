import PropTypes from 'prop-types';
import { Component } from 'react';
import { getCategories, getProductsByQuery } from '../services/api';
import CartButton from './CartButton';
import CategoryItem from './CategoryItem';
import Products from './Products';
import SearchInput from './SearchInput';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      query: '',
      products: [],
    };
  }

  componentDidMount() {
    getCategories().then((results) => {
      this.setState({
        categories: results,
      });
    });
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ query: value });
  };

  getProducts = () => {
    const { query } = this.state;
    getProductsByQuery(query).then((results) => {
      this.setState({
        products: results,
      });
    });
  };

  updateProducts = (result) => {
    this.setState({
      products: result,
    });
  };

  // iniciaLocal = () => (localStorage.getItem('cartItems') === null) && localStorage.setItem('cartItems', JSON.stringify([])
  iniciaLocal = () => {
    if (localStorage.getItem('cartItems') === null) {
      localStorage.setItem('cartItems', JSON.stringify([]));
    }
  };

  render() {
    const { categories, products, query } = this.state;
    const { addToCart, cart } = this.props;
    return (
      <>
        { this.iniciaLocal() }

        <SearchInput
          handleChange={ this.handleChange }
          getProducts={ this.getProducts }
        />
        <CartButton cart={ cart } />
        <div>
          {
            categories.length > 0
              ? categories.map((obj) => (
                <CategoryItem
                  id={ obj.id }
                  name={ obj.name }
                  key={ obj.id }
                  query={ query }
                  updateProducts={ this.updateProducts }
                />))
              : (<p>Carregando</p>)
          }
        </div>
        <div>
          {
            products.length > 0
              ? products.map((obj) => (
                <Products
                  title={ obj.title }
                  price={ obj.price }
                  thumbnail={ obj.thumbnail }
                  key={ obj.id }
                  products={ products }
                  id={ obj.id }
                  addToCart={ addToCart }
                  item={ obj }
                />))
              : (<p>Nenhum produto foi encontrado</p>)
          }
        </div>
      </>
    );
  }
}

Home.propTypes = {
  addToCart: PropTypes.func.isRequired,
  cart: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
