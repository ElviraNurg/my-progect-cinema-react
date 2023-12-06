import style from './input.module.css';


const Input = ({ text, readonly, value, type, placeholder, parent, onChange}) => {

    return (<>
        <label  forHtml={text} className={style[parent]}>{text}
        <input onChange={(e)=>onChange(e)}  name={text} value={value} type={type} placeholder={placeholder} disabled={readonly} />
        </label>
        </>
    )
}
export default Input