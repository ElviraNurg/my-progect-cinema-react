import style from './footer.module.css'
const Student = () => {
    return (<>
        <div className={style.footer__wrapper}>
            <h3 className={style.footer__progect__name}>Учебный проект Яндекс.Практикум х BeatFilm.
            </h3>
            <div>
                <h3 className={style.footer__progect}>Яндекс.Практикум</h3>
                <a href={'#'} className={style.footer__progect__github__link}>Github</a>
                <span className={style.footer__year}></span>
            </div>

        </div>
    </>)
}
export default Student;