document.body.innerHTML =
`<header>

<div id="header">

    <div id="logo">
        <img src="" alt="Logo Samspiseriet">
    </div>

    <div id="nav_bar">
        <ul id="nav">
            <li class="nav_element"><a href="index.html">Hjem</a></li>
            <li class="nav_element"><a href="meny.html">Meny</a></li>
            <li class="nav_element"><a href="om_oss.html">Om oss</a></li>
            <li class="nav_element"><a href="kontakt.html">Kontakt</a></li>
        </ul>
    </div>

</div>

</header>` +document.body.innerHTML


const nav = document.querySelectorAll('li.nav_element a')

function active(page) {
    nav[page].style.color = 'white'
    nav[page].style.backgroundColor = '#ff7800'
}

const index = document.getElementById('index_js')
const meny = document.getElementById('meny_js')
const kontakt = document.getElementById('kontakt_js')
const om_oss = document.getElementById('om_oss_js')

if (document.contains(index)) {
    active(0)
} else if (document.contains(meny)) {
    active(1)
} else if (document.contains(om_oss)) {
    active(2)
} else if (document.contains(kontakt)) {
    active(3)
}

document.querySelector(wrapperSelector).style.marginTop = document.getElementById("header").clientHeight + "px"