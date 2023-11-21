import style from './enterform.module.css'
const Enterform = () => {
    return (<>
        <section className={style.enterForm}>

            
            <div className={style.enterForm__title__wrapper}>
                <h1 className={style.enterForm__title}>
                    Рады видеть!
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
export default Enterform;