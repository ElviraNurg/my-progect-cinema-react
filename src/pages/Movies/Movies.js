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
import { handleChange, handleFilter, handleFilterShorts, handlePushMore, getDisplayedList, getDisplayedSaveList, getMoreButtunStatus } from "../../store/dataSlice";
import { getMovies } from "../../store/moviesApi";
import { useResize } from "../../utils/use-resize/use-resize"
const Movies = (props) => {
    const { parent } = props;

    const dispatch = useDispatch();
    const { isScreenM, isScreenL } = useResize()
    let filtredMovies = useSelector(state => state.datas.datas.filtredMovies)
    let disabledMoreButton = useSelector(state => state.datas.datas.disabledMoreButton);
    let displayedList = useSelector(state => state.datas.datas.displayedList);
    let displayedSaveList = useSelector(state => state.datas.datas.displayedSaveList);
    let savedMovies = useSelector(state => state.datas.datas.savedMovies);
    let movies = useSelector(state => state.datas.movies.movies);
    const searchValue=useSelector(state => state.datas.datas.searchValue)
    const [message, setMessage] = useState('');
    const [clickedShorts, setClickedShorts] = useState(false)// для определения фильтра
    //загрузка данных 
    const handleFilterMovies = () => {
        dispatch(getMovies());
    }
    const handleFilterShortMovies = () => {
        dispatch(getMovies());
        setClickedShorts(prev => !prev);
    }
    //Фильтрует фильмы в зависимости от изменений movies 
    useEffect(() => {
        dispatch(handleFilter({ movies, clickedShorts }));
    }, [movies]);
    //Изменяет DisplayedSaveList(отображаемые фильмы) если поменялся массив savedMovies
    useEffect(() => {
        dispatch(getDisplayedSaveList({clickedShorts}))
    }, [savedMovies, filtredMovies]);

    useEffect(() => {
        searchValue.length>0&&filtredMovies.length === 0 ? setMessage('Ничего не найдено') : setMessage('')
    }, [filtredMovies.length]);



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
    let displayedListCount = screenWidth();

    useEffect(() => {

        dispatch(getDisplayedList({ displayedListCount }))

    }, [filtredMovies, displayedListCount, movies]);
    
    useEffect(() => {
        dispatch(getMoreButtunStatus());

    }, [filtredMovies, displayedList, disabledMoreButton])

    return (
        <>
            <Header parent={'user'} />
            <div className={style.movies__search}>
                <div className={style.search__wrapper}>
                    <Input onChange={(e) => dispatch(handleChange({ e }))} parent={'movies__input'} type={'search'} placeholder={'Фильм'} />
                    <Button onClick={() => handleFilterMovies(movies)} parent={'movies__button'} text={'Найти'} />
                </div>
                <div className={style.movies__checkbox__wrapper}>
                    <Text parent={'movies__checkbox__text'} text={'Короткометражки'} />
                    <div className={style.movies__checkbox}>
                        <input onClick={() => handleFilterShortMovies(movies)} name={'short__movies'} className={style.checkbox} type={'checkbox'} />
                        <label className={style.checkbox__label} forhtml={'short__movies'}></label>
                        <span className={style.checkbox__toggle}></span>
                    </div>
                </div>
            </div>
            <div className={style.movies}>

                <CinemaList displayedList={parent === 'movies' ? displayedList : displayedSaveList} parent={parent} />
                <span className={style.movies__message}>{message}</span>

            </div>
            {parent === 'movies' ?
                <Wrapper parent={'movies__button__more'}>
                    {message.length === 0 ? <Button disabledMoreButton={disabledMoreButton} onClick={() => dispatch(handlePushMore({ displayedListCount }))} parent={'movies__button__more'} text={'Ещё'} />
                        : null}

                </Wrapper>
                : null}

            <Footer />
        </>
    )
}

export default Movies