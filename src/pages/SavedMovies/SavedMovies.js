import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import CinemaList from "../../components/CinemaList/CinemaList"
import Input from '../../components/Input/Input'
import style from '../Movies/movies.module.css'
import Button from '../../components/Button/Button'
import Text from "../../components/Text/Text"
import Wrapper from "../../components/Wrapper/Wrapper"
import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { getMovies, handleChange, handleFilter, handleFilterShorts, handlePushMore, getDisplayedSaveList } from "../../store/dataSlice";

const SavedMovies = () => {
    const dispatch = useDispatch();
    //let searchValue=useSelector(state=>state.datas.movies.searchValue);
    let savedMovies = useSelector(state => state.datas.movies.savedMovies);
    const movies = useSelector(state => state.datas.movies.movies);
    let displayedSaveList = useSelector(state => state.datas.movies.displayedSaveList);
    //console.log(movies);

    useEffect(() => {
        dispatch(getDisplayedSaveList())
    }, [savedMovies]);

    return (
        <>
            <Header parent={'user'} />
            <div className={style.movies__search}>
                <div className={style.search__wrapper}>
                    <Input onChange={(e) => dispatch(handleChange({ e }))} parent={'movies__input'} type={'search'} placeholder={'Фильм'} />
                    <Button onClick={() => dispatch(handleFilter())} parent={'movies__button'} text={'Найти'} />
                </div>
                <div className={style.movies__checkbox__wrapper}>
                    <Text parent={'movies__checkbox__text'} text={'Короткометражки'} />
                    <div className={style.movies__checkbox}>
                        <input onClick={() => dispatch(handleFilterShorts())} name={'short__movies'} className={style.checkbox} type={'checkbox'} />
                        <label className={style.checkbox__label} forhtml={'short__movies'}></label>
                        <span className={style.checkbox__toggle}></span>
                    </div>
                </div>
            </div>
            <div className={style.movies}>
                <CinemaList displayedList={displayedSaveList} parent='saved' />
            </div>
            <Wrapper parent={'movies__button__more'}>
                <Button onClick={() => dispatch(handlePushMore())} parent={'movies__button__more'} text={'Ещё'} />
            </Wrapper>
            <Footer />
        </>
    )
}

export default SavedMovies