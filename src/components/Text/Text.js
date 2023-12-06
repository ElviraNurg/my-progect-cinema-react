import style from './text.module.css'

const Text = (props) => {
    const { parent, text, textType } = props;
    //Для мелких текстов
    let className = parent;
    
    return (
        <>
            {textType === 'h2' ? <h2 className={style[className]}>
                {text}
            </h2>
                : <p className={style[className]}>
                    {text}
                </p>}

        </>)
}
export default Text;