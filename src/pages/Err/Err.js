import Button from '../../components/Button/Button'
import style from './err.module.css'
import Text from '../../components/Text/Text'
import { Link, useNavigate } from 'react-router-dom';

const Err = () => {
    let navigate = useNavigate();
    
    function handleClick() {
        navigate(-1);
        console.log();
    }
    return (
        <>
            <section className={style.error__page}>
                <Text parent={'error__page__text'} text={404} />
                <p className={style.error__page__description}>Страница не найдена</p>
                <Link onClick={handleClick}  className={style.error__page__link} > Назад</Link>
            </section>
        </>
    )
}
export default Err