import React from 'react';
import { Modal } from 'react-bootstrap'; // Si ya estás usando React-Bootstrap
import { Stage, Layer, Image as KonvaImage, Circle } from 'react-konva';
import useImage from 'use-image';

const RoomSelectionModal = ({ showModal, onClose, onRoomSelect }) => {
  const [image] = useImage('../../../resources/profile/maps/Map.jpg'); // Cambia esta ruta por la de tu imagen de mapa
  const roomCoordinates = {
    'Room 1': { x: 100, y: 150 },
    'Room 2': { x: 200, y: 250 },
    // Agrega las demás habitaciones con sus coordenadas correspondientes
  };

  const handleRoomClick = (room) => {
    onRoomSelect(room);
  };

  return (
    <Modal show={showModal} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Selecciona una Habitación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stage width={800} height={600} draggable>
          <Layer>
            <KonvaImage image={image} width={800} height={600} />

            {Object.keys(roomCoordinates).map((room, idx) => (
              <Circle
                key={idx}
                x={roomCoordinates[room].x}
                y={roomCoordinates[room].y}
                radius={10}
                fill="red"
                stroke="black"
                strokeWidth={2}
                onClick={() => handleRoomClick(room)} // Seleccionar habitación al hacer clic
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