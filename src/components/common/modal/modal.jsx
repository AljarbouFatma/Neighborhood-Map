import React from 'react'
import onClickOutside from 'react-onclickoutside'
import {withRouter} from 'react-router-dom'

class _Modal extends React.Component {
	render(){
		return(
			<div className="modal" >
				<ModalContent {...this.props}>
					{this.props.children}
				</ModalContent>
			</div>
		)
	}
}

class _ModalContent extends React.Component {
	handleClickOutside(evt){
		const {noexit,history} = this.props
		if(!noexit){
			if(evt.target.className==="modal") history.goBack()
		}
  }
	render(){
		const {fixed} = this.props
		const {noexit,flex} = this.props
		const {med,sml} = this.props
		const {children,history} = this.props
		const style={
			display:flex ? "flex" : "",
			justifyContent:flex ? "center" : "",
			alignItems:flex ? "center" : ""
		}
		const modalContentClass = "modal-content " + (med ? "med ":"") + (sml ? "sml " : "") + (fixed ? "fixed " : "")
		return (
			<div className={modalContentClass} style={style} onKeyDown={e=>e.keyCode===27 && history.goBack() }>
				{!noexit &&
					<span onClick={()=>history.goBack() } className="close">&times;</span>
				}
				{children}
			</div>
		)
	}
}


const ModalContent = onClickOutside(_ModalContent);
const Modal = withRouter(_Modal)


export default Modal

// export default onClickOutside(Modal)
