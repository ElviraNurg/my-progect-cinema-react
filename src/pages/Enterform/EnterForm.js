import style from './enterform.module.css'
import Logo from '../../components/Logo/Logo';
import Button from '../../components/Button/Button';
import Wrapper from '../../components/Wrapper/Wrapper';
import Form from '../../components/Form/Form';
import Text from '../../components/Text/Text';
import Input from '../../components/Input/Input';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { onClickEnter, onClickRegistration, handleClickReg, handleChangeReg, handleClickEnter, validateReg } from '../../store/dataSlice'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const Enterform = () => {
    const datas = useSelector(state => state.datas.datas);
    let valueReg = useSelector(state => state.datas.datas.valueReg);
    const inputErr=useSelector(state => state.datas.datas.inputErr);
    const isValid=useSelector(state => state.datas.datas.isValid);
    const dispatch = useDispatch();
console.log(valueReg);
     useEffect(() => {
        dispatch(validateReg());
    }, [valueReg]) 

    useEffect(() => {

    }, [datas.clicker])

    return (<>
        <section className={style.enterForm}>
            <Wrapper parent={'logo__enter'} >
                <Logo parent={'logo__enter'} />
                <Text parent={'enter__form__title'} text={datas.clicker === 'enter' ? 'Рады видеть!' : 'Добро пожаловать!'} textType={'h2'} />
            </Wrapper>
            <div className={style.form__wrapper}>
                {datas.clicker === 'enter' ?
                    <Form parent={'enter__form'} >
                        <Input inputname={'email'} parent={'enter__form'} text={'E-mail'} />
                        <Input inputname={'password'} parent={'enter__form'} text={'Пароль'} />
                    </Form>
                    : <Form parent={'enter__form'} >
                        {inputErr.nameErr.length>0?<span className={style.validate__error__text}>{inputErr.nameErr}</span>:null}
                        <Input onChange={(e) => dispatch(handleChangeReg({ e }))} inputname={'username'} parent={'enter__form'} text={'Имя'} />
                        {inputErr.emailErr.length>0?<span className={style.validate__error__text}>{inputErr.emailErr}</span>:null}
                        <Input onChange={(e) => dispatch(handleChangeReg({ e }))} inputname={'email'} parent={'enter__form'} text={'E-mail'} type={'email'} placeholder='name@domain.com'/>
                        <Input onChange={(e) => dispatch(handleChangeReg({ e }))} inputname={'password'} parent={'enter__form'} text={'Пароль'} type={'password'} />
                    </Form>}
            </div>
            <div className={style.button__wrapper}>
                <Button disabled={isValid?false:true} onClick={datas.clicker === 'enter' ? handleClickEnter :()=>dispatch(handleClickReg())} text={datas.clicker === 'enter' ? 'Войти' : 'Зарегистрироваться'} parent={'enter__form__button'} />
                <div className={style.button__wrapper__footer}>
                    <Text parent={'enter__form__text'} text={datas.clicker === 'enter' ? 'Ещё не зарегистрированы?' : 'Уже зарегистрированы?'} textType={'p'} />
                    <Link className={style.enter__form__link} onClick={datas.clicker === 'enter' ? () => dispatch(onClickRegistration({valueReg})) : () => dispatch(onClickEnter())} to={'/Enter'}>{datas.clicker === 'enter' ? 'Регистрация' : 'Войти'}</Link>
                </div>
            </div>
        </section>

    </>)
}
export default Enterform;