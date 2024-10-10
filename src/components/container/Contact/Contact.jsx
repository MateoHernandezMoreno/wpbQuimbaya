import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Select from 'react-select';
import countriesList from 'react-select-country-list';
import 'bootstrap/dist/css/bootstrap.min.css';
import RoomSelectionModal from './RoomSelectionModal';

const Contact = () => {
  const roomCapacity = { dobleSencilla: 2, dobleJacuzzi: 2, triple: 3, cuadruple: 4 };
  const platePatterns = { car: /^[A-Z]{3}[0-9]{3}$/, moto: /^[A-Z]{2}[0-9]{2}[A-Z]{1}$/ };
  const hotelRooms = {
    dobleSencilla: [73, 74, 75, 31, 32, 27, 72, 71, 70, 44, 43, 42, 41, 40, 18],
    dobleJacuzzi: [28, 29, 30],
    triple: [5, 4, 3, 2, 20, 21, 22, 23, 78, 77, 76, 6, 7, 8, 9, 16, 10, 11, 12, 13, 14],
    cuadruple: [18, 60, 61, 62, 59, 50, 51, 52, 53, 54, 45, 46, 47, 48, 49, 39, 38, 37, 36, 55, 56, 57, 58]
  };
  const prices = { dobleSencilla: 100, dobleJacuzzi: 150, triple: 180, cuadruple: 220 };

  const [plate, setPlate] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [vehicleType, setVehicleType] = useState('car');
  const [showModal, setShowModal] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState([]);
  const [numPersons, setNumPersons] = useState(0);
  const [roomType, setRoomType] = useState('');
  const [nights, setNights] = useState(1);
  const [total, setTotal] = useState(0);
  const [maxPersons, setMaxPersons] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const countries = countriesList().getData();

  const handleChange = (e) => {
    const value = e.target.value;
    setPlate(value);
    setIsValid(platePatterns[vehicleType].test(value));
  };

  const handleVehicleChange = (e) => {
    setVehicleType(e.target.value);
    setPlate('');
    setIsValid(true);
  };

  const clearRoomSelection = () => setSelectedRoom([]);

  const handleRoomSelection = (room) => {
    setSelectedRoom((prevRooms) => [...prevRooms, room]);
    setShowModal(false);
  };

  const handledRoomTypeChange = (event) => {
    const roomType = event.target.value;
    setRoomType(roomType);
    setMaxPersons(roomCapacity[roomType] || 1);
    setSelectedRoomType(roomType);
    setShowModal(true);
  };

  const handleRoomClick = (room) => {
    setSelectedRoom((prevRooms) => 
      prevRooms.includes(room) ? prevRooms.filter((r) => r !== room) : [...prevRooms, room]
    );
    calculateTotal();
  };

  const handlePersonsChange = (e) => {
    const persons = parseInt(e.target.value, 10) || 0;
    if (persons <= maxPersons) {
      setNumPersons(persons);
      calculateTotal();
    }
  };

  const handleChangeNights = (e) => {
    const nights = parseInt(e.target.value, 10) || 0;
    setNights(nights);
    calculateTotal();
  };

  const calculateTotal = () => {
    const taxRate = 0.10;
    let subtotal = 0;
    selectedRoom.forEach((room) => {
      const roomType = Object.keys(hotelRooms).find((type) => hotelRooms[type].includes(room));
      subtotal += (prices[roomType] || 0) * nights;
    });
    const sbtotalWhitPersons = subtotal * numPersons;
    const totalWithTax = sbtotalWhitPersons + (sbtotalWhitPersons * taxRate);
    setTotal(totalWithTax);
  };

  useEffect(() => {
    calculateTotal();
  }, [selectedRoom, nights, numPersons]);

  return (
    <div>
      <section className="contact" id="contact">
        <h2 className="heading">Reser<span>vation!</span></h2>
        <form action="https://formsubmit.co/mateohernandez199605@gmail.com" method="POST">
          <fieldset>
            <legend>reservation holder</legend>
            <div className="input-box">
              <div className="input-field">
                <input type="text" name="footer-text" placeholder="Name" required />
                <span className="focus" />
              </div>
              <div className="input-field">
                <input type="text" name="footer-text" placeholder="Last Name" required />
                <span className="focus" />
              </div>
              <div className="input-field">
                <Select className='options op2' options={countries} value={selectedCountry} onChange={setSelectedCountry} placeholder='Nacionalidad' />
                <span className="focus" />
              </div>
              <div className="input-field2">
                <select className="option">
                  <option>C.C</option>
                  <option>C.E</option>
                  <option>T.I</option>
                  <option>Passport</option>
                  <option>R.C</option>
                </select>
                <input type="number" name="number" placeholder="Number" required />
                <span className="focus" />
              </div>
              <div className="input-field">
                <input type="email" name="email" placeholder="Email Address" required />
                <span className="focus" />
              </div>
              <div className="input-field">
                <input type="email" name="confirm-email" placeholder="Confirm Email Address" required />
                <span className="focus" />
              </div>
              <div className="input-field">
                <input type="text" name="adrees" placeholder="Direccion" required />
                <span className="focus" />
              </div>
              <div className="input-field">
                <input type="tel" pattern="^\+\d{1,3}\d{10}$" name="number" placeholder="Phone number" required />
                <span className="focus" />
              </div>
              <div className="input-field2">
                <select className="option" id='vehicleType' onChange={handleVehicleChange} value={vehicleType}>
                  <option value="car">Car</option>
                  <option value="moto">Moto</option>
                </select>
                <input type="text" id="plate" name="plate" value={plate} onChange={handleChange} placeholder={vehicleType === 'car' ? 'AAA123' : 'AA12A'} />
                {!isValid && <p style={{ color: 'red' }}>Formato incorrecto</p>}
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend>Informacion de reserva</legend>
            <div className="input-box">
              <div className="input-field">
                <input min="1" max={maxPersons} type="number" name="number" placeholder="Personas" required value={numPersons} onChange={handlePersonsChange} />
                <span className="focus" />
              </div>
              <div className="input-field2">
                <label>tipo de habitacion</label>
                <select className="option" onChange={handledRoomTypeChange}>
                  <option value={roomType}>--</option>
                  <option value="dobleSencilla">Doble Sencilla</option>
                  <option value="dobleJacuzzi">Doble con Jacuzzi</option>
                  <option value="triple">Triple</option>
                  <option value="cuadruple">Cuádruple</option>
                </select>
                <span className="focus" />
              </div>
              <div className="input-field">
                <input min="1" max="100" type="number" name="nights" placeholder="nights" required value={nights} onChange={handleChangeNights} />
                <span className="focus" />
              </div>
              <div className="input-field">
                <input value={selectedRoom.join(' , ')} id="roomSelection" readOnly onClick={() => setShowModal(true)} type="text" name="number" placeholder="habitacion" required />
                <button type="button" className="btn" onClick={clearRoomSelection}>Limpiar</button>
                <span className="focus" />
              </div>
              <RoomSelectionModal showModal={showModal} 
              onClose={() => setShowModal(false)} 
                roomType={selectedRoomType}
                hotelRooms={hotelRooms}
              onRoomSelect={handleRoomSelection}></RoomSelectionModal>
            </div>  
          </fieldset>
          <fieldset>
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
            <p>Subtotal: {total.toFixed(2)} USD</p>
            <p>Impuesto (10%): {(total * 0.10).toFixed(2)} USD</p>
            <p>Total: {(total + (total * 0.10)).toFixed(2)} USD</p>
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