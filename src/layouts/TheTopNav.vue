<template>
  <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
    <!-- Navbar Brand-->
    <router-link class="navbar-brand ps-3" to="/">Spotify Webapp</router-link>
    <!-- Sidebar Toggle-->
    <button class="btn btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle">
      <i class="bi bi-list"/>
    </button>
    <!-- Navbar Search-->
    <div class="
      d-none d-md-inline-block
      form-inline
      ms-auto
      me-0 me-md-3
      my-2 my-md-0
    ">
      <!-- <form>
        <div class="input-group">
          <input class="form-control" type="text" placeholder="Search"
            aria-label="Search" aria-describedby="btnNavbarSearch"
          />
          <button class="btn bg_brand text-white" id="btnNavbarSearch" type="button">
            <i class="bi bi-search"/>
          </button>
        </div>
      </form> -->
    </div>
    <!-- Navbar-->
    <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
      <li class="nav-item dropdown" v-if="$route.name != 'Login'">
        <a class="nav-link dropdown-toggle"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        ><i class="bi bi-person-fill fa-fw"/>
        </a>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
          <!-- customise here -->
          <TopNavDropdownItem route="/account/profile">Profile</TopNavDropdownItem>
          <TopNavDropdownItem route="/account/settings">Settings</TopNavDropdownItem>
          <li><hr class="dropdown-divider"/></li>
          <TopNavDropdownItem route="/login">Logout</TopNavDropdownItem>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
import TopNavDropdownItem from './TopNavDropdownItem.vue'

export default {
  name: 'TheTopNav',
  components: {
    TopNavDropdownItem
  }
}
</script>
