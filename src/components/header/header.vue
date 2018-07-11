<template>
	<div class="header">
		<ul class="nav bigsreennav">
			<li class="text-logo">
				<img src="../../../static/img/logo.png"/>
				<span>中电科区块链</span>
			</li>
			<li>
				<router-link to="/index">
					<span>首页</span>
				</router-link>					
			</li>
			<li>
				<router-link to="/network">
					<span>网络状态</span>
				</router-link>
			</li>
			<li>
				<router-link to="/blocks">
					<span>区块</span>
				</router-link>
			</li>
			<li>
				<router-link to="/transations">
					<span>交易</span>
				</router-link>
			</li>
			<li>
				<router-link to="/chaincodes">
					<span>链码</span>
				</router-link>
			</li>
			<li>
				<router-link to="/channels">
					<span>通道</span>
				</router-link>
			</li>
			<li class="nav-right-item set">
				<a>
					<span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
				</a>

			</li>
			<li class="nav-right-item message-li">
				<a>
					<span class="glyphicon glyphicon-user" aria-hidden="true"></span>
				</a>
				<span class="message-tips">1</span>
			</li>
			<li class="nav-right-item">
				<input type="search" placeholder="block, hash, transaction, etc..." class="search-bar" />
			</li>

		</ul>
		<ul class="nav smallsreennav">
			<li class="text-logo">
				<img src="../../../static/img/logo.png"/>
				<span>中电科区块链</span>
			</li>
			<li>
				<router-link to="/index">
					<span>首页</span>
				</router-link>
			</li>
			<li>
				<router-link to="/network">
					<span>网络状态</span>
				</router-link>
			</li>
			<li class="more">
				<a>
					<span>更多</span>
				</a>

				<ul class="more-nav">
					<li>
						<router-link to="/blocks">
							<span>区块</span>
						</router-link>
					</li>
					<li>
						<router-link to="/transations">
							<span>交易</span>
						</router-link>
					</li>
					<li>
						<router-link to="/chaincodes">
							<span>链码</span>
						</router-link>
					</li>
					<li>
						<router-link to="/channels">
							<span>通道</span>
						</router-link>
					</li>
				</ul>
			</li>

			<li class="nav-right-item set">
				<a>
					<span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
				</a>

			</li>
			<li class="nav-right-item message-li">
				<a>
					<span class="glyphicon glyphicon-user" aria-hidden="true"></span>
				</a>
				<span class="message-tips">1</span>
			</li>
			<li class="nav-right-item">
				<input type="search" placeholder="block, hash, transaction, etc..." class="search-bar" />
			</li>
		</ul>
	</div>
</template>

<script>
</script>

<style>
	.router-link-exact-active{
		background: #145886;
	}
	@media screen and (max-width: 1600px) { 

		.router-link-exact-active{
			background: #0BA1D6;
		}
	
	} 
	.text-logo{
		height: 90px;
		color: white;
		font-weight: bold;
	}
	.text-logo img{
		width: 50px;
		display: block;
		margin: 8px auto 5px;
	}
</style>