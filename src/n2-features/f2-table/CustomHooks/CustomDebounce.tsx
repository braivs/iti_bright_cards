import React, {useEffect, useState} from 'react';

export const useCustomDebounce = (value: string, delay: number) => {
    const [state, setState] = useState(value)

    useEffect(() => {
        const setTime = setTimeout(() => {
            setState(value)
        }, delay)

        return () => {
            clearTimeout(setTime)
        }
    }, [value])
    return state
};

