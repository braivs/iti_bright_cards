import React from 'react';
import './App.css';
import {Examples} from "./common/c9-Examples/Examples";

export const App = () => {
    return (
        <div className="App">
            <Examples/>
            {/*hashRouter, provider*/}
            <>
                {/*в хэдер добавим навлинки чтобы прыгать по проекту через хэдер, а не через логику*/}
                {/*<Main/>*/}
                    {/* внутри Main отрисовываем Header и роуты */}
                    {/*<Header/>*/}
            </>
        </div>
    );
}