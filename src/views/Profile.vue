<template>
	<div class="profile-page">
		<div class="page-header"></div>
		<div class="main main-raised">
			<div class="profile-content">
				<div class="container">
					<div class="col-xl-l-md-s-xs-6 ml-auto mr-auto">
						<div class="profile">
							<div class="avatar">
								<img src="https://www.kindpng.com/picc/m/22-223941_transparent-avatar-png-male-avatar-icon-transparent-png.png"/>
							</div>

							<Star :star="starValue" :maxstars="1" starsize="M" />

							<div class="name">
								<h3 class="title">John123</h3>
								<h6>Singapore</h6>
							</div>

							<div class="description text-center border	border-color:#1DB954 rounded">
								<p>Hi, I'm John. I like music</p>
							</div>

							<div class="socialbuttons">
								<ButtonSocial network="facebook"></ButtonSocial>
								<ButtonSocial network="twitter"></ButtonSocial>
								<ButtonSocial network="telegram"></ButtonSocial>
							</div>
						</div>
					</div>

					<div class="col-xl-l-md-s-xs-6 ml-auto mr-auto">
						<div class="profile-tabs">
							<ul class="nav nav-pills nav-pills-icons justify-content-center">
								<li class="nav-item">
									<a class="nav-link active" role="tab" data-toggle="tab">
										<i class="bi bi-person-video2"></i>
										Artists
									</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" role="tab" data-toggle="tab">
										<i class="bi bi-book-fill"></i>
										Albums
									</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" role="tab" data-toggle="tab">
										<i class="bi bi-file-earmark-music-fill"></i>
										Songs
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-3 ml-auto">
					<img
						src="https://images.unsplash.com/photo-1524498250077-390f9e378fc0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=83079913579babb9d2c94a5941b2e69d&auto=format&fit=crop&w=751&q=80"
						class="rounded"
					/>
					<img
						src="https://images.unsplash.com/photo-1528249227670-9ba48616014f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=66b8e7db17b83084f16fdeadfc93b95b&auto=format&fit=crop&w=357&q=80"
						class="rounded"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ButtonSocial from "@/components/BtnSocial.vue";
import Star from "@/components/Star.vue";
export default {
	name: "About",
	components: {
		ButtonSocial,
		Star,
	},
};
</script>

<style scoped lang="scss">
.h6,
h6 {
	font-size: 0.75rem !important;
	font-weight: 700;
	line-height: 1.5em;
	text-transform: uppercase;
}

.name h6 {
	margin-top: 10px;
	margin-bottom: 10px;
	font-weight: 700;
}

a .material-icons {
	vertical-align: middle;
}

.fixed-top {
	position: fixed;
	z-index: 1030;
	left: 0;
	right: 0;
}

.profile-page {
	height: 50px;
	background-position: center;
	background-color: white;
}

.page-header {
	height: 30vh;
	background-size: cover;
	background-color: var(--color-default); /*2a313a*/
	margin: 0;
	padding: 0;
	border: 0;
	display: flex;
	align-items: center;
}

.main-raised {
	margin: -60px 30px 0;
	border-radius: 6px;
	box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
}

.main {
	background: var(--color-supporting); /*3C4858*/
	position: relative;
	z-index: 3;
}

.profile-page .profile {
	text-align: center;
}

.profile-page .profile img {
	max-width: 160px;
	width: 100%;
	margin: 0 auto;
	-webkit-transform: translate3d(0, -50%, 0);
	-moz-transform: translate3d(0, -50%, 0);
	-o-transform: translate3d(0, -50%, 0);
	-ms-transform: translate3d(0, -50%, 0);
	transform: translate3d(0, -50%, 0);
}

.img-raised {
	box-shadow: 0 5px 15px -8px rgba(0, 0, 0, 0.24),
		0 8px 10px -5px rgba(0, 0, 0, 0.2);
}

.rounded-circle {
	border-radius: 50% !important;
}

.img-fluid,
.img-thumbnail {
	max-width: 100%;
	height: auto;
}

.title {
	margin-top: 25px;
	margin-bottom: 20px;
	min-height: 32px;
	font-weight: 700;
}

.profile-page .description {
	margin: auto;
	max-width: 600px;
	font-weight: 300;
}

p {
	font-size: 14px;
	margin-top: 15px;
	margin-bottom: 15px;
}

.profile-page .profile-tabs {
	margin-top: 4.284rem;
	align-content: center;
}

.socialbuttons {
	margin: 10px;
}

.nav-pills,
.nav-tabs {
	border: 0;
	border-radius: 3px;
	padding: 0 15px;
}

.nav .nav-item {
	position: relative;
	margin: 0 2px;
	align-content: center;
}

.nav-pills.nav-pills-icons .nav-item .nav-link {
	border-radius: 4px;
}

.nav-pills .nav-item .nav-link.active {
	color: #fff;
	background-color: #1db954;
	box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.2),
		0 13px 24px -11px rgba(156, 39, 176, 0.6);
}

.nav-pills .nav-item .nav-link {
	line-height: 24px;
	font-size: 12px;
	font-weight: 500;
	min-width: 100px;
	color: #fff;
	transition: all 0.3s;
	border-radius: 30px;
	padding: 10px 15px;
	text-align: center;
}

.nav-pills .nav-item .nav-link:not(.active):hover {
	background-color: rgba(200, 200, 200, 0.2);
}

.nav-pills .nav-item i {
	display: block;
	font-size: 30px;
	padding: 15px 0;
}

.tab-space {
	padding: 20px 0 50px;
}

.profile-page .gallery {
	margin-top: 3.213rem;
	padding-bottom: 50px;
}

.profile-page .gallery img {
	width: 100%;
	margin-bottom: 2.142rem;
}

.profile-page .profile .name {
	margin-top: -80px;
}

img.rounded {
	border-radius: 6px !important;
}

.tab-content > .active {
	display: block;
}
</style>
