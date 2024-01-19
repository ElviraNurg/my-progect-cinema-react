import { useEffect } from "react"
import Cinema from "../Cinema/Cinema"
import Wrapper from "../Wrapper/Wrapper"
import style from './cinemaList.module.css'

const CinemaList = (props) => {
    const {displayedList, displayedSaveList, parent}=props;
    return (  <>
        {displayedList? Object.values(displayedList).map((item) => (<Cinema item={item} parent={parent}  />))
       // :Object.values(displayedSaveList).map((item) => (<Cinema item={item} parent={parent} />))
    :null}
        </>
    )
            
    
}
export default CinemaList