import React, {useEffect,  useState } from 'react'
import { useParams} from 'react-router-dom';
import SimilarTags from './SimilarTags';
import EditTag from './EditTag';

function Tags() {
    const { id } = useParams();
    const[ myTags, setMyTags] = useState( [] );
    const[ movieCard, setMovieCard] = useState( [] );
    const[ similarMovie, setSimilarMovie] = useState( [] )
    const [tagForm, setTagForm] = useState( {} );

    useEffect( function(){
        loadTags();
        allTagMovies();

        }, [] );

    async  function loadTags(){
       
        const fetchTags = await fetch(`/api/tags/${id}`).then( result => result.json() ) 
    
        setMyTags([...fetchTags])
        // console.log(fetchTags)
    }

    async function allTagMovies(){
        const allMovies = await fetch(`/api/movies/${id}`).then( result => result.json() )
        // console.log(allMovies)
        setMovieCard(allMovies);
    }
    
    async function getMovieData(tag){
        // console.log(tag);
        const movieCards = await fetch(`/api/movietag/${id}/${tag}`).then( result => result.json() ) 
        setMovieCard(movieCards);
        getSimilarTagMovies(tag);
    }
    
    async function getSimilarTagMovies(tag){

        const similarMoviesTag = await fetch(`/api/similartag/${id}/${tag}`).then( result => result.json() )
        
        setSimilarMovie(similarMoviesTag) 
        
    }
    function submitTag(e, idx){
        e.preventDefault();
        setTagForm( {id: idx, state: false} );
    }

    function handleBtnSubmit(e, idx){
        e.preventDefault();
        setTagForm( {id: idx, state: true} );
        // ( e.target.id ? setTagForm (true) : setTagForm(false) )           
    }

    async function handleDelete(e, movieId, userId){
        e.preventDefault();
        const apiDelete = await fetch(`/api/delete/${movieId}/${userId}`, 
            {   
                method: 'delete'
            }
        ).then( result => result.json());
        console.log(apiDelete.message);
        allTagMovies();
        loadTags();
    }
    // console.log(similarMovie);
    // console.log(movieCard)

    return (
        <div>             
        <div class="row mt-4">
                    
                    <div class="col-lg-2 mt-4">
                        <h4 class="text-left">Your Tags</h4>
                        {myTags.map( item =>
                        <button class="text-left" style={{padding: '10px', width:'10rem', backgroundColor: 'transparent', borderStyle: 'none', color: 'white'}} onClick={() => getMovieData(item)} >{item}</button> )}
                    </div> 
                    <div class="col-lg-10 mt-4">
                        <div calss="row">
                            <div class="col-lg-12">
                                {movieCard.length !== 0 ? <div class="col-lg-12"><h4>Your Movies By Tags</h4></div> : <div class="col-lg-12"><h4>You have not saved movies by Tag yet!</h4></div>}
                                { movieCard.map( (movie, idx) => 
                                <div class="card cardStyle d-inline-flex m-2" style={{width: '10rem'}}>
                                {movie.image && movie.image !== "null" ? <img class="" style={{minHeight:'70px', height:'160px', objectFit: 'cover'}} src={`https://image.tmdb.org/t/p/w500/${movie.image}`} alt={movie.title} /> : <img class="card-img-top" src='https://via.placeholder.com/150/000000/FFFFFF/'  /> }
                                <div class="text-center">{movie.title}</div>
                                    <div class="mt-2">
                                        <div type="button" id={idx} onClick={e => handleBtnSubmit(e, idx)} class='btn myBtn mr-2' style={{color: 'red'}} title="Edit"><i class="fas fa-edit"></i></div>
                                        {  tagForm.id == idx && tagForm.state  ? <EditTag submitTag={submitTag} idx={idx} movieId={movie.movieId} movieTags={movie.tags} userId={movie.userId}/> : '' }
                                        <button type="button" class='btn myBtn'  onClick={e => handleDelete(e, movie.movieId, movie.userId)} style={{color: 'red'}} title="Delete"><i class="fas fa-times"></i></button></div>
                                    </div>)}
                            </div>
                            <div class="col-lg-12">
                                <SimilarTags similarMovie ={similarMovie} />
                                
                            </div>
                        </div>
             
                    </div>
                    
                    
        </div>
               
            
        </div>
    )
}

export default Tags
// 