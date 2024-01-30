import style from './registrationform.module.css'
import Logo from '../../components/Logo/Logo';
import Button from '../../components/Button/Button';
import Wrapper from '../../components/Wrapper/Wrapper';
import Form from '../../components/Form/Form';
import Text from '../../components/Text/Text'
const RegistrationForm = () => {


    return (<>
        <section className={style.enterForm}>
            <div className={style.logo__wrapper}>
                <Logo className={style.logo__enter} />
                <Text className={style.logo__text} text={'Добро пожаловать!'} textType={'p'} />
            </div>
            <div className={style.form__wrapper}>
                <Form className={style.form__registration} />
            </div>
            <div className={style.button__wrapper}>
                <Button text={'Зарегистрироваться'} className={style.button__enter} />
                <div className={style.button__wrapper__footer}>
                    <Text text={'Уже зарегистрированы?'} textType={'p'} className={style.enter__text} />
                    <Button href={'#'} text={'Войти'} className={style.button__link} />
                </div>

            </div>


        </section>

    </>)
}
export default RegistrationForm;