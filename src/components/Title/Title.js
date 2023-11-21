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
                <p className={style.description}>
                    Листайте ниже, чтобы узнать больше про этот проект и его создателя.
                </p>
            </div>
            <button className={style.button} >
                Узнать больше
            </button>
        </section>

    </>)
}
export default Title;