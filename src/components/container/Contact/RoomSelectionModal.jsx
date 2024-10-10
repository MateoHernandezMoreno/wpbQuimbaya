import React from 'react';
import { Modal } from 'react-bootstrap';
import { Stage, Layer, Image as KonvaImage, Circle } from 'react-konva';
import useImage from 'use-image';
import MapImage from '../../../resources/profile/maps/Map.jpg';

const RoomSelectionModal = ({ showModal, onClose, onRoomSelect, roomType, hotelRooms }) => {
  // Asegúrate de usar la ruta correcta de la imagen (puedes cambiar a una importación directa si es necesario)
  const [image, status] = useImage(MapImage); 

  const roomCoordinates = {
    //doble sencilla
    '18' : {x: 535, y: 510},
    '27' : {x: 535, y: 497},
    '31' : {x: 675, y: 465},
    '32' : {x: 675, y: 475},
    '40' : {x: 58, y: 286},
    '41' : {x: 58, y: 306},
    '42' : {x: 58, y: 323},
    '43' : {x: 58, y: 340},
    '44' : {x: 58, y: 365},
    '70' : {x: 571, y: 510},
    '71' : {x: 553, y: 510},
    '72' : {x: 535, y: 510},
    '73' : {x: 613, y: 508},
    '74' : {x: 625, y: 498},
    '75' : {x: 640, y: 488},
    //doble conJacuzzi
    '28': { x: 618, y: 474},
    '29': { x: 638, y: 474},
    '30': { x: 658, y: 474},
    //triples
    '2' : {x: 510, y: 509},
    '3' : {x: 494, y: 509},
    '4' : {x: 478, y: 509},
    '5' : {x: 462, y: 509},
    '6' : {x: 336, y: 514},
    '7' : {x: 306, y: 520},
    '8' : {x: 306, y: 510},
    '9' : {x: 297, y: 543},
    '10' : {x: 253, y: 540},
    '11' : {x: 223, y: 548},
    '12' : {x: 200, y: 548},
    '13' : {x: 180, y: 548},
    '14' : {x: 176, y: 528},
    '16' : {x: 316, y: 540},
    
    //cuadruples
    
    '37': { x: 160, y: 290},
    '38': { x: 115, y: 290},
    '39': { x: 100, y: 290},
    '45': { x: 185, y: 345},
    '46': { x: 205, y: 345},
    '47': { x: 224, y: 345},
    '48': { x: 243, y: 345},
    '49': { x: 262, y: 345},
    '50': { x: 185, y: 362},
    '51': { x: 205, y: 362},
    '52': { x: 224, y: 362},
    '53': { x: 243, y: 362},
    '59': { x: 68, y: 420},
    '54': { x: 262, y: 362},
    '60': { x: 562, y: 375},
    '61': { x: 582, y: 375},
    '62': { x: 602, y: 375},
    // Agrega las demás habitaciones con sus coordenadas correspondientes
  };

  const handleRoomClick = (room) => {
    onRoomSelect(room);
  };

  // //filtra habitaciones segun el tipo selecionad

  const filteredRooms = hotelRooms[roomType] || [];
  

  // Muestra algún mensaje de estado mientras carga la imagen
  if (status === 'loading') {
    return <div>Cargando imagen...</div>;
  }

  if (status === 'failed') {
    return <div>Error al cargar la imagen.</div>;
  }

  return (
    <Modal show={showModal} onHide={onClose} size="lg" width={850}>
      <Modal.Header closeButton>
        <Modal.Title>Selecciona una Habitación</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <Stage width={800} height={600} draggable>
          <Layer>
            {image && <KonvaImage image={image} width={850} height={650} />}

            {filteredRooms.map((room, idx) => (
              <Circle
                key={idx}
                x={roomCoordinates[room]?.x || 0}
                y={roomCoordinates[room]?.y || 0}
                radius={6}
                fill="rgba(215, 170, 23, 0.09)"
                stroke="black"
                strokeWidth={1.5}
                onClick={() => handleRoomClick(room)}
              />
            ))}
          </Layer>
        </Stage>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={onClose}>Cerrar</button>
      </Modal.Footer>
    </Modal>
  );
};

export default RoomSelectionModal;