import React, { useState }  from 'react';
import './style/NavBar.css';
import { Link, useLocation } from "react-router-dom";

/* activePage  | changePage-call-back */
function NavBar(props) {
  const location = useLocation();
  const [isShown, setShown] = useState(false);
  let showClass = !isShown ? `collapse navbar-collapse`: `collapse navbar-collapse show`;
  const style = {
    logo: { width: '160 px', height: '80px' }
}

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        <img src= "https://i0.wp.com/atechguides.com/wp-content/uploads/2018/10/1-bigstock-Cinema-concept-Film-reel-pop-146972888.jpg" alt="google logo" style={style.logo} />
      </Link>
      {/* <a class="navbar-brand" href="#" onClick={ function(){ props.changePage('AboutPage')} }>Pupster</a> */}
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={()=>setShown(!isShown)}>
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class={showClass} id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto special">
          <li className="nav-item active">
            <Link to="/watchlist" className={location.pathname === "/watchlist" ? "nav-link active" : "nav-link"}>
             <p class="watchlist">WatchList</p>
            </Link>
          </li>          
          <li className="nav-item">
            <Link to="/login" className={location.pathname === "/login" ? "nav-link active" : "nav-link"}>
              <p class="signin">Sign In</p>
            </Link>
          </li>                                    
        </ul>
      </div>
    </nav>
  )
}
export default NavBar;