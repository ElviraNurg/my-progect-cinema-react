import style from './enterform.module.css'
import Logo from '../../components/Logo/Logo';
import Button from '../../components/Button/Button';
import Wrapper from '../../components/Wrapper/Wrapper';
import Form from '../../components/Form/Form';
import Text from '../../components/Text/Text';
import Input from '../../components/Input/Input';
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux';
import { onClickEnter, onClickRegistration } from '../../store/dataSlice'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
const Enterform = () => {
 
    const datas= useSelector(state=>state.datas.datas)
   console.log(datas.clicker);
   const dispatch=useDispatch();
 useEffect(()=>{

 },[datas.clicker]) 
    return (<>
        <section className={style.enterForm}>
            <Wrapper  parent={'logo__enter'} >
                <Logo parent={'logo__enter'} />
                <Text parent={'enter__form__title'} text={datas.clicker === 'enter' ? 'Рады видеть!': 'Добро пожаловать!'} textType={'h2'} />
            </Wrapper>
            <div className={style.form__wrapper}>
                {datas.clicker === 'enter' ?
                    <Form parent={'enter__form'} >
                        <Input parent={'enter__form'}  text={'E-mail'} />
                        <Input parent={'enter__form'}  text={'Пароль'} />
                    </Form>
                    : <Form parent={'enter__form'} >
                    <Input parent={'enter__form'}  text={'Имя'} />
                    <Input parent={'enter__form'}  text={'E-mail'} />
                    <Input parent={'enter__form'}  text={'Пароль'} />
                </Form>}
            </div>
            <div className={style.button__wrapper}>
                <Button text={datas.clicker==='enter' ? 'Войти' : 'Зарегистрироваться'} parent={'enter__form__button'}  />
                <div className={style.button__wrapper__footer}>
                    <Text parent={'enter__form__text'} text={datas.clicker==='enter' ? 'Ещё не зарегистрированы?': 'Уже зарегистрированы?'} textType={'p'} />
                    <Link className={style.enter__form__link} onClick={datas.clicker==='enter' ? ()=>dispatch(onClickRegistration()) :()=>dispatch(onClickEnter()) } to={'/Enter'}>{datas.clicker==='enter' ? 'Регистрация': 'Войти'}</Link>
                </div>
            </div>
        </section>

    </>)
}
export default Enterform;