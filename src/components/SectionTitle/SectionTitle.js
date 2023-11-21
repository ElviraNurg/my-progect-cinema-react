import style from './sectiontitle.module.css'
const SectionTitle=({title})=>{
    return(
    <div className={style.title__wrapper}>
                <h2 className={style.title}>
                    {title}
                </h2>
    </div>
    )
}
export default SectionTitle