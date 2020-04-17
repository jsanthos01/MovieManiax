import React from 'react'
import { Link, useLocation } from "react-router-dom";

function TabBar(props) {
    const location = useLocation();

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <Link to={`/friendProfile/${props.id}/WatchList`} className={location.pathname === `/friendProfile/${props.id}/WatchList` ? "NavLinkActive" : "nav-link"}>
                    Watch List
                    </Link>
                </li>
                <li class="nav-item active">
                    <Link to={`/friendProfile/${props.id}/FavoritesList`} className={location.pathname === `/friendProfile/${props.id}/FavoritesList`? "NavLinkActive" : "nav-link"}>
                    Favorites List
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default TabBar
