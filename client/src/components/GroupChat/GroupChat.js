import React from 'react'

function GroupChat() {
    const style ={
        height: "60vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%",
        backgroundImage:  "linear-gradient(to right, rgba(3.14%, 14.51%, 40.39%, 0.5) 150px, rgba(7.06%, 20.39%, 50.59%, 0.4) 100%), url(https://techlog360.com/wp-content/uploads/2019/09/Different-chatting-apps.jpg)"

    }
    return (
        <div>
            <div class="jumbotron text-dark" style={style}>
                <h1 class="display-4" style={{textAlign: "center", fontWeight: "900"}}>My Movie GroupChats</h1>
            </div>
            <div class="chatDashboardContainer" style={{textAlign: "center"}} >
                <div class="row">
                    <div class="col-lg-4 mb-5">
                        <img class="rounded-circle" src="https://abduzeedo.com/sites/default/files/styles/home_cover/public/originals/abdz_infrared_arashiyama_mockup_0.jpg?itok=9lsBMY9U" alt="Generic placeholder image" width="140" height="140" />
                        <h2>Heading</h2>
                        <p><a class="btn btn-primary" href="#" role="button">Chat Now!</a></p>
                    </div>
                    
                    <div class="col-lg-4">
                        <img class="rounded-circle" src="https://www.designyourway.net/blog/wp-content/uploads/2018/08/387011_3d-cute-wallpapers-for-desktop-hd-1-jpg_1024x768_h.jpg" alt="Generic placeholder image" width="140" height="140" />
                        <h2>Heading</h2>
                        <p><a class="btn btn-primary" href="/join" role="button">Chat Now!</a></p>
                    </div>
                    
                    <div class="col-lg-4">
                        <img class="rounded-circle" src="https://lh3.googleusercontent.com/proxy/py2pxjpMd871MBEkihIXpzdG7v0TuiL0Nav89REI-76hrdWGr8XF5PohMRCuPuUMHXzJw23CRPrmiysr-9uTpEa4hCn_yu-eXDT1MmYr3pHJB8jIaIpYa41HlyKBA_wko9P5a4dXeupCkq28KlQ" alt="Generic placeholder image" width="140" height="140" />
                        <h2>Heading</h2>
                        <p><a class="btn btn-primary" href="#" role="button">Chat Now!</a></p>
                    </div>
                    <div class="col-lg-4">
                        <img class="rounded-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140" />
                        <h2>Heading</h2>
                        <p><a class="btn btn-primary" href="#" role="button">Chat Now!</a></p>
                    </div>
                    <div class="col-lg-4">
                        <img class="rounded-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140" />
                        <h2>Heading</h2>
                        <p><a class="btn btn-primary" href="#" role="button">Chat Now!</a></p>
                    </div>
                    <div class="col-lg-4">
                        <img class="rounded-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140" />
                        <h2>Heading</h2>
                        <p><a class="btn btn-primary" href="#" role="button">Chat Now!</a></p>
                    </div>

                    
                </div>
            </div>
        </div>
    )
}

export default GroupChat
