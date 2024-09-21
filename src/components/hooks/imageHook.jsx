import { useState, useEffect } from 'react';

const useImageHook = (src) => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        const img = new window.Image();
        img.src = src;
        img.onload = () => {
            setImage(img);
            console.log('Imagen cargada correctamente:', img); // Verifica si la imagen se carga
        };
        img.onerror = (error) => {
            console.error('Error al cargar la imagen:', error); // Muestra el error si la imagen no carga
        };
    }, [src]);

    return [image];
};

export default useImageHook;