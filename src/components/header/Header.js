import style from './header.module.css'
import Logo from '../Logo/Logo';
import EnterRegistration from '../EnterReg/EnterRegistration';
import {  useSelector } from 'react-redux/es/hooks/useSelector';
import Nav from '../Nav/Nav';
const Header = (props ) => {
    const datas= useSelector(state=>state.datas.datas)
    const { parent} = props;
    const bc = parent=='main'? style.header__main__color:style.user__header;
    //console.log(parent, bc);
    return (
        <>
            <div className={`${bc}` }>
                 <Logo parent={'header__link__logo'} /> 
                {
                    datas.authorizedUser ?
                        <Nav parent={parent} />
                        : <EnterRegistration/>
                }
            </div >
        </>
    )
}
export default Header;