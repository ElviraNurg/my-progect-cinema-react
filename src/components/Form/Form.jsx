import style from './form.module.css'
const Form = ({children, parent}) => {
    let className = parent==='enter__form'? style.enter__form : null
    return (
                <div className={className}>
                    {children}
                </div>
    )
}
export default Form