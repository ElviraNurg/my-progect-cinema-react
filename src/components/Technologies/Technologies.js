import style from './technologies.module.css'
import SectionTitle from '../SectionTitle/SectionTitle';
const Technologies = () => {
    return (<>
        <section className={style.technologies__section}>
            <SectionTitle title={'Технологии'} />
            <div className={style.technologies__title__wrapper}>
                <h2 className={style.technologies__title}>
                    7 технологий
                </h2>
            </div>
            <div className={style.technologies__description__wrapper}>
                <p className={style.technologies__description}>
                    На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
                </p>
            </div>
            <ul className={style.technologies__list}>
                <li className={style.technologies__list__item}>HTML</li>
                <li className={style.technologies__list__item}>CSS</li>
                <li className={style.technologies__list__item}>JS</li>
                <li className={style.technologies__list__item}>React</li>
                <li className={style.technologies__list__item}>Git</li>
                <li className={style.technologies__list__item}>Express.js</li>
                <li className={style.technologies__list__item}>mongoDB</li>
            </ul>



        </section>

    </>)
}
export default Technologies;