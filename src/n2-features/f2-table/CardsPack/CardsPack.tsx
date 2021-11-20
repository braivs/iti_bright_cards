import React from 'react';

type PropsType = {
    Name: string
    cardsCount: number
    updated: string
}

export const CardsPack: React.FC<PropsType> = (props) => {
    debugger
    return <div>
        <div>{props.Name}</div>
        <div>{props.cardsCount}</div>
        <div>{props.updated}</div>
    </div>

}