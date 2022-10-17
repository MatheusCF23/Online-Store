import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Checkout extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
      method: false,
      invalid: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  validateForm = () => {
    const { name, email, cpf, phone, cep, address, method } = this.state;

    const filledForm = name.length > 0
      && email.length > 0
      && cpf.length > 0
      && phone.length > 0 && cep.length > 0 && address.length > 0 && method === 'on';

    return filledForm;
  };

  handleSubmit = () => {
    const bool = this.validateForm();
    this.setState({ invalid: !bool });

    if (bool) {
      const { history, checkoutClear } = this.props;
      checkoutClear();
      history.push('/');
    }
  };

  render() {
    const { cart } = this.props;
    const { invalid } = this.state;
    return (
      <div>
        { cart.map((item, index) => (
          <p key={ index }>{item.title}</p>
        ))}
        <form>
          <label htmlFor="name">
            Nome Completo:
            <input
              onChange={ this.handleChange }
              data-testid="checkout-fullname"
              type="text"
              id="name"
              name="name"
            />
          </label>

          <label htmlFor="email">
            Email:
            <input
              onChange={ this.handleChange }
              data-testid="checkout-email"
              type="email"
              id="email"
              name="email"
            />
          </label>

          <label htmlFor="cpf">
            CPF:
            <input
              onChange={ this.handleChange }
              data-testid="checkout-cpf"
              type="text"
              id="cpf"
              name="cpf"
            />
          </label>

          <label htmlFor="phone">
            Telefone:
            <input
              onChange={ this.handleChange }
              data-testid="checkout-phone"
              type="text"
              id="phone"
              name="phone"
            />
          </label>

          <label htmlFor="cep">
            CEP:
            <input
              onChange={ this.handleChange }
              data-testid="checkout-cep"
              type="text"
              id="cep"
              name="cep"
            />
          </label>

          <label htmlFor="address">
            Endereço:
            <input
              onChange={ this.handleChange }
              data-testid="checkout-address"
              type="text"
              id="address"
              name="address"
            />
          </label>

          <label htmlFor="boleto">
            Boleto
            <input
              onChange={ this.handleChange }
              data-testid="ticket-payment"
              type="radio"
              id="boleto"
              name="method"
            />
          </label>
          <label htmlFor="visa">
            Visa
            <input
              onChange={ this.handleChange }
              data-testid="visa-payment"
              type="radio"
              id="visa"
              name="method"
            />
          </label>
          <label htmlFor="master">
            MasterCard
            <input
              onChange={ this.handleChange }
              data-testid="master-payment"
              type="radio"
              id="master"
              name="method"
            />
          </label>
          <label htmlFor="elo">
            Elo
            <input
              onChange={ this.handleChange }
              data-testid="elo-payment"
              type="radio"
              id="elo"
              name="method"
            />
          </label>

          <button
            data-testid="checkout-btn"
            type="button"
            onClick={ this.handleSubmit }
          >
            Finalizar

          </button>
        </form>

        { invalid && (<p data-testid="error-msg">Campos inválidos</p>)}
      </div>
    );
  }
}

Checkout.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  checkoutClear: PropTypes.func.isRequired,
};
