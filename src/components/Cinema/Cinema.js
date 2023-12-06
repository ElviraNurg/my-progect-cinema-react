import Wrapper from "../Wrapper/Wrapper"
import pic from '../../assets/img/pic__cinema1.jpg';
import style from './cinema.module.css'
import { Icon } from "../Icon/Icon";
import { useEffect, useState } from "react";
import { likedToggle } from "../../store/moviesApi";
import { useSelector, useDispatch } from "react-redux";
const Cinema = (props) => {
    const { item, parent } = props;
    
    let savedMovies = useSelector(state => state.datas.movies.savedMovies);
    let liked='';
   
    if(savedMovies.includes(item)&&parent==='saved'){
            liked=false;
        }else{
            if(savedMovies.includes(item)&&parent==='movies'){
                liked = true
            }else{
                liked=null
            }          
        }
    
    
    //console.log(liked);
    const dispatch = useDispatch()
    useEffect(() => {
        // console.log(liked);
    }, [savedMovies])

    let imageUrl = 'https://api.nomoreparties.co/' + item.image.url;

    return (
    
        <Wrapper parent={'cinema'}>
            <img className={style.preview} src={imageUrl} width={300} height={168} />
            <div className={style.preview__name__wrapper}>
                <h3 className={style.preview__name}>{item.nameEN}</h3>
                <span  onClick={() => dispatch(likedToggle( {item, parent}))} className={style.preview__name__likes}>
                    <Icon  liked={liked}  />
                </span>
            </div>
            <div className={style.cinema__time}>
                {item.duration}
            </div>
        </Wrapper>

    )
}
export default Cinema