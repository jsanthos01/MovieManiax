import React from 'react'

function SimilarTags(props) {
    return (
        <div>
            { props.similarMovie.length !== 0 ? <div class="col-lg-12 mt-4">
                <h4>Movies With Similar Tags By Other Movie Manix</h4>
            </div> : ''}
            { props.similarMovie ? props.similarMovie.map(movie => 
            <div class="card cardStyle d-inline-flex m-2 mx-auto" style={{width: '10rem'}}>
            {movie.image && movie.image !== "null" ? <img class="" style={{minHeight:'70px', height:'160px', objectFit: 'cover'}} src={`https://image.tmdb.org/t/p/w500/${movie.image}`} alt={movie.title} /> : <img class="card-img-top" src='https://via.placeholder.com/150/000000/FFFFFF/'  /> }
            <div class="text-center">{movie.title}</div>
            </div>) : ''}
            
        </div>
    )
}

export default SimilarTags
