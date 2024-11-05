import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { accelerometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import { Subscription } from 'rxjs';
import colors from '../../styles/colors';
import { io, Socket } from 'socket.io-client';

interface IPosition {
    x: number,
    y: number,
    z?: number
}

interface IMovementArguments {
    clickStatus?: string | null;
    setClickStatus?: (argument: null | 'left' | 'right') => void;
}

const MovementLogger = ({clickStatus, setClickStatus}: IMovementArguments) => {
    const [lastPosition, setLastPosition] = useState<null | IPosition>(null);
    const [isMoving, setIsMoving] = useState(false);
    const [socket, setSocket] = useState<null | Socket>(null);
    const url = 'http://127.0.0.1:5000';

    const hasChanged = useCallback(({ x, y}: IPosition): boolean => {
        const MOVEMENT_THRESHOLD = 0.03;
        if (lastPosition) {

            const diffX = x - lastPosition.x;
            const diffY = y - lastPosition.y;

            if (Math.abs(diffX) > MOVEMENT_THRESHOLD || Math.abs(diffY) > MOVEMENT_THRESHOLD) {
                return true;
            }
            return false;

        }

        return false;
    }, [lastPosition]);

    useEffect(() => {
        // Set the update interval for the accelerometer
        setUpdateIntervalForType(SensorTypes.accelerometer, 100); // update every 100ms

        const subscription: Subscription = accelerometer.subscribe(({ x, y, z }) => {
            setIsMoving(false);
            // Log the movement values to the console
            if (!lastPosition || hasChanged({ x, y })) {
                setLastPosition({ x, y});
                setIsMoving(true);
                console.log(`Movement detected: x: ${x}, y: ${y}, z: ${z}`);
            }
        });

        // Cleanup subscription on unmount
        return () => {
            subscription.unsubscribe();
        };
    }, [hasChanged, lastPosition]);

    useEffect(() => {
        console.log({connectingTo: url})
        const newSocket = io(url, {
            transports: ['websocket'],
        });

        newSocket.on('connect', () => {
            console.log('Socket.IO connection established');
        });

        newSocket.on('disconnect', () => {
            console.log('Socket.IO connection disconnected');
        });

        setSocket(newSocket);

        // Clean up the connection when the component unmounts
        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socket && socket.connected) {
            const dataToSend = JSON.stringify(lastPosition);
            socket.emit('valueChange', dataToSend);
            console.log('Emitted value:', dataToSend);
        }
    }, [lastPosition, socket]);

    useEffect(() => {
        if (socket && socket.connected) {
            socket.emit('click', clickStatus);
            console.log('Emitted value:', clickStatus);
            if (setClickStatus) {
                setClickStatus(null);
            }
        }
    }, [clickStatus, setClickStatus, socket]);

    return (
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={{ backgroundColor: isMoving ? colors.blue : colors.red, width: '100%', height: 50 }} />
    );
};

export default MovementLogger;
