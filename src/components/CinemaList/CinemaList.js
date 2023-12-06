import { useEffect } from "react"
import Cinema from "../Cinema/Cinema"
import Wrapper from "../Wrapper/Wrapper"
import style from './cinemaList.module.css'
import {  useSelector, useDispatch } from 'react-redux'
const CinemaList = (props) => {
    const {displayedList, displayedSaveList, parent}=props;
    //console.log(filtredMovies);
    /* useEffect(()=>{},{filtredMovies}) */
    return (  <>
        {displayedList? Object.values(displayedList).map((item) => (<Cinema item={item} parent={parent}  />))
        :Object.values(displayedSaveList).map((item) => (<Cinema item={item} parent={parent} />))}
        </>
    )
            
    
}
export default CinemaList