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
    const clicker = useSelector(state => state.datas.datas.clicker);
    let valueReg = useSelector(state => state.datas.datas.valueReg);
    const inputErr = useSelector(state => state.datas.datas.inputErr);
    const authorizedUser = useSelector(state => state.datas.datas.authorizedUser);
    const isLoading = useSelector(state => state.datas.movies.isLoading);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isEnter = clicker === 'enter';

    let isValid = isEnter ? inputErr.emailErr === '' ? true : false
        : inputErr.nameErr === '' && inputErr.emailErr === '' ? true : false;
    const headerText = isEnter ? 'Рады видеть!' : 'Добро пожаловать!'
    const buttonText = isEnter ? 'Войти' : 'Зарегистрироваться';
    const buttonFooterText = isEnter ? 'Ещё не зарегистрированы?' : 'Уже зарегистрированы?';
    const linkText = isEnter ? 'Регистрация' : 'Войти';
    const linkNavigateTo = isEnter ? '/signup' : '/signin';
    const buttonOnClick = isEnter ? () => dispatch(authorization()) : () => dispatch(registration())
    const linkOnClick = isEnter ? () => dispatch(onClickRegistration()) : () => dispatch(onClickEnter())
    useEffect(() => {
        dispatch(validateReg());
    }, [valueReg, inputErr, isValid])

    useEffect(() => { }, [clicker])

   /* const token = localStorage.getItem('token')
     useEffect(() => {
        !authorizedUser && token && dispatch(checkToken());
        console.log('EnterPage');
    }, [token])   
 */
   // console.log('authorizedUser ', authorizedUser);
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
                        {clicker === 'enter' ?
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