import Wrapper from "../Wrapper/Wrapper"

import style from './cinema.module.css'
import { Icon } from "../Icon/Icon";
import { useEffect } from "react";
import { deleteMovie, saveMovie, likedToggle } from "../../store/dataSlice";
import { useSelector, useDispatch } from "react-redux";

const Cinema = (props) => {
    const { item, parent } = props;

    let savedMovies = useSelector(state => state.datas.datas.savedMovies);
    let liked = ''
    const savedMoviesId = savedMovies.map(item => item.movieId)


    const likeStatus = (item, parent) => {
        if (liked = parent === 'saved') {
            return false
        } else {
            if (savedMoviesId.includes(item.id)) {
                return true
            } else {
                return null
            }
        }

    }


    const dispatch = useDispatch()

    liked = likeStatus(item, parent)
    const saveOrDelete=parent === 'movies' && liked === null ? () => dispatch(saveMovie({ item, parent })) : () => dispatch(deleteMovie({ savedMoviesId,item, parent }))
    useEffect(() => {
        likeStatus(item, parent)
    }, [])

    const imageUrl = parent === 'movies' ? 'https://api.nomoreparties.co/' + item.image.url : item.image;
    const linkUrl = item.trailerLink
    const hours = Math.floor(item.duration / 60);
    const minutes = item.duration - (hours * 60);


    return (
        <Wrapper parent={'cinema'}>
            <a href={`${linkUrl}`}><img className={style.preview} src={imageUrl} width={300} height={168} alt="Рисунок фильма" /></a>
            <div className={style.preview__name__wrapper}>
                <h3 className={style.preview__name}>{item.nameEN}</h3>
                <span onClick={saveOrDelete} className={style.preview__name__likes}>
                    <Icon liked={liked} />
                </span>
            </div>
            <div className={style.cinema__time}>
                {hours}ч.{minutes}м.
            </div>
        </Wrapper>

    )
}
export default Cinema