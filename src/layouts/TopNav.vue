<template>
  <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
    <!-- Navbar Brand-->
    <a class="navbar-brand ps-3" href="#">Spotify Webapp</a>
    <!-- Sidebar Toggle-->
    <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle">
      <i class="bi bi-list"></i>
    </button>
    <!-- Navbar Search-->
    <form class="
      d-none d-md-inline-block
      form-inline
      ms-auto
      me-0 me-md-3
      my-2 my-md-0
    ">
      <div class="input-group">
        <input class="form-control" type="text" placeholder="Search"
          aria-label="Search" aria-describedby="btnNavbarSearch"
        />
        <button class="btn bg-brand text-white" id="btnNavbarSearch" type="button">
          <i class="bi bi-search"></i>
        </button>
      </div>
    </form>
    <!-- Navbar-->
    <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        ><i class="bi bi-person-fill fa-fw"></i>
        </a>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
          <!-- customise here -->
          <li><a class="dropdown-item">Profile</a></li>
          <li><a class="dropdown-item">Settings</a></li>
          <li><hr class="dropdown-divider" /></li>
          <li><a class="dropdown-item">Logout</a></li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'TopNav'
}
</script>

<style scoped lang="scss">
.dropdown-item {
  &:hover {
    cursor: pointer;
  }

  &.active, &:active {
    background-color: map-get($colors, brand);
  }
}
</style>
