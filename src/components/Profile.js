import React, { Component } from 'react'
import axios from 'axios'
const url =  process.env.REACT_APP_API_URL

export default class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: [],
      providers:[],
      type:'',
      selectedProviderID:'',
      selectedProviderFavorites:[],
      average:''
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
      const favs = favorites.data.filter(ele=>ele.user_id === user[0].id)
      this.setState({ user: [...user],
        selectedProviderFavorites:[...favs]
      })
    } catch (err) {
      console.log(err)
    }
    let days = Date.now()-new Date(this.state.user[0].soberdate).getTime();
    const total = Math.round(days/86400000) + " days";
    this.setState({
      soberDays:total,
      soberDate:this.state.user[0].soberdate
    })
  }

  getProvidersByType = async(type) =>{
     try {
      const found = await axios.get(`${url}/providers`)
      const filtered = await found.data.filter(ele => ele.typeID === type)
      this.setState({
        providers:filtered,
          type:type
      })
    }
    catch (err) {
      console.log(err)
     }
    }
    
getAverage = async(id) => {
await axios.get(`${url}/reviews/providers/${id}`)
      .then((result)=>{
      const ratings = result.data.map(ele=> {return ele.rating}).reduce((a,b)=>a+b,0)
      const average = ratings/result.data.length
      const fixedAverage= average.toFixed(2)
      this.setState({
        average:fixedAverage
      })
    }
  )
}

closeProviderWindow= () => {
this.setState({
  type:''
})
}

  render() {
    return (
  <div>
  </div>
  )
  }
}