<template>
	<div>
		<div class="jumbotron jumbotron-fluid">
			<div class="container-text">
				<div class="row">
					<h1 class="display-4">Welcome to the great Singapore jam!</h1>
					<h3>Discover local artists and connect with fellow music lovers</h3>
				</div>
				<div class="row mt-3">
					<a href="./music">
						<button type="button" class="btn text-dark btn-light">
							Fall in love with 🇸🇬 music
						</button>
					</a>
				</div>
				<div class="row"></div>
			</div>
		</div>

		<div class="container-fluid px-4">
			<div class="row gx-5 mt-4">
				<div class="learn col-md-12 text-align-centre">
					<h4>This week's featured artists</h4>
				</div>
				<div class="col-md-4 text-align-centre">
					<a href="./#/artist/3FodFdWfVWIiER6Cv6YVVQ">
						<div class="story-col bg-light text-dark">
							<img
								class="img1"
								src="https://i.scdn.co/image/ab6761610000e5ebaff746d063c48fa0dcb8fdf8"
								alt="Card image"
							/>
							<h4 class="mt-3">Charlie Lim</h4>
						</div>
					</a>
				</div>
				<div class="col-md-4 text-align-centre">
					<a href="./#/artist/5IIP34JBy1d8kBYlAGnRaW">
						<div class="story-col bg-light text-dark">
							<img
								class="img1"
								src="https://i.scdn.co/image/ab6761610000e5eb03ea148d3c0019738ea77bb4"
								alt="Card image"
							/>
							<h4 class="mt-3">Linying</h4>
						</div>
					</a>
				</div>
				<div class="col-md-4 text-align-centre">
					<a href="./#/artist/2HXfSr5CfTPZbcqS2gyGYm">
						<div class="story-col bg-light text-dark">
							<img
								class="img1"
								src="https://i.scdn.co/image/ab6761610000e5eb339ad9527609417a8c66bd88"
								alt="Card image"
							/>
							<h4 class="mt-3">Yung Raja</h4>
						</div>
					</a>
				</div>

				<div class="learn col-md-12 text-align-centre">
					<h4>Learn more about us</h4>
				</div>
				<div class="col-md-6">
					<div class="info-col bg-light text-dark">
						<h4>Our Story</h4>
						<p class="text-justify">
							We’re a collective of Singaporean artists passionate about local
							arts and music. With fellow musicians’ livelihoods being affected
							by the Coronavirus pandemic, we wanted to create a platform that
							actively promotes and empowers local artists. Join our community
							and connect with your fellow music lovers and creators.
						</p>
					</div>
				</div>
				<div class="col-md-6">
					<div class="info-col bg-success text-white">
						<h4>Our Mission</h4>
						<p class="text-justify">
							KayaJam interfaces with the entire cross section of Singapore's
							music industry and we see our role as builders of the ecosystem.
							From our work, we desire to see artists in Singapore flourishing,
							greater proliferation of ideas that enrich humanity, and more
							interest in local music.
						</p>
						<p></p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Home",
};
</script>

<style scoped lang="scss">
.container-text {
	text-align: center;
	vertical-align: middle;
	align-items: center;
	padding-left: 20px;
	padding-right: 20px;
	color: white;
}

.jumbotron {
	background-image: url(https://freight.cargo.site/t/original/i/3f1e5387264d1dd8f60951413c7df3675b74366163cb27386f48dc70ed664925/418A8597-S.jpg);
	background-size: 100% auto;
	background-position: center center;
	height: 300px;
	justify-content: center;
	display: flex;
	align-items: center;
	text-align: center;
	vertical-align: middle;
	align-items: center;
}
.learn {
	padding-left: 30px;
	padding-right: 30px;
	margin: 10px;
}
.story-col {
	min-height: 260px;
	border-radius: 10px;
	padding: 30px;
	margin: 10px;
	margin-bottom: 30px;
	box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
	transition: 0.3s transform cubic-bezier(0.155, 1.105, 0.295, 1.12),
		0.3s box-shadow,
		0.3s -webkit-transform cubic-bezier(0.155, 1.105, 0.295, 1.12);
}

.story-col:hover {
	transform: scale(1.05);
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
}

.info-col {
	min-height: 260px;
	border-radius: 10px;
	padding: 30px;
	margin: 10px;
	margin-bottom: 30px;
}

.btn {
	max-width: 400px;
	margin-left: auto;
	margin-right: auto;
	text-align: center;
	display: inline-block;
	border-radius: 50px;
	font-size: 20px;
}

.img1 {
	height: 100%;
	width: 100%;
	object-fit: contain;
	margin: auto;
	object-position: center;
	justify-content: center;
}
</style>
