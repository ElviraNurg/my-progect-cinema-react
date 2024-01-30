import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Text from '../Text/Text'
import style from './title.module.css'
const Title = () => {
    return (<>
        <section className={style.title__section}>
            <div className={style.title__wrapper}>
                <h1 className={style.title}>
                    Учебный проект студента факультета Веб-разработки.
                </h1>
            </div>
            <div className={style.description__wrapper}>
                <Text parent={'description'} text={' Листайте ниже, чтобы узнать больше про этот проект и его создателя.'}/>
                   
            </div>
            <HashLink smooth to='#about' className={style.title__button}  >Узнать больше</HashLink>
               
            
        </section>

    </>)
}
export default Title;