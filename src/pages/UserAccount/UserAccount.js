import style from './useraccount.module.css'
import Form from '../../components/Form/Form';
import Text from '../../components/Text/Text'
import Header from '../../components/Header/Header';
import { useEffect } from 'react';
import Input from '../../components/Input/Input';
import { Link, useNavigate } from 'react-router-dom';
import { handleClickExit, saveChange, handleChangeValue, clickEdit, validateReg, checkToken} from '../../store/dataSlice';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../components/Button/Button';
const UserAccount = () => {

    const valueReg = useSelector(state => state.datas.datas.valueReg);
    const valueUser = useSelector(state => state.datas.datas.valueUser);
    //const authorizedUser = useSelector(state => state.datas.datas.authorizedUser)
    const clickedEdit = useSelector(state => state.datas.datas.clickedEdit)
    const inputErr = useSelector(state => state.datas.datas.inputErr);
    let saveButtonStatus = useSelector(state => state.datas.datas.saveButtonStatus);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    saveButtonStatus = (valueUser.name === valueReg.name && valueUser.email === valueReg.email && clickedEdit) ? true : false
   
    //const token=JSON.parse(localStorage.getItem('token'))
    useEffect(() => {

    }, [clickedEdit])

     /*  useEffect(() => {
          
    }, [token])   
 */
   
//Валидация при изменении данных пользователя
    useEffect(() => {
        dispatch(validateReg());
    }, [valueReg, inputErr, clickedEdit])
    
    
    return (<>
        <section className={style.enterForm}>
            <Header parent="user" />
            <div className={style.user__wrapper}>
                <Text parent={'user__form__title'} text={`Привет, ${valueUser.name}`} textType={'h2'} />
                {clickedEdit ?
                    <Form parent={'enter__form'}>
                        <Input onChange={(e) => dispatch(handleChangeValue({ e }))} inputname={'name'} parent={'enter__form__user'} text={'Имя'} />
                        <Input onChange={(e) => dispatch(handleChangeValue({ e }))} inputname={'email'} parent={'enter__form__user'} text={'E-mail'} />
                    </Form> :
                    <Form parent={'enter__form'}>
                        <Input inputname={'email'} parent={'enter__form__user'} value={valueUser.name} text={'Имя'} readonly={true} />
                        <Input inputname={'password'} parent={'enter__form__user'} value={valueUser.email} text={'E-mail'} readonly={true} />
                    </Form>}
            </div>
            <div className={style.button__wrapper}>
                <Button disabled={saveButtonStatus} onClick={clickedEdit ? () => dispatch(saveChange()) : () => dispatch(clickEdit())} parent={'button__edit'} text={clickedEdit ? 'Сохранить' : 'Редактировать'} />
                <Link onClick={()=>dispatch(handleClickExit())} className={style.button__exit} >Выйти из аккаунта</Link>
            </div>
        </section>

    </>)
}
export default UserAccount;