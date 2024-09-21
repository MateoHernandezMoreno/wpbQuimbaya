// src/hooks/useCarouselImages.js
import { useState, useEffect } from 'react';

function useCarouselImages(markerLabel) {
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (!markerLabel) return;

        // Mapear el nombre del marcador a un set específico de imágenes
        let imagesContext;
        try {
            imagesContext = require.context(`../../resources/carousel/${markerLabel.toLowerCase()}`, false, /\.(png|jp?g|svg)$/);
        } catch (error) {
            // Si no se encuentra ninguna imagen, devolver un array vacío o manejar error
            setImages([]);
            return;
        }

        const imagePaths = imagesContext.keys().map(imagesContext);
        setImages(imagePaths);
    }, [markerLabel]);

    return images;
}

export default useCarouselImages;