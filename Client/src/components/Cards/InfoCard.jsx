import React from 'react'

import { Card, CardContent, Typography } from '@material-ui/core'


class InfoCard extends React.Component {
  render() {
    let reaction = ""
    let mpg = this.props.mpg
    let description = "This is a"
    let suggestion = ""

    if (mpg < 10) {
      reaction = "🤬 Yikes!"
      description += " terrible mileage!"
      suggestion = "🏭 This car contributes significantly to climate change. Please switch to a better car."
    } else if (mpg >= 10 && mpg < 20) {
      reaction = "😠 Ouch!"
      description += " bad mileage!"
      suggestion = "⛽ This car has horrible fuel economy, and contributes significantly to climate change! Switch to a better car if you can!"
    } else if (mpg >= 20 && mpg < 30) {
      reaction = "😐 Meh."
      description += " decent mileage."
      suggestion = "🏁 You can definitely do better! Switch to a more fuel-efficient car if you can! This car is not good for the environment."
    } else if (mpg >= 30 && mpg < 40) {
      reaction = "🙂 Alright!"
      description += " good mileage."
      suggestion = "🌴 This car has a decent mileage! It can definitely be improved on, but it's fine as it is."
    } else if (mpg >= 40 && mpg < 60) {
      reaction = "😄 Let's Go!"
      description += " great mileage!"
      suggestion = "🌲 The forests thank anyone who drives this car! Thank you for helping stop climate change."
    } else if (mpg >= 60 && mpg < 80) {
      reaction = "🔥 Nice!!"
      description += "n awesome mileage!"
      suggestion = "🌳 Let's go! Your car is excellent for the environment. The forests thank you for your service!"
    } else {
      reaction = "🙏 WOOOO!"
      description += " godly mileage!"
      suggestion = "🌎 The world thanks you for your service! Thanks for slowing climate change!"
    }

    return (
      <Card style={{marginBottom: 15, maxWidth:375, marginLeft:15, marginRight:15}}>
        <CardContent>
          <Typography variant="h4" style={{marginBottom:5}}>
            <b>{reaction}</b>
          </Typography>

          <Typography variant="body1" component="div">
            The car you selected gets <b>{this.props.mpg} mpg</b>
            <br/>
            {description}
            <br/>
            <br/>
            {suggestion}
          </Typography>
        </CardContent>
      </Card>
    )
  }
}

export default InfoCard