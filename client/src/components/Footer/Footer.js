import React from 'react'

function Footer() {
    const footerStyle={
        position: "relative",
        left: 0,
        bottom: 0,
        width: "100%",
        color: "rgb(158, 158, 158)",
        textAlign:"center"
    }
    return (
        <div class="footer mt-5" style={footerStyle}>
            <p>(c) 2020 MovieManiax</p>
            <p>Created by:  Akanksha Joanna Norma Sara</p>

        </div>
    )
}

export default Footer;

