import style from './footer.module.css'
const Student = () => {
    return (<>
        <div className={style.footer__wrapper}>
            <div className={style.footer__progect__name__wrapper}><h3 className={style.footer__progect__name}>Учебный проект Яндекс.Практикум х BeatFilm.</h3></div>
            <div className={style.footer__progect__wrapper}><h3 className={style.footer__progect}>Яндекс.Практикум</h3></div>
            <div className={style.footer__progect__github__link__wrapper}><a href={'#'} className={style.footer__progect__github__link}>Github</a></div>
            <span className={style.footer__year}></span>
        </div>
    </>)
}
export default Student;