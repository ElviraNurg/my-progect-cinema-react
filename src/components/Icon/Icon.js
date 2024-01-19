import { HandySvg } from 'handy-svg';
import iconSrc from '../../assets/img/icon__heard.svg';
import iconSrcWhite from '../../assets/img/icon__heard__white.svg';
import iconDel from '../../assets/img/icon_del.svg'

export const Icon = (props) => {
    const { liked } = props;  
    let SrcCheck = liked=== true ?iconSrc : iconDel;

    return (
        <HandySvg
            src={liked===null? iconSrcWhite:SrcCheck}
            
            width="10"
            height="9"
        />
    )
}
