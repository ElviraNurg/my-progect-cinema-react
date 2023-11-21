import style from './student.module.css'
import SectionTitle from '../SectionTitle/SectionTitle';
import photo from '../../assets/img/student-photo.jpg'
const Student = () => {
    return (<>
        <section className={style.student__section}>
            <SectionTitle className={style.student__section__title} title={'Студент'} />
            <div className={style.stugent__grid__wrapper}>
                <div className={style.student__photo__wrapper}>
                    <img className={style.student__photo} src={photo} alt='Фото студента' width={292} height={352} />
                </div>
                <div>
                    <div className={style.student__title__wrapper}>
                        <h2 className={style.student__title}>
                            Виталий
                        </h2>
                    </div>
                    <div className={style.student__post__wrapper}>
                        <p className={style.student__post}>
                            Фронтенд-разработчик, 30 лет
                        </p>
                    </div>
                    <div className={style.student__description__wrapper}>
                        <p className={style.student__description}>
                            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
                        </p>
                    </div>
                    <div className={style.student__github__link__wrapper}>
                        <a className={style.student__github__link}>Github</a>
                    </div>
                </div>

            </div>


            <div className={style.student__portfolio__wrapper}>
                <h3 className={style.student__portfolio}>Портфолио</h3>
            </div>
            <ul className={style.portfolio__list}>
                <li className={style.portfolio__list__item}>Статичный сайт</li>
                <li className={style.portfolio__list__item}>Адаптивный сайт</li>
                <li className={style.portfolio__list__item}>Одностраничное приложение</li>
            </ul>
        </section>

    </>)
}
export default Student;