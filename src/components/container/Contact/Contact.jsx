import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { ReservationContext } from './ReservationContext';

const Contact = () => {

  // const { ReservationDetails } = useContext(ReservationContext);
  // const { nights, people, total } = reservationdetails;

  // Estado para manejar el número de personas y el total a pagar
  const [numPersons, setNumPersons] = useState(0);
  const [total, setTotal] = useState(0);

  // Función para manejar cambios en el input de personas
  const handlePersonsChange = (e) => {
    const persons = parseInt(e.target.value, 10) || 0; // Convierte a número y maneja entradas no válidas
    setNumPersons(persons);

    // Supongamos que el costo por persona es de $100 y hay un impuesto del 10%
    const costPerPerson = 100;
    const taxRate = 0.10;
    const subtotal = persons * costPerPerson;
    const totalWithTax = subtotal + subtotal * taxRate;

    setTotal(totalWithTax);
  };

  return (
    <div>
      <section className="contact" id="contact">
        <h2 className="heading">
          Reser<span>vation!</span>
        </h2>
        <form
          action="https://formsubmit.co/mateohernandez199605@gmail.com"
          method="POST"
        >
          <fieldset>
            <legend>reservation holder</legend>
            <div className="input-box">
              <div className="input-field">
                <input
                  type="text"
                  name="footer-text"
                  placeholder="Full Name"
                  required=""
                />
                <span className="focus" />
              </div>
              <div className="input-field">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required=""
                />
                <span className="focus" />
              </div>
              <div className="input-field">
                <input
                  type="email"
                  name="confirm-email"
                  placeholder="Confirm Email Address"
                  required=""
                />
                <span className="focus" />
              </div>
              <div className="input-field">
                <input
                  min="0"
                  type="tel"
                  pattern="^\+\d{1,3}\d{10}$"
                  name="number"
                  placeholder="Phone number"
                  required=""
                />
                <span className="focus" />
              </div>
              <div className="input-field">
                <input
                  min="1"
                  max="100"
                  type="number"
                  name="number"
                  placeholder="Personas"
                  required=""
                  value={numPersons}
                  onChange={handlePersonsChange}
                />
                <span className="focus" />
              </div>
            </div>
            <div className="textarea-field">
              <textarea
                name="text"
                placeholder="Observations"
                required=""
                cols={30}
                rows={10}
                defaultValue={""}
              />
              <span className="focus" />
            </div>
          </fieldset>

          {/* Nueva sección para mostrar el total a pagar */}
          <div className="total-section">
            <h3>Total a Pagar</h3>
            <p>Subtotal: {(numPersons * 100).toFixed(2)} USD</p>
            <p>Impuesto (10%): {(numPersons * 100 * 0.10).toFixed(2)} USD</p>
            <p>Total: {total.toFixed(2)} USD</p>
          </div>

          <div className="btn-box btns">
            <Link to="/payments" >
              <button type="submit" className="btn">
                Payments
              </button>
            </Link>
          </div>
          <input type="hidden" name="_next" defaultValue="/" />
          <input type="hidden" name="_captcha" defaultValue="false" />
        </form>
      </section>
    </div>
  );
};

export default Contact;