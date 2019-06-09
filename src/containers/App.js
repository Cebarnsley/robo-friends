import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { setSearchField, requestRobots } from '../actions';

import Auth from '@aws-amplify/auth';
import Analytics from '@aws-amplify/analytics';

import awsconfig from '../aws-exports';


import MainPage from '../components/MainPage';

import './App.css';

// retrieve temporary AWS credentials and sign requests
Auth.configure(awsconfig);
// send analytics events to Amazon Pinpoint
Analytics.configure(awsconfig);




const mapStateToProps = state => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
	onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
	onRequestRobots: () => dispatch(requestRobots())
	}
}

class App extends Component  {

	constructor(props) {
		super(props);
		this.handleAnalyticsClick = this.handleAnalyticsClick.bind(this);
		this.state = {
		  analyticsEventSent: false,
		  resultHtml: "",
		  eventsSent: 0
		};
	  }
	
	  handleAnalyticsClick() {
		const { aws_project_region, aws_mobile_analytics_app_id } = awsconfig;
	
		  Analytics.record('AWS Amplify Tutorial Event')
			.then( (evt) => {
				const url = `https://${aws_project_region}.console.aws.amazon.com/pinpoint/home/?region=${aws_project_region}#/apps/${aws_mobile_analytics_app_id}/analytics/events`;
				let result = (<div>
				  <p>Event Submitted.</p>
				  <p>Events sent: {this.state.eventsSent + 1}</p>
				  <a href={url} target="_blank" rel="noopener noreferrer">View Events on the Amazon Pinpoint Console</a>
				</div>);
	
				this.setState({
					analyticsEventSent: true,
					resultHtml: result,
					eventsSent: this.state.eventsSent + 1
				});
			});
	  }

	render () {
		 return <MainPage {...this.props} />
		}
}

export default connect( mapStateToProps, mapDispatchToProps)(App);