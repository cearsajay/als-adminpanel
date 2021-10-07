import React from 'react';
// import Routes from '../../routes/Index';
import { Route } from 'react-router';
import Main from './Main';
const MainContent = ({ component: Component, ...rest }) => {
	
    useEffect(() => {
		console.log("hi");
    }, []);


	useEffect(() => {
		console.log("hi");

		const timeoutID = window.setTimeout(() => {
			console.log("hi");
		}, 10);
	
	}, []);
	return (
		<>
			<div id="content" class="app-content">
				<h1 class="page-header mb-3">
					Hi, Sean. <small>here's what's happening with your store today.</small>
				</h1>
				<Route {...rest} render={props => (
					<Main>
						<Component {...props} />
					</Main>
				)} />
			</div>
		</>
	)

}
export default MainContent;