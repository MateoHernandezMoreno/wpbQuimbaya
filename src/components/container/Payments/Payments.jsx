import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

// Carga la clave pública de Stripe
const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY');

// Componente para manejar los pagos
const CardPayment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [transferReceipt, setTransferReceipt] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(''); // Estado para la selección del método de pago

  // Maneja el envío del formulario para pagos con tarjeta
  const handleCardPayment = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = { number: cardNumber, exp_month: expiry.split("/")[0], exp_year: expiry.split("/")[1], cvc };
    
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[Error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod); // Enviar la confirmación del pago
    }
  };

  // Maneja el envío del comprobante de pago para transferencia bancaria
  const handleTransferPayment = (event) => {
    event.preventDefault();
    if (!transferReceipt) {
      alert('Por favor, sube tu comprobante de pago.');
      return;
    }
    console.log('Comprobante de pago subido:', transferReceipt);
    alert('Comprobante de pago recibido. Procesaremos tu reserva.');
  };

  // Maneja la selección del pago en efectivo
  const handleCashPayment = () => {
    alert('Reserva realizada, pago al acercarse a las instalaciones');
  };

  // Función para manejar la selección del método de pago
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div>
      <h2>Selecciona tu método de pago</h2>
      <select className="buy" onChange={handlePaymentMethodChange} value={paymentMethod}>
        <option value="">Seleccionar...</option>
        <option value="card">Tarjeta</option>
        <option value="transfer">Transferencia Bancaria</option>
        <option value="cash">Efectivo</option>
      </select>

      {paymentMethod === "card" && (
        <div>
          <h2>Pago con Tarjeta</h2>
          <form onSubmit={handleCardPayment}>
            <div className="input_form">
              <input
                type="text"
                placeholder="Número de Tarjeta"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </div>
            <div className="input_form">
              <input
                type="text"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                required
              />
            </div>
            <div className="input_form">
              <input
                type="text"
                placeholder="CVC"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                required
              />
            </div>
            <div className="btn-box">
              <button type="submit" className="btn btn2" disabled={!stripe}>
                Pagar con Tarjeta
              </button>
            </div>
          </form>
        </div>
      )}

      {paymentMethod === "transfer" && (
        <div>
          <h2>Pago por Transferencia Bancaria</h2>
          <form onSubmit={handleTransferPayment}>
            <div className="input_form">
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => setTransferReceipt(e.target.files[0])}
                required
              />
            </div>
            <div className="btn-box">
              <button type="submit" className="btn btn2">
                Subir Comprobante de Transferencia
              </button>
            </div>
          </form>
        </div>
      )}

      {paymentMethod === "cash" && (
        <div>
          <h2>Pago en Efectivo</h2>
          <div className="btn-box">
            <button className="btn btn2" onClick={handleCashPayment}>
              Pagar al Llegar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente principal que envuelve a CardPayment con Elements
const PaymentsPage = () => (
  <div className="payments">
    <section className="pay">
      <div>
        <h1>Esta es la página de pagos</h1>
      </div>
      <fieldset className="payment_form">
        <legend>Payments</legend>
        <Elements stripe={stripePromise}>
          <CardPayment />
        </Elements>
      </fieldset>
    </section>
  </div>
);

export default PaymentsPage;