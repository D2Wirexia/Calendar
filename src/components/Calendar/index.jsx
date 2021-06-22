import React, {useEffect, useRef, useState} from 'react';
import style from './index.module.css'
import {getMouthDate} from "./decisionFuncCalendar";
import cn from 'classname'

const Calendar = () => {
    const facetsMinute = 10
    const mountNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август',
        'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    const daysNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    const [currentDate, setCurrentDate] = useState(new Date())
    useEffect(()=>setCurrentDate(new Date()), [])
    //дата которая показывается в календаре
    const [date, setDate] = useState(new Date())
    const calendar = getMouthDate(date.getFullYear(), date.getMonth())
    //Выбираем дату в календаре
    const [selectedDate, setSelectedDate] = useState(null)
    //авто-заполняшка
    const years = Array.apply(null, Array(7)).map((_, i) => currentDate.getFullYear() + i)
    const minute = Array.apply(null, Array(60/facetsMinute)).map((_, i) => facetsMinute * i < 10 ? '0' + facetsMinute * i : facetsMinute * i)
    const hour = Array.apply(null, Array(24)).map((_, i) => i < 10 ? '0' + i : i)
    //Выбираем год и месяц + часы и минуты в селекторе
    const mouthRef = useRef()
    const yearRef = useRef()
    const minuteRef = useRef()
    const hourRef = useRef()

    const handleSelectChange = () => {
        const newDate = new Date(yearRef.current.value, mouthRef.current.value)
        setDate(newDate)
    }
    const handleSelectChangeTime = () => {
        const newTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), hourRef.current.value,  minuteRef.current.value)
        setSelectedDate(newTime)
    }
    const prevMountButtonClick = () => {
        const newDate = new Date(date.getFullYear(), date.getMonth() - 1)
        setDate(newDate)

    }
    const nextMountButtonClick = () => {
        const newDate = new Date(date.getFullYear(), date.getMonth() + 1)
        setDate(newDate)

    }
    const chooseDayClick = date => {
        setSelectedDate(date)
    }
    return (
        <div className={style.calendar}>
            <header>
                <button onClick={()=>prevMountButtonClick()}>{'<'}</button>
                <select onChange={handleSelectChange} ref={mouthRef} value={date.getMonth()}>
                    {mountNames.map((el, i)=> <option key={el} value={i}>{el}</option> )}
                </select>
                <select onChange={handleSelectChange} ref={yearRef} value={date.getFullYear()}>
                    {years.map(el => <option key={el} value={el}>{el}</option> )}
                </select>
                <button onClick={()=>nextMountButtonClick()}>{'>'}</button>
            </header>
            <table>
                <thead>
                <tr>
                    {daysNames.map(el => <th key={el}>{el}</th>)}
                </tr>
                </thead>
                <tbody>
                {calendar.map((week, index) => <tr key={index} className={style.week}>
                    {week.map((date, i) =>
                        date ? <td key={i}
                                   className={cn({
                                       [style.activeDate]: (date.getDate() === currentDate.getDate() && date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear()),
                                        [style.selectedDate]: (date.getDate() === selectedDate?.getDate() && date.getMonth() === selectedDate?.getMonth() && date.getFullYear() === selectedDate?.getFullYear())
                                   })}
                                   onClick={()=>chooseDayClick(date)}>{date.getDate()}</td> : <td key={i}/>)}
                </tr> )}
                </tbody>
            </table>
            {selectedDate && <div className={style.oclock}>
                <select ref={hourRef} onChange={handleSelectChangeTime}>
                    {hour.map(h => <option key={h} value={h}>{h}</option> )}
                </select>
                <select ref={minuteRef} onChange={handleSelectChangeTime}>
                    {minute.map(m => <option key={m} value={m}>{m}</option> )}
                </select>
            </div>}
            <button onClick={()=>
                selectedDate ? alert(selectedDate.toLocaleString()) : alert('Выберите дату')}>Save</button>
        </div>
    )
}

export default Calendar;