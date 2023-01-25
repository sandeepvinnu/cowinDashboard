// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'

import VaccinationByGender from '../VaccinationByGender'

import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    sevenDaysVaccination: [],
    byAge: [],
    byGender: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = {
        last7DaysVaccination: data.last_7_days_vaccination,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }
      const {last7DaysVaccination} = fetchedData
      const {vaccinationByAge} = fetchedData
      const {vaccinationByGender} = fetchedData
      const objectOne = last7DaysVaccination.map(e => ({
        dose1: e.dose_1,
        dose2: e.dose_2,
        vaccineDate: e.vaccine_date,
      }))
      console.log(fetchedData)
      this.setState({sevenDaysVaccination: objectOne})
      this.setState({byAge: vaccinationByAge})
      this.setState({byGender: vaccinationByGender})
      this.setState({apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderSuccessView = () => {
    const {sevenDaysVaccination, byAge, byGender} = this.state
    return (
      <>
        <VaccinationCoverage item={sevenDaysVaccination} />
        <VaccinationByGender item1={byGender} />
        <VaccinationByAge item2={byAge} />
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-head">Something Went Wrong</h1>
    </div>
  )

  allMethods = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.progress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <div className="card-1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="img-1"
          />
          <h1 className="head-1">Co-WIN</h1>
        </div>
        <h1 className="head-2">CoWIN Vaccination in India</h1>
        {this.allMethods()}
      </div>
    )
  }
}

export default CowinDashboard
