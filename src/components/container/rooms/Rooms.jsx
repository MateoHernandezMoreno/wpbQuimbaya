import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Contact from '../Contact/Contact'; 
import imgPrueba from '../../../resources/carousel/396999027_18393830878001859_1623414648970925342_n.jpg';


const RoomsPage = () => {

  const navigate = useNavigate();

  const handleBookNow = (typeRoom) => {
    const {nights, people, room} = roomState[typeRoom];
    const bookingData = {
      roomType : typeRoom,
      people, nights,
      rooms: room,
    };
    navigate('/contact', {state: bookingData});
  }
  
  // Estados independientes para cada habitación
  const [roomState, setRoomState] = useState({
    dobleSencilla: { nights: 1, people: 1, room: 1 },
    dobleJacuzzi: { nights: 1, people: 1, room: 1 },
    triple: { nights: 1, people: 1, room: 1 },
    cuadruple: { nights: 1, people: 1, room: 1 },
  });

  // Maximo de personas por tipo de habitación
  const MAX_PEOPLE_PER_ROOM = {
    dobleSencilla: 2,
    dobleJacuzzi: 2,
    triple: 3,
    cuadruple: 4,
  };

  // Precios base por noche para cada tipo de habitación
  const prices = {
    dobleSencilla: 100,
    dobleJacuzzi: 150,
    triple: 180,
    cuadruple: 220,
  };

  // Cálculo de totales por tipo de habitación
  const calculateTotal = (typeRoom) => {
    const { nights, people, room } = roomState[typeRoom];
    return prices[typeRoom] * nights * people + room -1 ;
  };

  // Actualizar el estado según la habitación y el campo
  const updateRoomState = (typeRoom, field, value) => {
    setRoomState(prevState => {
      const maxPeople = MAX_PEOPLE_PER_ROOM[typeRoom] * prevState[typeRoom].room;
      const newPeople = field === 'people' ? Math.min(value, maxPeople) : prevState[typeRoom].people;
      return {
        ...prevState,
        [typeRoom]: {
          ...prevState[typeRoom],
          [field]: field === 'people' ? newPeople : value,
        },
      };
    });
  };


  return (
    <div className="rooms">
      {/* Habitación Doble Sencilla */}
      <section className='seccion_room'>
        <div className="img_room">
          <img src={imgPrueba} alt="Habitación Doble Sencilla" />
        </div>
        <h2>Habitación Doble Sencilla</h2>
        <div className='descripcion'>
          <p>Cama doble</p>
          <p>Baño</p>
          <p>Minibar</p>
          <p>TV por cable</p>
          <p>Total: ${calculateTotal('dobleSencilla')}</p>
        </div>
        <div className="totales">
        <label>
          <p>Número de Noches:</p>
          <input
            type="number"
            value={roomState.dobleSencilla.nights}
            min="1"
            onChange={(e) => updateRoomState('dobleSencilla', 'nights', parseInt(e.target.value))}
          />
        </label>
        <label>
          <p>Número de Personas:</p>
          <input
            type="number"
            value={roomState.dobleSencilla.people}
            min="1"
            max={MAX_PEOPLE_PER_ROOM.dobleSencilla * roomState.dobleSencilla.room}
            onChange={(e) => updateRoomState('dobleSencilla', 'people', Math.min(parseInt(e.target.value),MAX_PEOPLE_PER_ROOM.dobleSencilla * roomState.dobleSencilla.room))}
          />
        </label>
        <label>
          <p>Número de Habitaciones:</p>
          <input
            type="number"
            value={roomState.dobleSencilla.room}
            min="1"
            onChange={(e) => updateRoomState('dobleSencilla', 'room', parseInt(e.target.value))}
          />
        </label>
         
      </div>
        <div className="btn-box">
        <button onClick={() => {handleBookNow('dobleSencilla')}} className="btn btn2">Book Now</button>
        </div>
      </section>

      {/* Habitación Doble con Jacuzzi */}
      <section className='seccion_room'>
        <div className="img_room">
          <img src={imgPrueba} alt="Habitación Doble con Jacuzzi" />
        </div>
        <h2>Habitación Doble con Jacuzzi</h2>
        <div className='descripcion'>
          <p>Cama doble</p>
          <p>Baño con jacuzzi</p>
          <p>Minibar</p>
          <p>TV por cable</p>
          <p>Total: ${calculateTotal('dobleJacuzzi')}</p>
        </div>
        <div className="totales">
        <label>
          <p>Número de Noches:</p>
          <input
            type="number"
            value={roomState.dobleJacuzzi.nights}
            min="1"
            onChange={(e) => updateRoomState('dobleJacuzzi', 'nights', parseInt(e.target.value))}
          />
        </label>
        <label>
          <p>Número de Personas:</p>
          <input
            type="number"
            value={roomState.dobleJacuzzi.people}
            min="1"
            max={MAX_PEOPLE_PER_ROOM.dobleJacuzzi * roomState.dobleJacuzzi.room}
            onChange={(e) => updateRoomState('dobleJacuzzi', 'people', Math.min(parseInt(e.target.value),MAX_PEOPLE_PER_ROOM.dobleJacuzzi * roomState.dobleJacuzzi.room))}
          />
        </label>
        <label>
          <p>Número de Habitaciones:</p>
          <input
            type="number"
            value={roomState.dobleJacuzzi.room}
            min="1"
            onChange={(e) => updateRoomState('dobleJacuzzi', 'room', parseInt(e.target.value))}
          />
        </label>
        
      </div>
        <div className="btn-box">
        <button onClick={() => {handleBookNow('dobleJacuzzi')}} className="btn btn2">Book Now</button>
        </div>
      </section>

      {/* Habitación Triple */}
      <section className='seccion_room'>
        <div className="img_room">
          <img src={imgPrueba} alt="Habitación Triple" />
        </div>
        <h2>Habitación Triple</h2>
        <div className='descripcion'>
          <p>Tres camas individuales</p>
          <p>Baño</p>
          <p>Minibar</p>
          <p>TV por cable</p>
          <p>Total: ${calculateTotal('triple')}</p>
        </div>
        <div className="totales">
        <label>
          <p>Número de Noches:</p>
          <input
            type="number"
            value={roomState.triple.nights}
            min="1"
            onChange={(e) => updateRoomState('triple', 'nights', parseInt(e.target.value))}
          />
        </label>
        <label>
          <p>Número de Personas:</p>
          <input
            type="number"
            value={roomState.triple.people}
            min="1"
            max={MAX_PEOPLE_PER_ROOM.triple * roomState.triple.room}
            onChange={(e) => updateRoomState('triple', 'people', Math.min(parseInt(e.target.value),MAX_PEOPLE_PER_ROOM.triple * roomState.triple.room))}
          />
        </label>
        <label>
          <p>Número de Habitaciones:</p>
          <input
            type="number"
            value={roomState.triple.room}
            min="1"
            onChange={(e) => updateRoomState('triple', 'room', parseInt(e.target.value))}
          />
        </label>
        
      </div>
        <div className="btn-box">
        <button onClick={() => {handleBookNow('triple')}} className="btn btn2">Book Now</button>
        </div>
      </section>

      {/* Habitación Cuádruple */}
      <section className='seccion_room'>
        <div className="img_room">
          <img src={imgPrueba} alt="Habitación Cuádruple" />
        </div>
        <h2>Habitación Cuádruple</h2>
        <div className='descripcion'>
          <p>Cuatro camas individuales</p>
          <p>Baño</p>
          <p>Minibar</p>
          <p>TV por cable</p>
          <p>Total: ${calculateTotal('cuadruple')}</p>
        </div>
        <div className="totales">
        <label>
          <p>Número de Noches:</p>
          <input
            type="number"
            value={roomState.cuadruple.nights}
            min="1"
            onChange={(e) => updateRoomState('cuadruple', 'nights', parseInt(e.target.value))}
          />
        </label>
        <label>
          <p>Número de Personas:</p>
          <input
            type="number"
            value={roomState.cuadruple.people}
            min="1"
            max={MAX_PEOPLE_PER_ROOM.cuadruple * roomState.cuadruple.room}
            onChange={(e) => updateRoomState('cuadruple', 'people', Math.min(parseInt(e.target.value),MAX_PEOPLE_PER_ROOM.cuadruple * roomState.cuadruple.room))}
          />
        </label>
        <label>
          <p>Número de Habitaciones:</p>
          <input
            type="number"
            value={roomState.cuadruple.room}
            min="1"
            onChange={(e) => updateRoomState('cuadruple', 'room', parseInt(e.target.value))}
          />
        </label>
        
      </div>
        <div className="btn-box">
        <button onClick={() => {handleBookNow('cuadruple')}} className="btn btn2">Book Now</button>
        </div>
      </section>
    </div>
  );
};

export default RoomsPage;