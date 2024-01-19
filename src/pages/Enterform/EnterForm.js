import style from './enterform.module.css'
import Logo from '../../components/Logo/Logo';
import Button from '../../components/Button/Button';
import Wrapper from '../../components/Wrapper/Wrapper';
import Form from '../../components/Form/Form';
import Text from '../../components/Text/Text';
import Input from '../../components/Input/Input';
import { useSelector, useDispatch } from 'react-redux'
import { onClickEnter, onClickRegistration, registration, handleChangeReg, authorization, validateReg, checkToken } from '../../store/dataSlice'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Preloader from '../../components/Preloader/preloader';
const Enterform = () => {
    const datas = useSelector(state => state.datas.datas);
    let valueReg = useSelector(state => state.datas.datas.valueReg);
    const inputErr = useSelector(state => state.datas.datas.inputErr);
    const authorizedUser = useSelector(state => state.datas.datas.authorizedUser);
    const isLoading = useSelector(state => state.datas.movies.isLoading);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let isValid = datas.clicker === 'enter' ? inputErr.emailErr === '' ? true : false
        : inputErr.nameErr === '' && inputErr.emailErr === '' ? true : false;
    // console.log('isValid' , isValid);
    // console.log('inputErr' , inputErr);
    const headerText = datas.clicker === 'enter' ? 'Рады видеть!' : 'Добро пожаловать!'
    const buttonText = datas.clicker === 'enter' ? 'Войти' : 'Зарегистрироваться';
    const buttonFooterText = datas.clicker === 'enter' ? 'Ещё не зарегистрированы?' : 'Уже зарегистрированы?';
    const linkText = datas.clicker === 'enter' ? 'Регистрация' : 'Войти';
    const linkNavigateTo = datas.clicker === 'enter' ? '/signup' : '/signin';
    const buttonOnClick = datas.clicker === 'enter' ? () => dispatch(authorization()) : () => dispatch(registration())
    const linkOnClick = datas.clicker === 'enter' ? () => dispatch(onClickRegistration()) : () => dispatch(onClickEnter())
    useEffect(() => {
        dispatch(validateReg());
    }, [valueReg, inputErr, isValid])

    useEffect(() => {

    }, [datas.clicker])
    const token = localStorage.getItem('token')
    useEffect(() => {
        dispatch(checkToken())
    }, [token])

    authorizedUser && navigate("/movies")

    return (<>

        {
            isLoading ? <Preloader />
                : <section className={style.enterForm}>
                    <Wrapper parent={'logo__enter'} >
                        <Logo parent={'logo__enter'} />
                        <Text parent={'enter__form__title'} text={headerText} textType={'h2'} />
                    </Wrapper>
                    <div className={style.form__wrapper}>
                        {datas.clicker === 'enter' ?
                            <Form parent={'enter__form'} >
                                {inputErr.nameErr.length > 0 && <span className={style.validate__error__text}>{inputErr.emailErr}</span>}
                                <Input onChange={(e) => dispatch(handleChangeReg({ e }))} inputname={'email'} parent={'enter__form'} text={'E-mail'} />

                                <Input onChange={(e) => dispatch(handleChangeReg({ e }))} inputname={'password'} parent={'enter__form'} text={'Пароль'} type={'password'} />
                            </Form>
                            : <Form parent={'enter__form'} >
                                {inputErr.nameErr.length > 0 && <span className={style.validate__error__text}>{inputErr.nameErr}</span>}
                                <Input onChange={(e) => dispatch(handleChangeReg({ e }))} inputname={'nameUser'} parent={'enter__form'} text={'Имя'} />
                                {inputErr.emailErr.length > 0 && <span className={style.validate__error__text}>{inputErr.emailErr}</span>}
                                <Input onChange={(e) => dispatch(handleChangeReg({ e }))} inputname={'email'} parent={'enter__form'} text={'E-mail'} type={'email'} placeholder='name@domain.com' />
                                <Input onChange={(e) => dispatch(handleChangeReg({ e }))} inputname={'password'} parent={'enter__form'} text={'Пароль'} type={'password'} />
                            </Form>}
                    </div>
                    <div className={style.button__wrapper}>
                        <Button disabled={!isValid} onClick={buttonOnClick} text={buttonText} parent={'enter__form__button'} />
                        <div className={style.button__wrapper__footer}>
                            <Text parent={'enter__form__text'} text={buttonFooterText} textType={'p'} />
                            <Link className={style.enter__form__link} onClick={linkOnClick} to={linkNavigateTo}>{linkText}</Link>
                        </div>
                    </div>
                </section>
        }


    </>)
}
export default Enterform