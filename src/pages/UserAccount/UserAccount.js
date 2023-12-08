import style from './useraccount.module.css'
import Form from '../../components/Form/Form';
import Text from '../../components/Text/Text'
import Header from '../../components/Header/Header';
import { useState } from 'react';
import Input from '../../components/Input/Input';
import { Link } from 'react-router-dom';
const UserAccount = () => {
    const [clickedEdit, setClickedEdit] = useState(false)
    const clickEdit = () => {
        setClickedEdit(prev => !prev);
    }
    return (<>
        <section className={style.enterForm}>
            <Header parent="user" />
            <div className={style.user__wrapper}>
                <Text parent={'user__form__title'} text={'Привет, Виталий!'} textType={'h2'} />
                {clickedEdit ?
                    <Form parent={'enter__form'}>
                        <Input inputname={'email'} parent={'enter__form__user'}  text={'Имя'} />
                        <Input inputname={'password'} parent={'enter__form__user'}  text={'E-mail'} />
                    </Form> : 
                    <Form parent={'enter__form'}>
                        <Input inputname={'email'} parent={'enter__form__user'} value={'Виталий'} text={'Имя'} readonly={true} />
                        <Input inputname={'password'} parent={'enter__form__user'} value={'pochta@yandex.ru'} text={'E-mail'} readonly={true} />
                    </Form>}
            </div>
            <div className={style.button__wrapper}>
                <Link onClick={clickEdit} className={style.button__edit} >{clickedEdit?'Сохранить' : 'Редактировать'}</Link>
                <Link className={style.button__exit} >Выйти из аккаунта</Link>
            </div>
        </section>

    </>)
}
export default UserAccount;