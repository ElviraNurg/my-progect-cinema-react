import style from './input.module.css';


const Input = ({ text,inputname, readonly, value, type, placeholder, parent, onChange}) => {
    
    return (<>
        <label  forhtml={inputname} className={style[parent]}>{text}
        <input onChange={(e)=>onChange(e)}  name={inputname} value={value} type={type} placeholder={placeholder} disabled={readonly} />
        </label>
        </>
    )
}
export default Input