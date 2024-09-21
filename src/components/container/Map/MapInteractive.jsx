import React, { useRef, useState } from 'react';
import { Stage, Layer, Image, Circle, Text } from 'react-konva';
import useImageHook from '../../hooks/imageHook';
import useCarouselImg from '../../hooks/useImgCarouselHook';
import mapImg from '../../../resources/profile/maps/Map.jpg';
import {Modal, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from 'react-slick';

const InteractiveMap = () => {
    const stageRef = useRef(); // Uso correcto del useRef aquí

    // Usa el hook correctamente
    const [mapImage] = useImageHook(mapImg);

    const[showModal, setShowModal] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState(null);

    // Posiciones de los iconos
    const markers = [
        { x: 325, y: 215, label: 'JAGUAR SPA', info:"cualquier cosa", menu:'Carta del lugar'},
        { x: 465, y: 295, label: 'SAMAN', info:"cualquier cosa", menu:'Carta del lugar'  },
        { x: 117, y: 355, label: 'CAUCE', info:"cualquier cosa", menu:'Carta del lugar'  },
        { x: 420, y: 365, label: 'NACIMIENTO', info:"cualquier cosa", menu:'Carta del lugar'},
        { x: 616, y: 428, label: 'TROPICO', info:"cualquier cosa", menu:'Carta del lugar'},
        { x: 558, y: 375, label: 'TUMBAGA', info:"cualquier cosa", menu:'Carta del lugar'},
        { x: 460, y: 510, label: 'CASABAE', info:"cualquier cosa", menu:'Carta del lugar'},
    ];

    const images = useCarouselImg(selectedMarker?.label);

    const handleMarkerClick = (marker) => {
        setSelectedMarker(marker);
        setShowModal(true);
        console.log(marker);
    };

    const handleClose = ()=>{
        setShowModal(false);
        setSelectedMarker(null);
    }

    const sliderSettins = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    }

    return (
        <div className="map-interactive"> 
            <Stage width={window.innerWidth} height={window.innerHeight} ref={stageRef}>
                <Layer>
                    {/* Cargar imagen */}
                    {mapImage && <Image image={mapImage} x={0} y={0} width={window.innerWidth} height={window.innerHeight}>
                    </Image>}
                    {/* Agregar marcadores */}
                    
                    {markers.map((marker, index) => (
                        <React.Fragment key={index}>
                            <Circle
                                x={marker.x}
                                y={marker.y}
                                radius={10}
                                fill="transparent"
                                border="black"
                                onClick={() => handleMarkerClick(marker)}

                            />
                            <Text
                                x={marker.x + 12}
                                y={marker.y - 10}
                                text={marker.label}
                                fontSize={15}
                                fill="black"
                                
                            />
                        </React.Fragment>
                    ))}
                </Layer>
            </Stage>
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedMarker?.label}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {images.length > 0 ?(<Slider{...sliderSettins}>
                {images.map((imgSrc, index) =>(<div key={index} className="carousel-slide">
                    <img src={imgSrc} alt={`Slider ${index}`} style={{width: '100%', borderRadius: '8px'}}/>
                </div>))}
                </Slider>) : (<p style={{color: 'black'}}>No hay imagenes disponibles</p>)}
                    <h5>{selectedMarker?.label}</h5>
                    <p>{selectedMarker?.info}</p>
                    <h5>carta</h5>
                    <p>{selectedMarker?.menu}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variante="secundary" onClick={handleClose}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
       </div> 
    );
};

export default InteractiveMap;