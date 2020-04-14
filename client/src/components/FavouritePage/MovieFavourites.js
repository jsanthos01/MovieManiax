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
            border: "5px solid white",
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
        // console.log("Inside the Favourites Component")
        // console.log("inside the Favourites page:", getMovies)
        // console.log("inside the Favourites page 2:", getMovies[0].favourites)
        const movies = getMovies;
        // console.log(movies);
        // console.log(movies[0].name);
        setMyMovies(movies[0].favourites);
    }

    useEffect(function(){
        getSavedMovieList();
    },[])
    
    function sortOptions(option){
        setMyMovies([]);
        if(option === "alphabetical"){
            console.log(option);
            myMovies.sort(nameOrder);
            setMyMovies([...myMovies]);
        }else if(option ==="rating"){
            console.log(option);
            myMovies.sort(ratingsOrder);
            setMyMovies([...myMovies]);
        }else if(option === "date"){
            console.log(option);

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
                        <div class="col-lg-4" style={style.alignStyle}>
                            Showing All {myMovies.length} Movies
                        </div>
                        <div class="col-lg-4" style={style.alignStyle}>
                            <div class="dropdown" onClick={toggleOpen}>
                                <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Sort By:
                                </button>
                                <div class={menuClass} aria-labelledby="dropdownMenu2">
                                    <button onClick={() => sortOptions("alphabetical")}class="dropdown-item" type="button">Alphabetical</button>
                                    <button onClick={() => sortOptions("rating")}class="dropdown-item" type="button">IMDb Rating</button>
                                    <button onClick={() => sortOptions("date")}class="dropdown-item" type="button">Date Added</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4" style={style.alignStyle}>
                            <button class="btn btn-primary">Refine</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="album py-50">
                <div class="container">
                    <div class="row">
                        <FavouritesCard myMovies={myMovies} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieFavourites
