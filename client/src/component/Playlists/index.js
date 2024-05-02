import { useContext } from "react";
import Navigation from "../navbar/Navigation";
import "./index.css"
import ThemeContext from "../../contexts/themeContext";
function Playlists() {
    const {theme,setTheme} = useContext(ThemeContext);

    return ( 
        <>
            <Navigation/>
            <section style={{marginLeft:"16%"}}>
                    <h1 className={`title-${theme}`}>Playlists</h1>
            </section>
        </>
     );
}

export default Playlists;