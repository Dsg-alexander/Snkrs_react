import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <Link to="/">
        <h1 className="tituloBienvenida">
          Bienvenido a Sneakers
        </h1>
      </Link>

      <h2 className="titulo">
        Compra tus Sneakers
      </h2>

      <br /><br />

      <div className="titulo marca-logo">
        <Link to="/jordan">
          <img 
            src="https://static.vecteezy.com/system/resources/thumbnails/027/127/562/small_2x/jordan-logo-jordan-icon-transparent-free-png.png"
            width="85"
            height="85"
            alt="Jordan"
          />
        </Link>
      </div>

      <br /><br /><br /><br />

      <div className="titulo marca-logo">
        <Link to="/mk">
          <img 
            src="https://images.seeklogo.com/logo-png/53/2/michael-kors-logo-png_seeklogo-536976.png"
            width="85"
            height="85"
            alt="Michael Kors"
          />
        </Link>
      </div>

      <br /><br /><br />

      <div className="titulo marca-logo">
        <Link to="/karl">
          <img 
            src="https://www.freelogovectors.net/wp-content/uploads/2023/07/karl-lagerfeld-logo-freelogovectors.net_.png"
            width="85"
            height="85"
            alt="Karl Lagerfeld"
          />
        </Link>
      </div>
    </div>
  )
}

export default Home
