<template> 
   <div >
       <nav class="navbar">
            <span class="navbar-toggle" id="js-navbar-toggle">
                    <i class="fas fa-bars"></i>
                </span>
           <router-link class="logo" to="/"> Wolfpack </router-link>
            <ul class="main-nav" id="js-menu">
                <li>
                     <router-link class="nav-links" to="/"> Wolves </router-link>
                </li>
                <li>
                    <router-link class="nav-links" to="/packs"> Packs </router-link>
                </li>
                <li>
                   <router-link class="nav-links" to="/mapview"> Packs Location </router-link>
                </li>
            
            </ul>
        </nav>
  </div>
</template>

<script>

// simple navbar component
export default {
    name: "Navbar",
    mounted(){
        let mainNav = document.getElementById("js-menu");
        let navBarToggle = document.getElementById("js-navbar-toggle");

        navBarToggle.addEventListener("click", function() {
            mainNav.classList.toggle("active");
        });
    }
}
</script>

<style>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  font-family: "Josefin Sans", sans-serif;
}

.navbar {
  font-size: 18px;
  background-image: linear-gradient(260deg, #000000 0%, #2f2a30 100%);
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 10px;
}

.main-nav {
  list-style-type: none;
  display: none;
}

.nav-links,
.logo {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.7);
}

.main-nav li {
  text-align: center;
  margin: 15px auto;
}

.logo {
  display: inline-block;
  font-size: 22px;
  margin-top: 10px;
  margin-left: 20px;
}

.navbar-toggle {
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  font-size: 24px;
}

.active {
  display: block;
}

@media screen and (min-width: 768px) {
  .navbar {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0;
    height: 70px;
    align-items: center;
  }

  .main-nav {
    display: flex;
    margin-right: 30px;
    flex-direction: row;
    justify-content: flex-end;
  }

  .main-nav li {
    margin: 0;
  }

  .nav-links {
    margin-left: 40px;
  }

  .logo {
    margin-top: 0;
  }

  .navbar-toggle {
    display: none;
  }

  .logo:hover,
  .nav-links:hover {
    color: rgba(255, 255, 255, 1);
  }
}
</style>