import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Rating extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      rating: '',
      text: '',
      invalid: false,
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'radio' ? target.id : target.value;
    this.setState({
      [name]: value,
    });
  };

  verifyEmail = (email) => {
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    return emailRegex.test(email);
  };

  validateForm = () => {
    const { email, rating } = this.state;
    console.log(typeof rating);
    const filledForm = this.verifyEmail(email)
      && rating.length > 0;

    return filledForm;
  };

  handleSubmit = () => {
    const bool = this.validateForm();
    this.setState({ invalid: !bool });

    if (bool) {
      const { updateLocal } = this.props;
      const { email, text, rating } = this.state;
      updateLocal(email, text, rating);
      this.setState({
        email: '',
        rating: '',
        text: '',
      });
    }
  };

  render() {
    const { invalid, email, rating, text } = this.state;
    return (
      <form>
        <label htmlFor="email">
          Email
          <input
            data-testid="product-detail-email"
            type="email"
            id="email"
            onChange={ this.handleChange }
            name="email"
            value={ email }
          />
        </label>
        <label htmlFor="1">
          1
          <input
            data-testid="1-rating"
            type="radio"
            id="1"
            onChange={ this.handleChange }
            name="rating"
            value="1"
            checked={ rating === '1' }
          />
        </label>
        <label htmlFor="2">
          2
          <input
            data-testid="2-rating"
            type="radio"
            id="2"
            onChange={ this.handleChange }
            name="rating"
            value="2"
            checked={ rating === '2' }
          />
        </label>
        <label htmlFor="3">
          3
          <input
            data-testid="3-rating"
            type="radio"
            id="3"
            onChange={ this.handleChange }
            name="rating"
            value="3"
            checked={ rating === '3' }
          />
        </label>
        <label htmlFor="4">
          4
          <input
            data-testid="4-rating"
            type="radio"
            id="4"
            onChange={ this.handleChange }
            name="rating"
            value="4"
            checked={ rating === '4' }
          />
        </label>
        <label htmlFor="5">
          5
          <input
            data-testid="5-rating"
            type="radio"
            id="5"
            onChange={ this.handleChange }
            name="rating"
            value="5"
            checked={ rating === '5' }
          />
        </label>
        <label htmlFor="text">
          Comentário:
          <textarea
            data-testid="product-detail-evaluation"
            id="text"
            onChange={ this.handleChange }
            name="text"
            value={ text }
          />
        </label>
        <button
          type="button"
          data-testid="submit-review-btn"
          onClick={ this.handleSubmit }
        >
          Enviar
        </button>

        { invalid && (<p data-testid="error-msg">Campos inválidos</p>)}
      </form>
    );
  }
}

Rating.propTypes = {
  updateLocal: PropTypes.func.isRequired,
};
