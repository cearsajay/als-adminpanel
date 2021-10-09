import React from 'react';
import { Route } from 'react-router';
import Main from './Main';
const MainContent = ({ component: Component, ...rest }) => {


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