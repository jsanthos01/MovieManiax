import React, {useState, useContext, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import FavouritesCard from "./FavouritesCard"

function MovieFavourites() {
    const [myMovies, setMyMovies] = useState( [] );
    const { id } = useParams();
    const [state, setState] = useState({isOpen: false})
    const menuClass = `dropdown-menu${state.isOpen ? " show" : ""}`;
    
    function toggleOpen () {
        setState({isOpen: !state.isOpen})
    }

    const style = {
        header: {textAlign: "center", paddingBottom: "30px"},
        rowStyle: {
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // border: "5px solid white",
            margin: "10px"
        },
        alignStyle: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }
    }
    
    async function getSavedMovieList(){
        const getMovies = await fetch(`/api/favourites/${id}`).then(res => res.json());
        const movies = getMovies;
        const sortedMovies = movies[0].favourites.reverse()
        // console.log(sortedMovies)
        setMyMovies(sortedMovies);
    }

    useEffect(function(){
        getSavedMovieList();
    },[])
    
    function sortOptions(option){
        setMyMovies([]);
        if(option === "alphabetical"){
            myMovies.sort(nameOrder);
            setMyMovies([...myMovies]);
        }else if(option ==="rating"){
            myMovies.sort(ratingsOrder);
            setMyMovies([...myMovies]);
        }else if(option === "reverse alphabetical"){
            myMovies.sort(reverseNameOrder);
            setMyMovies([...myMovies]);
        }
    }

    //Sort by Name(Alphabetical)
    function nameOrder(a,b){
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        if(titleA > titleB){
            return 1;
        }else if(titleA < titleB){
            return -1
        }
        return 0
    }
    //Sort by Name(Reverse Alphabetical)
    function reverseNameOrder(a,b){
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        if(titleA < titleB){
            return 1;
        }else if(titleA > titleB){
            return -1
        }
        return 0
    }

    //Sort By ID
    function ratingsOrder(a,b){
        return Number(a.ratings) - Number(b.ratings);
    }

    return (
        <div>
            <div className="header">
                <div class="container-fluid">
                    <h1 style={style.header}>Your Favourites</h1>
                    <div class="row" style={style.rowStyle}>
                        <div class="col-lg-6" style={style.alignStyle}>
                            Showing All {myMovies.length} Movies
                        </div>
                        <div class="col-lg-6" style={style.alignStyle}>
                            <div class="dropdown" onClick={toggleOpen}>
                                <button class="btn  myBtnPink dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Sort By:
                                </button>
                                <div class={menuClass} aria-labelledby="dropdownMenu2">
                                    <button onClick={() => sortOptions("alphabetical")}class="dropdown-item" type="button">Alphabetical</button>
                                    <button onClick={() => sortOptions("rating")}class="dropdown-item" type="button">IMDb Rating</button>
                                    <button onClick={() => sortOptions("reverse alphabetical")}class="dropdown-item" type="button">Reverse Alphabetical</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="album py-50">
                <div class="container">
                    <div class="row">
                    { myMovies.length > 0 ? <FavouritesCard myMovies={myMovies} getSavedMovieList={getSavedMovieList} />: 'You have not added to your favourites' }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieFavourites
