import React from 'react'
import { Link, useLocation } from "react-router-dom";

function TabBar(props) {
    const location = useLocation();

    return (
        <nav class="tabBar">
            <ul class="d-flex">
                <li class="">
                    <Link to={`/friendProfile/${props.id}/About`} className={location.pathname === `/friendProfile/${props.id}/About` ? "NavLinkActive" : "navLink"}>
                    About Me
                    </Link>
                </li>
                <li class="">
                    <Link to={`/friendProfile/${props.id}/WatchList`} className={location.pathname === `/friendProfile/${props.id}/WatchList` ? "NavLinkActive" : "navLink"}>
                    Watch List
                    </Link>
                </li>
                <li class="nav-item active">
                    <Link to={`/friendProfile/${props.id}/FavoritesList`} className={location.pathname === `/friendProfile/${props.id}/FavoritesList`? "NavLinkActive" : "navLink"}>
                    Favorites List
                    </Link>
                </li>
                <li class="nav-item active">
                    <Link to={`/friendProfile/${props.id}/FollowerList`} className={location.pathname === `/friendProfile/${props.id}/FollowerList`? "NavLinkActive" : "navLink"}>
                    Follower List
                    </Link>
                </li>
                <li class="nav-item active">
                    <Link to={`/friendProfile/${props.id}/Reviews`} className={location.pathname === `/friendProfile/${props.id}/Reviews`? "NavLinkActive" : "navLink"}>
                        Reviews
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default TabBar
