import style from './button.module.css'
const Button = (props) => {
    const { parent, text, onClick, disabledMoreButton } = props;
    return (
        <>
            {disabledMoreButton ? <span className={style.text}>Больше нет фильмов</span>
                : <button onClick={(item) => onClick(item)} className={style[parent]} >
                    {text}
                </button>}


        </>)
}
export default Button;