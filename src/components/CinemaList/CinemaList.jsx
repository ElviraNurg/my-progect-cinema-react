import Cinema from "../Cinema/Cinema"

const CinemaList = (props) => {
    const {displayedList, parent}=props;
    return (  <>
        {displayedList &&  displayedList.map((item) => (<Cinema item={item} parent={parent}  />))}
        </>
    )    
}
export default CinemaList