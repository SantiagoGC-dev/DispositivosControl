import React, { createContext, useState, useEffect } from 'react';
import { getLights, toggleLight } from '../api/lightsApi';
import { getDoors, toggleDoor } from '../api/doorsApi';

export const DevicesContext = createContext();

export const DevicesProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar luces y puertas desde API
  const loadDevices = async () => {
    try {
      const lights = await getLights(); // [{ id, name, status }]
      const doors = await getDoors();   // [{ id, name, status }]

      const allDevices = [
        ...lights.map(light => ({ ...light, type: 'light' })),
        ...doors.map(door => ({ ...door, type: 'door' }))
      ];

      setDevices(allDevices);
      setLoading(false);
    } catch (error) {
      console.error('Error cargando dispositivos:', error);
      setLoading(false);
    }
  };

  // Cambiar el estado de un dispositivo (API + estado global)
  const toggleDevice = async (deviceId) => {
    const device = devices.find(d => d.id === deviceId);
    if (!device) return;

    const newStatus =
      device.type === 'light'
        ? device.status === 'on' ? 'off' : 'on'
        : device.status === 'locked' ? 'unlocked' : 'locked';

    try {
      // Llamada a la API correspondiente
      if (device.type === 'light') {
        await toggleLight(deviceId);
      } else {
        await toggleDoor(deviceId);
      }

      // Si fue exitoso, actualizar estado local
      setDevices(prevDevices =>
        prevDevices.map(d =>
          d.id === deviceId ? { ...d, status: newStatus } : d
        )
      );
    } catch (error) {
      console.error('Error al cambiar el estado del dispositivo:', error);
    }
  };

  useEffect(() => {
    loadDevices();
  }, []);

  return (
    <DevicesContext.Provider value={{ devices, loading, toggleDevice }}>
      {children}
    </DevicesContext.Provider>
  );
};
