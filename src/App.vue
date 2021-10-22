<template>
  <div id="app">
    <!-- adapted from: https://startbootstrap.com/template/sb-admin -->
    <div class="sb-nav-fixed">
      <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <!-- Navbar Brand-->
        <a class="navbar-brand ps-3" href="#">
          <!-- <img src="./assets/logo.png"/> -->
          Spotify Webapp
        </a>
        <!-- Sidebar Toggle-->
        <button
          class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
        >
          <i class="bi bi-list"></i>
        </button>
        <!-- Navbar Search-->
        <form
          class="
            d-none d-md-inline-block
            form-inline
            ms-auto
            me-0 me-md-3
            my-2 my-md-0
          "
        >
          <div class="input-group">
            <input
              class="form-control"
              type="text"
              placeholder="Search for..."
              aria-label="Search for..."
              aria-describedby="btnNavbarSearch"
            />
            <button class="btn bg-brand text-white" id="btnNavbarSearch" type="button">
              <i class="bi bi-search"></i>
            </button>
          </div>
        </form>
        <!-- Navbar-->
        <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              ><i class="bi bi-person-fill fa-fw"></i
            ></a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li><a class="dropdown-item">Profile</a></li>
              <li><a class="dropdown-item">Settings</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item">Logout</a></li>
            </ul>
          </li>
        </ul>
      </nav>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            class="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div class="sb-sidenav-menu">
              <div class="nav" id="sidebarNav">
                <div class="sb-sidenav-menu-heading">Core</div>
                <router-link to="/" class="nav-link">
                  <div class="sb-nav-link-icon">
                    <i class="bi bi-house-door-fill"></i>
                  </div>
                  Home
                </router-link>
                <router-link to="/about" class="nav-link">
                  <div class="sb-nav-link-icon">
                    <i class="bi bi-question-circle-fill"></i>
                  </div>
                  About
                </router-link>
                <div class="sb-sidenav-menu-heading">Discover</div>
                <a
                  class="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseLayouts"
                  aria-expanded="false"
                  aria-controls="collapseLayouts"
                >
                  <div class="sb-nav-link-icon">
                    <i class="bi bi-people-fill"></i>
                  </div>
                  Users
                  <div class="sb-sidenav-collapse-arrow">
                    <i class="bi bi-caret-down-fill"></i>
                  </div>
                </a>
                <div
                  class="collapse"
                  id="collapseLayouts"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav class="sb-sidenav-menu-nested nav">
                    <a class="nav-link">Placeholder</a>
                    <a class="nav-link">Placeholder</a>
                  </nav>
                </div>
                <a
                  class="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsePages"
                  aria-expanded="false"
                  aria-controls="collapsePages"
                >
                  <div class="sb-nav-link-icon">
                    <i class="bi bi-book-fill"></i>
                  </div>
                  Albums
                  <div class="sb-sidenav-collapse-arrow">
                    <i class="bi bi-caret-down-fill"></i>
                  </div>
                </a>
                <div
                  class="collapse"
                  id="collapsePages"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav class="sb-sidenav-menu-nested nav">
                    <a class="nav-link">Placeholder</a>
                    <a class="nav-link">Placeholder</a>
                  </nav>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div id="layoutSidenav_content">
          <main>
            <router-view class="p-4" />
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#sidebarNav {
  a {
    color: inherit;

    &:hover {
      color: map-get($colors, text);
    }

    &.router-link-exact-active {
      color: map-get($colors, brand);
    }
  }
}
</style>
