import React from 'react'

function Footer() {
    const footerStyle={
            position: "fixed",
            left: 0,
            bottom: 0,
            width: "100%",
            paddingTop: "20px",
            backgroundColor: "grey",
            color: "white",
            textAlign:"center"
         
    }
    return (
        <div class="footer" style={footerStyle}>
            <h3>(c) 2020 MovieManiax</h3>
            <h4>Created by:  Akanksha Joanna Norma Sara</h4>
            <a class="btn btn-outline-light btn-social text-center rounded-circle" href="https://github.com/jsanthos01/MovieManiax">
                 <i class="fab fa-github"></i>
            </a>
            </div>
    )
}

export default Footer;

