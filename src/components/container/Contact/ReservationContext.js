import React, { createContext, useState } from 'react';

export const ReservationContex = createContext();

export const ReservationProvider = ({children}) =>{
    const [reservationDetails, setReservationDetails] = useState({
        nights: 1,
        people: 1,
        total: 0,
    });

    return (
        <ReservationContex.Provider
            value={{reservationDetails, setReservationDetails}}>
                {children}
            </ReservationContex.Provider>
    )
}