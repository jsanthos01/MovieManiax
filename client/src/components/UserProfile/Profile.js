import React, {useState, useEffect} from 'react'
import AvatarUpload from './AvatarUpload';
import { Link } from "react-router-dom";
import Bio from './Bio';

function Profile() {
    const userid = localStorage.id;
    const [ profileInfo, setProfileInfo] = useState( {} )
    const [ watchList, setwatchList] = useState( [] )
    const [ favoriteList, setFavoriteList] = useState ( [] )
    const [ friendList, setFriendList] = useState ( [] )
    const [ showForm, setShowForm] = useState( false )
    const [ newDate, setNewDate] = useState( '' )
    const [ bioForm, setBioForm] = useState( false )
    const [ myReviews, setMyReviews] = useState( [] )
    // console.log(userid);
    

    async function loadAvatar(){  

        const profileData = await fetch(`/api/avatar/${userid}`).then( result => result.json() )  
        setProfileInfo (profileData)
        setwatchList( profileData.watchlist);
        setFavoriteList( profileData.favourites )
        setFriendList( profileData.friendList)
        setMyReviews( profileData.myReviews)
        let date = new Date(profileData.createdAt)
        let newDate = date.toString().substring(4, 15)
        setNewDate( newDate )
        
    }
    function loadFriendProfile(){  
            window.location.reload(true);
        }
    
    useEffect( function(){
        loadAvatar();
    }, [bioForm, showForm] );

    function uploadPic( e ){
        e.preventDefault();
        setShowForm(false);
    } 

    function handleBioSubmit( e ){
        e.preventDefault();
        setBioForm(false);
    }

    return (
        <div>
            <div class="row mt-4" style={{color: "white"}}>
                <div class="col-lg-8">  
                    <div class="row ml-4">
                        <div class="col">
                            <div class="row">
                                <div class="col-4">
                                    <img src={profileInfo.profileImg} style={{minHeight:'70px', height:'120px'}} alt="..." class="img-thumbnail"/><br/>
                                    { showForm ? <AvatarUpload uploadPic={uploadPic} /> : 
                                        <div >
                                            <button onClick={function(){ setShowForm(true) }}>
                                                edit</button>
                                        </div> }
                                </div>    
                                
                                <div class="col-6">
                                    <h1 >{profileInfo.name}</h1>
                                    <small class="text-muted ml-4">Movie Maniax member since {newDate}</small>
                                </div>
                            </div>  
                            <div class="row mt-4">
                                
                                <div class="col-12">
                                    <form class="mt-2">
                                        { bioForm ? <Bio handleBioSubmit={handleBioSubmit} /> : 
                                        <button style={{backgroundColor: 'transparent', borderStyle: 'none', color: 'white'}}  onClick={() => { setBioForm(true) }}><p class="text-left">{profileInfo.bio}<span class="pl-2"><i class="fas fa-pencil-alt"></i></span></p></button>}
                                        
                                    </form>
                                    
                                </div>
                            </div>
                            <div class="col-12 mt-4" style={{border: '1px solid grey'}}></div>

                            <div class="row mt-4">
                                 <div class="col"> 
                                    <div class="row">
                                        <div class="col-12">
                                            <h3 style={{display: 'inline', marginRight:'5px'}}>Your Watchlist  </h3><span><i style={{padding:'5px', background: 'blue', borderRadius: '3px'}} class="fas fa-bookmark"></i></span>
                                        </div>

                                        <div class="col mt-4 mb-4">
    
                                            { watchList.slice(0, 10).map(movie => 
                                                    <div class="card d-inline-flex m-2" style={{width: '10rem'}}>
                                                    {movie.image && movie.image !== "null" ? <img class="" style={{minHeight:'70px', height:'160px', objectFit: 'cover'}} src={`https://image.tmdb.org/t/p/w500/${movie.image}`} alt={movie.title} /> : <img class="card-img-top" src='https://via.placeholder.com/150/000000/FFFFFF/'  /> }
                                                    <div class="text-center"><a href="#" >{movie.title}</a></div>
                                            </div>)}
                            
                                        </div>
                                        { watchList.length !== 0 ? <div class="col-12"><Link to={`/watchlist/${userid}`} class="ml-2" style={{color:'white'}}>More</Link></div> : <div class="col-12">Add movies to your watch list</div>}
                                    </div>
                                 </div>              
                                <div class="col-12 mt-4" style={{ border: '1px solid grey'}}></div>                
                            </div>
                            <div class="row mt-4">
                                 <div class="col"> 
                                    <div class="row">
                                        <div class="col-12">
                                            <h3 style={{display: 'inline', marginRight:'5px'}}>Your Favorites </h3><span><i style={{ padding:'5px', background: 'red', borderRadius: '3px'}} class="fas fa-heart"></i></span>
                                        </div>
                                        <div class="col mt-4 mb-4">

                                            { favoriteList.slice(0, 10).map(movie => 
                                                <div class="card d-inline-flex m-2" style={{width: '10rem'}}>
                                                {movie.image && movie.image !== "null"? <img class="" style={{minHeight:'70px', height:'160px', objectFit: 'cover'}} src={`https://image.tmdb.org/t/p/w500/${movie.image}`} alt={movie.title} /> : <img class="card-img-top" src='https://via.placeholder.com/150/000000/FFFFFF/'  /> }
                                                <div class="text-center"><a href="#" >{movie.title}</a> </div>                                    
                                            </div> )}
                                            
                                        </div>
                                        { favoriteList.length !== 0 ? <div class="col-12"><Link to={`/favourites/${userid}`} class="ml-2" style={{color:'white',}}>More</Link></div> : <div  class="col-12">List out your favorite movies! </div>}
                                    </div>
                                 </div>
                                <div class="col-12 mt-4" style={{border: '1px solid grey' }}></div>
                            </div>
                            <div class="row mt-4">
                                 <div class="col"> 
                                    <div class="row">
                                        <div class="col-12">
                                            <h3 style={{display: 'inline', marginRight:'5px'}}>Your Reviews </h3><span><i style={{padding: '5px', backgroundColor: 'green', borderRadius: '3px' }} class="fas fa-users"></i></span>
                                        </div>
                                        <div class="col mt-4 mb-4">
                                            {myReviews.slice(0, 10).map(item => 
                                            <div class="row">
                                                    
                                                    <div class="col-8">
                                                        <div class="row">
                                                            <h4 class="col-12 mt-2">Movie Title</h4>
                                                            <div class="col-12">
                                                                <p>
                                                                {item.comment}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                            </div>)}
                                        </div>
                                    </div>
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-4">
                    <div class="row justify-content-center">
                        <div class="col-8">
                            <h4 class="text-center">Quick Links</h4>
                            <div class="row">
                                <div class="col">
                                        <div class="text-center"> <Link to={`/favourites/${userid}`}>Watchlist</Link></div>
                                        <div class="text-center"><Link to={`/favourites/${userid}`}>Favorites</Link></div>
                                </div>
                            </div>
                            
                        </div>
                        <div class="col-8 mt-4">
                            <h4 class="text-center">Followers</h4>
                            <div class="row justify-content-center">
                                <div class="col">   
                                    { friendList.slice(0, 10).map(friend => 
                                        <div>
                                            <div class="mt-4">
                                                <div style={{display: 'block', width:'60px', margin: "0 auto"}}>
                                                    {<img class="" style={{ minHeight:'50px', height:'70px', borderRadius: '30px'}} src={friend.image} alt={friend.name} /> }
                                                </div>    
                                        </div>
                                            <div class="text-center"><Link to={`/friendProfile/${friend.friendId}`}>{friend.name}</Link></div>                                    
                                        </div> )
                                    }
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile