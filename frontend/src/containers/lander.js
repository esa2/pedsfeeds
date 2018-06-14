import React from 'react'
import { Image } from 'react-bootstrap'

const Welcome = function() {
  return (
    <div>
      <div className="flex-box">
        <Image
          src="https://s3-us-west-2.amazonaws.com/pedsfeeds/images/mainintro.png"
          alt="home page image"
          responsive
        />
      </div>
      <h1 className="header-green-center">
        Resources, support, experts for pediatric feeding and swallowing
      </h1>
      <p>
        At the Pediatric Feeding Association, our mission is to provide help for
        babies, children, and adolescents who struggle with feeding and
        swallowing, whether they eat orally or are tube fed via NG tubes,
        g-tubes, and gj-tubes.
      </p>
      <p>
        We aim to create a connected community of families and pediatric feeding
        professionals, comprising doctors, feeding therapists, nutritionists,
        speech therapists, psychologists, and other specialists who evaluate and
        treat dysphagia and feeding disorders, including reflux, oral aversion,
        and aspiration.
      </p>
      <p>
        Here you'll find a directory of feeding providers, along with other
        resources and information to support your journey to safe and happy
        feeding experiences for kids who can't or won't eat and drink enough to
        thrive on their own.
      </p>
    </div>
  )
}
export default Welcome
