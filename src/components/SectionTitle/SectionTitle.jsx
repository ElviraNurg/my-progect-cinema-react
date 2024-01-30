import style from './sectiontitle.module.css'
const SectionTitle = ({ title }) => {
    return (
        <h2 className={style.title}>
            {title}
        </h2>
    )
}
export default SectionTitle