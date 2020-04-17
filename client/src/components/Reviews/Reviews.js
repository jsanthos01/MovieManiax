import React from 'react'
import negative from './assets/negative2.png'
import positive from './assets/positive.png'
import picture from './assets/positive.png'
function Reviews() {
    return ( 
        <div class="container">
            [Review Page!!!]
            <table class="table">
                <thead class="thead-light">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Review</th>
                    <th scope="col">Writer </th>
                    </tr>
                </thead>
                <tbody  style={{color: "white"}}>
                    <tr>
                        <th scope="row">1</th>
                        <td> <img src={picture} />6.8</td>
                        <td>"'Guns Akimbo' is a techno-punk audiovisual work. A forced view to ask us what kind of representations, in our neoliberal context, we want and which we try to avoid. [Full review in Spanish]"
                            <hr />
                            <p>Posted Apr 17, 2020 12:13 AM UTC</p>
                        </td>
                        <td>Dennis Tom</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td> <img src={picture} />6.8</td>
                        <td>"'Guns Akimbo' is a techno-punk audiovisual work. A forced view to ask us what kind of representations, in our neoliberal context, we want and which we try to avoid. [Full review in Spanish]"
                            <hr />
                            <p>Posted Apr 17, 2020 12:13 AM UTC</p>
                        </td>
                        <td>Dennis Tom</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td> <img src={picture} />6.8</td>
                        <td>"'Guns Akimbo' is a techno-punk audiovisual work. A forced view to ask us what kind of representations, in our neoliberal context, we want and which we try to avoid. [Full review in Spanish]"
                            <hr />
                            <p>Posted Apr 17, 2020 12:13 AM UTC</p>
                        </td>
                        <td>Dennis Tom</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td> <img src={picture} />6.8</td>
                        <td>"'Guns Akimbo' is a techno-punk audiovisual work. A forced view to ask us what kind of representations, in our neoliberal context, we want and which we try to avoid. [Full review in Spanish]"
                            <hr />
                            <p>Posted Apr 17, 2020 12:13 AM UTC</p>
                        </td>
                        <td>Dennis Tom</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td>6.8</td>
                        <td>"'Guns Akimbo' is a techno-punk audiovisual work. A forced view to ask us what kind of representations, in our neoliberal context, we want and which we try to avoid. [Full review in Spanish]"
                            <hr />
                            <p>Posted Apr 17, 2020 12:13 AM UTC</p>
                        </td>
                        <td>Dennis Tom</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default Reviews
