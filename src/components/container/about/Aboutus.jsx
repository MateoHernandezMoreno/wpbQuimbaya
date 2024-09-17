import React from 'react';
import {Link} from 'react-router-dom';
import Profile from '../../../resources/profile/quimbaya.jpg';

const Aboutme = () => {
    return (
        <div>
            <section className="about" id="about">
                    <h3 className="heading">
                            te <span>ofrecemos</span>
                        </h3>
                        <div className="abuot-img">
                            <img
                            src={ Profile }
                            alt=""
                            />
                            <span className="circle-spin" />
                        </div>
                        <div className="about-content">
                            <h2>BENEFICIOS EXCLUSIVOS DE RESERVAS DIRECTAS</h2>
                            <h3>web o whatsapp</h3>
                            <p>. Plan exclusivo (3 comidas)</p>
                            <p>. Tarifa con impuestos incluidos </p>
                            <p>. Descuentos en fechas puntuales </p>
                            <p>. Habitaciones superiores en sector de piscina </p> 
                            <p>. Podrás adquirir servicios adicionales</p>
                        </div>
                    <div className="btn-box">
                    <Link to="/contact" className="btn btn2">Book Now</Link>
                    </div>
            </section>
        </div>
    );
}

export default Aboutme;