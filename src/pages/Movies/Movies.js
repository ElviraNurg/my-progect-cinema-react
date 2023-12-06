import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import CinemaList from "../../components/CinemaList/CinemaList"
import Input from '../../components/Input/Input'
import style from './movies.module.css'
import Button from '../../components/Button/Button'
import Text from "../../components/Text/Text"
import Wrapper from "../../components/Wrapper/Wrapper"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { getData, getMovies, handleChange, handleFilter, handleFilterShorts, handlePushMore, getDisplayedList, getDisplayedSaveList, getMoreButtunStatus } from "../../store/moviesApi";
import { useResize } from "../../components/use-resize/use-resize"
const Movies = (props) => {
    const { parent } = props;
   
    const dispatch = useDispatch();
    const { width, isScreenS, isScreenM, isScreenL } = useResize()
    let filtredMovies = useSelector(state => state.datas.movies.filtredMovies)
    let disabledMoreButton = useSelector(state => state.datas.movies.disabledMoreButton)
    let displayedSaveList = useSelector(state => state.datas.movies.displayedSaveList);
    let savedMovies = useSelector(state => state.datas.movies.savedMovies);
    //загрузка данных 
    const handleFilterMovies = () => {
        dispatch(getMovies());
        //dispatch(getData());
        dispatch(handleFilter())
    }
    const handleFilterShortMovies = () => {
        dispatch(getMovies());
        //dispatch(getData());
        dispatch(handleFilterShorts())
    }
    useEffect(() => {
        dispatch(getDisplayedSaveList())
    }, [savedMovies]);
    const movies = useSelector(state => state.datas.movies.movies);
    let displayedList = useSelector(state => state.datas.movies.displayedList);

    const screenWidth = () => {
        let displayedListCount = 0;
        if (isScreenL) {
            displayedListCount = 16;
        } else {
            if (isScreenM) {
                displayedListCount = 8;
            } else {
                displayedListCount = 5;
            }
        }
        return displayedListCount;
    }
    let displayedListCount = screenWidth()
    useEffect(() => {
        dispatch(getDisplayedList({ displayedListCount }))
    }, [filtredMovies, displayedListCount]);
useEffect(()=>{
    dispatch(getMoreButtunStatus());
},[filtredMovies, displayedList, disabledMoreButton])

    return (
        <>
            <Header parent={'user'} />
            <div className={style.movies__search}>
                <div className={style.search__wrapper}>
                    <Input onChange={(e) => dispatch(handleChange({ e }))} parent={'movies__input'} type={'search'} placeholder={'Фильм'} />
                    <Button onClick={() => handleFilterMovies()} parent={'movies__button'} text={'Найти'} />
                </div>
                <div className={style.movies__checkbox__wrapper}>
                    <Text parent={'movies__checkbox__text'} text={'Короткометражки'} />
                    <div className={style.movies__checkbox}>
                        <input onClick={() => handleFilterShortMovies()} name={'short__movies'} className={style.checkbox} type={'checkbox'} />
                        <label className={style.checkbox__label} forhtml={'short__movies'}></label>
                        <span className={style.checkbox__toggle}></span>
                    </div>
                </div>
            </div>
            <div className={style.movies}>
                <CinemaList displayedList={parent === 'movies' ? displayedList : displayedSaveList} parent={parent} />
            </div>
            {parent === 'movies' ?
                <Wrapper parent={'movies__button__more'}>
                    <Button disabledMoreButton={disabledMoreButton} onClick={() => dispatch(handlePushMore({ displayedListCount }))} parent={'movies__button__more'} text={'Ещё'} />
                </Wrapper>
                : null}

            <Footer />
        </>
    )
}

export default Movies