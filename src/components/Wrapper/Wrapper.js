import style from './wrapper.module.css'
const Wrapper = ({children, parent}) => {

    return (
        <div className={style[parent]}>
            {children}          
        </div>
       )
}
export default Wrapper;