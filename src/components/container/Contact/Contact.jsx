import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Select from 'react-select';
import countriesList from 'react-select-country-list';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import RoomSelectionModal from './RoomSelectionModal';

const Contact = () => {

  const [showModal, setShowModal] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [selectedRoom, setSelecteRoom] = useState(" ");

  //habitaciones

  const hotelRooms = {
    dobleSencilla: [73, 74, 75, 31, 27, 72, 71, 70, 44, 43, 42, 41, 40 ],
    dobleJacuzzi: [ 28, 29, 30],
    tripe: [5, 4, 3, 2, 20, 21, 22, 23, 78, 77, 76, 6, 7, 8, 9, 16, 10, 11, 12, 13, 14],
    cuadruple: [12, 60, 61, 62, 59, 50, 51, 52, 53, 54, 45, 46, 47, 48, 49, 39, 38, 37, 36, 55, 56, 57, 58]

  };

 const handleRoomSelection = (room) =>{
  setSelecteRoom(room);
  setShowModal(false);
 }

  const handledRoomTypeChange = (event) =>{
    const roomType = event.target.value;
    setSelectedRoomType(roomType);
    setShowModal(true)
  };

  const handleRoomClick = (room) =>{
    setSelecteRoom(room); //guarda la habitacion seleccionada
    setShowModal(false); //cerrar el modal despues de seleccionar la habitacions
  };

  const renderHighLightedRooms = () =>{
    return(
      hotelRooms[selectedRoomType]?.map(room => (
        <div key={room} 
        className={`room ${room} highLighted`} onClick={()=>     
          handleRoomClick(room)}>{room}</div>))
    )
   
  };

  const location = useLocation();
  const bookingData = location.state || {};//recibe los datos enviados

  const [numPersons, setNumPersons] = useState(bookingData.people || 0);
  const [roomType, setRoomType] = useState(bookingData.roomType || " ");
  const [nights, setNights] = useState(bookingData.nights || 1);
  const [total, setTotal] = useState(0);

  const[selectedCountry, setSelectedCountry] = useState(null); 
  const countries = countriesList().getData();

  const handledChange = (selectedOption) =>{
    setSelectedCountry(selectedOption)
  }
  // Estado para manejar el número de personas y el total a pagar
  //const [numPersons, setNumPersons] = useState(0);
  //const [total, setTotal] = useState(0);

  // Función para manejar cambios en el input de personas
  const handlePersonsChange = (e) => {
    const persons = parseInt(e.target.value, 10) || 0; // Convierte a número y maneja entradas no válidas
    setNumPersons(persons);
    calculateTotal (persons, nights);    
  };

  const handleChangeNights = (e) =>{
    const nights = parseInt(e.target.value, 10) || 0 ;
    setNights(nights);
    calculateTotal(numPersons, nights);
  }
  // Supongamos que el costo por persona es de $100 y hay un impuesto del 10%
  const calculateTotal = (persons, nights) =>{
    const costPerPerson = 100;
    const taxRate = 0.10;
    const subtotal = persons * costPerPerson;
    const totalWithTax = subtotal + subtotal * taxRate;

    setTotal(totalWithTax);
  }

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
                  placeholder="Name"
                  required=""
                />
                <span className="focus" />
              </div>
              <div className="input-field">
                <input
                  type="text"
                  name="footer-text"
                  placeholder="Last Name"
                  required=""
                />
                <span className="focus" />
              </div>
              <div className="input-field">
                <Select className='options op2' 
                  options={countries} 
                  //lista de paises
                  value={selectedCountry}
                  onChange={handledChange}
                  placeholder='Nacionalidad'
                />
                <span className="focus" />
              </div>
              <div className="input-field2">
              <select className="option ">
                <option>C.C</option>
                <option>C.E</option>
                <option>T.I</option>
                <option>Passport</option>
                <option>R.C</option>
              </select>
                <input
                  type="number"
                  name="number"
                  placeholder="Number"
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
            </div>
          </fieldset>
          <fielset>
            <legend>Informacion de reserva</legend>
            <div className="input-box">
            <div className="input-field">
              {/* <label>Numero de personas</label> */}
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
              <div className="input-field">
              {/* <label>tipo de habitacion</label> */}
                <input type="text"
                  name="roomType"
                  value={roomType}
                  placeholder="tipo de habitacion"
                />
                <span className="focus" />
              </div>
              <div className="input-field">
              {/* <label>Numero de noches</label> */}
                <input
                  min="1"
                  max="100"
                  type="number"
                  name="nights"
                  placeholder="nights"
                  required=""
                  value={nights}
                  onChange={handleChangeNights}
                />
                <span className="focus" />
              </div>
              <div className="input-field">
                {/* <label>Habitacion</label> */}
                <input
                  value={selectedRoom}
                  id="roomSelection"
                  readOnly
                  onClick={()=> setShowModal(true)}
                  type="text"
                  name="number"
                  placeholder="habitacion"
                  required=""
                />
                <span className="focus" />
              </div>
              <RoomSelectionModal showModal={showModal} onClose={() => setShowModal(false)} onRoomSelect={handleRoomSelection}></RoomSelectionModal>
            </div>  
          </fielset>
          <fielset>
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
          </fielset>

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