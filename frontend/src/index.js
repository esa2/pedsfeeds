import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './app'
import registerServiceWorker from './registerServiceWorker'
import Amplify from 'aws-amplify'
import amplifyConfig from './amplify-config'
import './styles/index.css'

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: amplifyConfig.cognito.REGION,
    userPoolId: amplifyConfig.cognito.USER_POOL_ID,
    identityPoolId: amplifyConfig.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: amplifyConfig.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: amplifyConfig.s3.REGION,
    bucket: amplifyConfig.s3.BUCKET,
    identityPoolId: amplifyConfig.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: "peds",
        endpoint: amplifyConfig.apiGateway.URL,
        region: amplifyConfig.apiGateway.REGION
      },
    ]
  }
})

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
)
registerServiceWorker()
