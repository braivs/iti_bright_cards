import React, {useState} from 'react';
import {Range, getTrackBackground} from 'react-range';

interface IPriceRangeProps {
// loading: boolean;
// error: string;
//
// name: string;
//
// logoutCallback: () => void;


}

const PriceRange: React.FC<IPriceRangeProps> = (
    {
// loading,
// error,
//
// name,
//
// logoutCallback,
    }

) => {
    const [values, setValues] = useState([0, 10]);

    return (
        <Range
            values={values}
            step={0.2}
            min={0}
            max={10}
            onChange={values => setValues(values)}
            renderTrack={({props, children}) => (
                <div
                    onMouseDown={props.onMouseDown} //выполняется при нажатии клавиши
                    onTouchStart={props.onTouchStart} //срабатывает при касании элемента
                    style={{
                        ...props.style,
                        height: '36px',
                        display: 'flex',
                        width: '50%',
                        margin: '30px',
                    }}
                >
                    <div
                        ref={props.ref}
                        style={{
                            height: '5px',
                            width: '100%',
                            borderRadius: '4px',
                            background: getTrackBackground({
                                values: values,
                                colors: ['#ccc', 'yellow', '#ccc'],
                                min: 0,
                                max: 10,
                            }),
                            alignSelf: 'center'
                        }}
                    >
                        {children}
                    </div>
                </div>
            )}
            renderThumb={({index, props, isDragged}) => (
                <div
                    {...props}
                    style={{
                        ...props.style,
                        height: '12px',
                        width: '12px',
                        borderRadius: '1px',
                        backgroundColor: '#FFF',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0px 2px 6px #AAA',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '-28px',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                            padding: '4px',
                            borderRadius: '4px',
                            backgroundColor: '#fbbf62'
                        }}
                    >
                        {values[index].toFixed(0)}
                        {/*// 10.12345 => 10; (1) => 10.1; (2) > 10.12; ...*/}
                    </div>
                    <div
                        style={{
                            height: '16px',
                            width: '5px',
                            backgroundColor: isDragged ? '#fbbf62' : '#CCC'
                        }}
                    />
                </div>
            )}
        />
    );
};

export default PriceRange;