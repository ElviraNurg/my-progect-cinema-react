import Wrapper from "../Wrapper/Wrapper"
import pic from '../../assets/img/pic__cinema1.jpg';
import style from './cinema.module.css'
import { Icon } from "../Icon/Icon";
import { useEffect} from "react";
import { likedToggle } from "../../store/dataSlice";
import { useSelector, useDispatch } from "react-redux";

const Cinema = (props) => {
    const { item, parent } = props;
    
    let savedMovies = useSelector(state => state.datas.datas.savedMovies);
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
    const dispatch = useDispatch()
    useEffect(() => {
        // console.log(liked);
    }, [savedMovies])

    let imageUrl = 'https://api.nomoreparties.co/' + item.image.url;
    let linkUrl = item.trailerLink

    return (
    
        <Wrapper parent={'cinema'}>
            <a href={`${linkUrl}`}><img className={style.preview} src={imageUrl} width={300} height={168} alt="Рисунок фильма"/></a>
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