import React, {useEffect, useState} from 'react';

export const useCustomRangeDebounce = (value: number[], delay: number) => {
    const [range, setRange] = useState(value)
    useEffect(()=>{
        const setTime = setTimeout(()=>{
            setRange(value)
        }, delay)
        return () =>{
            clearTimeout(setTime)
        }
    },[value])
    return range
};

