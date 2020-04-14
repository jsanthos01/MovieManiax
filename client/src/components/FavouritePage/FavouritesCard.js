import React from 'react'

function FavouritesCard(props) {
    console.log(props.myMovies);
    const imgStyle = {
        height: "50vh",
        objectFit: "cover"
    }
    return (
        <>
        {props.myMovies.map(movie => (
            <div class="col-md-4" style={{color: "black"}}>
                <div class="card mb-4 shadow-sm">
                {movie.image && movie.image ? <img style={imgStyle} class="card-img-top" src={`https://image.tmdb.org/t/p/w500/${movie.image}`} alt="something" /> : <img style={imgStyle} class="card-img-top" src='https://www.kindpng.com/picc/m/18-189751_movie-placeholder-hd-png-download.png'  /> }
                    <div class="card-body">
                    <h2 class="card-title"><b>{movie.title}</b></h2>
                        <p class="card-text"><b>Ratings</b>: {movie.ratings}/10</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-primary">View</button>
                                <button type="button" class="btn btn-sm btn-outline-danger">Delete</button>
                            </div>
                            <small class="text-muted">9 mins</small>
                        </div>
                    </div>
                </div>
            </div>
        ))}
        </>
    )
}

export default FavouritesCard
