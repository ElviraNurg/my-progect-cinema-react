import style from './about.module.css'
import SectionTitle from '../SectionTitle/SectionTitle';
const About = () => {
    return (<>
        <section id='about' className={style.about__section}>
            <SectionTitle title={'О проекте'} />
            <div className={style.about__grid}>
                <div>
                    <div className={style.about__text__wrapper}>
                        <h3 className={style.about__text}>
                            Дипломный проект включал 5 этапов
                        </h3>
                    </div>
                    <div className={style.about__description__wrapper}>
                        <p className={style.about__description}>
                            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                        </p>
                    </div>
                </div>
                <div>
                    <div className={style.about__text__wrapper}>
                        <h3 className={style.about__text}>
                            На выполнение диплома ушло 5 недель
                        </h3>
                    </div>
                    <div className={style.about__description__wrapper}>
                        <p className={style.about__description}>
                            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                        </p>
                    </div>
                </div>
            </div>


            <table className={style.about__table}>
                <tbody>
                    <tr className={style.table__firstrow} >
                        <th className={style.table__row__cell}>1 неделя</th>
                        <th className={style.table__row__cell}>4 недели</th>
                    </tr>
                    <tr className={style.table__row}>
                        <th className={style.table__row__cell}>Back-end</th>
                        <th className={style.table__row__cell}>Front-end</th>
                    </tr>
                </tbody>

            </table>


        </section>

    </>)
}
export default About;