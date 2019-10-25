import React, {
  Component
} from 'react'
import axios from 'axios'
const url = process.env.REACT_APP_API_URL

export default class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: [],
      providers: [],
      type: '',
      selectedProviderID: '',
      selectedProviderFavorites: [],
      average: ''
    }

  }

  componentDidMount() {
    this.getAccount();
  }

  getAccount = async () => {
    try {
      const response = await axios.get(`${url}/users`)
      const user = await response.data.filter(user => user.username === this.props.match.params.username)
      const favorites = await axios.get(`${url}/favorites/${user[0].id}/`)
      const favs = favorites.data.filter(ele => ele.user_id === user[0].id)
      this.setState({
        user: [...user],
        selectedProviderFavorites: [...favs]
      })
    } catch (err) {
      console.log(err)
    }
  }

  closeProviderWindow = () => {
    this.setState({
      type: ''
    })
  }

  render() {
    return ( 
    <div>
      <div class="profileContainer">
      <div class="profileNameContainer"></div>
      <div class="profilePicContainer"><img class="profilePic" alt="headshot pic" src="https://tobypeterson.surge.sh/Toby_Peterson.png"/></div>
      <div class="profileCoursesContainer"></div>
      <div class="profileReviewsContainer"></div>
      </div>
      </div>
    )
  }
}