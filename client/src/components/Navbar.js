import React, { useState }  from 'react';
import './style/NavBar.css';
import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();
  const [isShown, setShown] = useState(false);
  let showClass = !isShown ? `collapse navbar-collapse`: `collapse navbar-collapse show`;

  const id = localStorage.id;
  console.log(id);

  const userName = localStorage.name;
  console.log(userName);

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        <img src="https://icons.iconarchive.com/icons/designbolts/free-multimedia/1024/Film-icon.png" style={{width: "40px"}}/>
        MovieManiax
      </Link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={()=>setShown(!isShown)}>
        <span class="navbar-toggler-icon"></span>
      </button>

      <div className={showClass} id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">        
              <li className="nav-item">
                <Link to="/searchMovie" className={location.pathname === "/searchMovie" ? "nav-link active" : "nav-link"}>
                Search
                </Link>
              </li>  
              { !id ? 
              <li className="nav-item">
                  <Link to="/login" className={location.pathname === "/login" ? "nav-link active" : "nav-link"}>
                  Login
                  </Link>
              </li> :
                <li className="nav-item">
                  <Link to="/logout" className={location.pathname === "/logout" ? "nav-link active" : "nav-link"}>
                  Logout
                  </Link>
                </li> 
              } 
                          
              { !id ? '': 
                <li className="nav-item">
                    <Link to={`/watchlist/${id}`} className={location.pathname === `/watchlist/${id}` ? "nav-link active" : "nav-link"}>
                    WatchList
                    </Link>
                </li> 
              } 
              { !id ? '': 
                <li className="nav-item">
                    <Link to={`/favourites/${id}`} className={location.pathname === `/favourites/${id}` ? "nav-link active" : "nav-link"}>
                    Favourites
                    </Link>
                </li> 
              } 
              { !id ? '':
                <li className="nav-item">
                    <Link to={`/user/${id}`} className={location.pathname === `/userid/${id}` ? "nav-link active" : "nav-link"}>
                    {`${userName}`}
                    </Link>
                </li>  
              }
              { !id ? '': 
                <li className="nav-item">
                  <Link to="/friendList" className={location.pathname === "/friendList" ? "nav-link active" : "nav-link"}>
                  Friends
                  </Link>
                </li>  
              }
          </ul>
      </div>
    </nav>
  )
}
export default NavBar;