import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'


class Header extends Component {

	render(){

		return (
			<header>
				<div className="navElements">
					<nav id="ganderNav" className="">
						<Link to="" className="navLink"> </Link>
						<Link to="" className="navLink"> </Link>
					</nav>
				</div>
			</header>
		)
	}
}


export default connect (
	state=>state,
	null,
	null,
	{pure:false}
)(Header)
