import React, {ChangeEvent, useState} from 'react';
import SuperInputText from "../../common/c1-SuperInputText/SuperInputText";
import s from './Examples.module.scss'
import SuperButton from "../../common/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../common/c3-SuperCheckbox/SuperCheckbox";
import SuperEditableSpan from "../../common/c4-SuperEditableSpan/SuperEditableSpan";
import SuperSelect from "../../common/c5-SuperSelect/SuperSelect";
import SuperRadio from "../../common/c6-SuperRadio/SuperRadio";

export const Examples = () => {
    const [text, setText] = useState<string>('') // for SuperInputText
    const [checked, setChecked] = useState<boolean>(false) // for SuperCheckbox
    const [value, setValue] = useState<string>('') // for SuperEditableSpan
    const arr = ['x', 'y', 'z'] // for SuperSelect & SuperRadio
    const [valueForSsSr, onChangeOption] = useState(arr[1]) // for SuperSelect & SuperRadio

    const error = text ? '' : 'error'

    const showAlert = () => { // for SuperButton
        if (error) {
            alert('введите текст...')
        } else {
            alert(text) // если нет ошибки показать текст
        }
    }


    const testOnChange = (e: ChangeEvent<HTMLInputElement>) => setChecked(e.currentTarget.checked)

    return (
        <div className={s.examples}>
            <div>This is examples of common components.</div>
            <hr/>
            <div className={s.column}>
                <div>с1-SuperInputText:</div>
                <SuperInputText
                    value={text}
                    onChangeText={setText}
                    onEnter={showAlert}
                    error={error}
                    spanClassName={s.testSpanError}
                />
                <SuperInputText
                    className={s.blue} // проверьте, работает ли смешивание классов
                />
            </div>
            <hr/>
            {/*----------------------------------------------------*/}
            <div className={s.column}>
                <div>с2-SuperButton:</div>
                <SuperButton>
                    default
                </SuperButton>
                <SuperButton
                    red // пропсу с булевым значением не обязательно указывать true
                    onClick={showAlert}
                >
                    delete {/*// название кнопки попадёт в children*/}
                </SuperButton>
                <SuperButton disabled>
                    disabled
                </SuperButton>
            </div>
            <hr/>
            {/*----------------------------------------------------*/}
            <div className={s.column}>
                <div>с3-SuperCheckbox:</div>
                <SuperCheckbox
                    checked={checked}
                    onChangeChecked={setChecked}
                >
                    some text {/*// этот текст попадёт в children*/}
                </SuperCheckbox>

                {/*// onChange тоже должен работать*/}
                <SuperCheckbox checked={checked} onChange={testOnChange}/>
            </div>
            <hr/>
            {/*----------------------------------------------------*/}
            <div>
                <div>с4-SuperEditableSpan:</div>
                <SuperEditableSpan
                    value={value}
                    onChangeText={setValue}
                    spanProps={{children: value ? undefined : 'enter text...'}}
                />
            </div>
            <hr/>
            {/*----------------------------------------------------*/}
            <div className={s.column}>
                <div>с5-SuperSelect:</div>
                <SuperSelect
                    options={arr}
                    value={valueForSsSr}
                    onChangeOption={onChangeOption}
                />
                <div>
                    <SuperRadio
                        options={arr}
                        value={value}
                        onChangeOption={onChangeOption}
                    />
                </div>

            </div>
        </div>
    );
}