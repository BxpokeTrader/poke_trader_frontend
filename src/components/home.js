import React from 'react';

class Home extends React.Component {
	
	constructor(props){
		super(props);
		
		this.state = {val: "awesome"};
	}
	
	
	changeValue = () => {
        if(this.state.val === "awesome"){
            this.setState(
                {val: "wonderful"}
                );
        }else{
            this.setState(
                {val: "awesome"}
                );
            }
        }
		
	
	render(){
		return(
			<div>
				<h1>Hello {this.state.val} World</h1>
				<button type="button" onClick={this.changeValue}>Change value</button>
			</div>
		);
	}
}


export default Home;