import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import CinemaList from "../../components/CinemaList/CinemaList"
import Input from '../../components/Input/Input'
import style from '../Movies/movies.module.css'
import Button from '../../components/Button/Button'
import Text from "../../components/Text/Text"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { handleChange, handleFilter, getDisplayedSaveList, getSavedMovies } from "../../store/dataSlice";

import Preloader from "../../components/Preloader/preloader"

const SavedMovies = (props) => {
    const { parent } = props;

    const dispatch = useDispatch();
    const filtredMovies = useSelector(state => state.datas.datas.filtredMovies)
    const displayedSaveList = useSelector(state => state.datas.datas.displayedSaveList);
    const savedMovies = useSelector(state => state.datas.datas.savedMovies);
    const movies = useSelector(state => state.datas.movies.movies);
    const isLoading = useSelector(state => state.datas.movies.isLoading);
    let searchValueInSave = useSelector(state => state.datas.datas.searchValueInSave)
    const [message, setMessage] = useState('');
    const [clickedShortsInSave, setClickedShortsInSave] = useState( false)// для определения фильтра
    const [clickedFind, setClickedFind] = useState(false)// для определения фильтра
    const [savedLocal, setSavedLocal] = useState([])
    //Первая загрузка сохраненных фильмов пользователя
    useEffect(()=>{dispatch(getSavedMovies())},[]);

    

    useEffect(() => {
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
    }, [savedMovies]);
 //загрузка данных 
    useEffect(() => {
        setSavedLocal(localStorage.getItem('savedMovies'))
    }, [savedMovies]);
   
    const handleFilterMovies = () => {
        setClickedFind(prev => !prev);
    }

    const handleFilterShortMovies = () => {
        setClickedShortsInSave(!clickedShortsInSave);
    }
    
    //Фильтрует фильмы в зависимости от изменений movies 
    useEffect(() => {
        dispatch(handleFilter({ movies,clickedShortsInSave, parent }));
        
    }, [clickedFind, clickedShortsInSave, parent]);

    //Изменяет DisplayedSaveList(отображаемые фильмы) если поменялся массив savedMovies
    useEffect(() => {
        dispatch(getDisplayedSaveList({ clickedShortsInSave }))
    }, [savedLocal, filtredMovies]);

    useEffect(() => {
        (searchValueInSave.length > 0 || clickedShortsInSave) && filtredMovies.length === 0 ? setMessage('Ничего не найдено') : setMessage('')
    }, [filtredMovies.length]);

    return (
        <>
            {isLoading ? <Preloader /> :
                <div>
                    <Header parent={'user'} />
                    <div className={style.movies__search}>
                        <div className={style.search__wrapper}>
                           
                            <Input onChange={(e) => dispatch(handleChange({ e, parent }))}
                                parent={'movies__input'}
                                type={'search'}
                                placeholder={'Фильм'} 
                               />
                                
                            <Button onClick={() => handleFilterMovies(movies)}
                                parent={'movies__button'}
                                text={'Найти'} />
                        </div>
                        <div className={style.movies__checkbox__wrapper}>
                            <Text parent={'movies__checkbox__text'}
                                text={'Короткометражки'} />
                            <div className={style.movies__checkbox}>
                                <input
                                    onClick={() => handleFilterShortMovies(movies)}
                                    name={'short__movies'}
                                    className={style.checkbox} type={'checkbox'}
                                    checked={clickedShortsInSave} />
                                <label className={style.checkbox__label} forhtml={'short__movies'}></label>
                                <span className={style.checkbox__toggle}></span>
                            </div>
                        </div>
                    </div>
                    <div className={style.movies}>

                        <CinemaList displayedList={displayedSaveList} parent={parent} />
                        <span className={style.movies__message}>{message}</span>

                    </div>
                    <Footer />

                </div>
            }
        </>
    )
}

export default SavedMovies