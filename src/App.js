import React from 'react';
import './App.css';
import Menu from './components/menu';
import { PLACES } from './shared/trades';
import LeftSide from './components/leftSideComponent'
import RightSide from './components/rightSideComponent'

class App extends React.Component {					
  
	constructor(props){
		super(props);
		
		this.state = {
			places: PLACES
		};
	}
	
	render(){
		return (
			<div className='App'>
        <Menu/>
				<h1>Verify your trade!</h1>
        {/* <Home/> */}
        <div className='trade-input'>
          <LeftSide className='left-side'/>
          <RightSide className='right-side'/>
        </div>
				
			</div>
		);
	}
}

export default App;