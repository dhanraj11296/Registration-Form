// Write your JS code here
import {Component} from 'react'
import './index.css'
class RegistrationForm extends Component {
  state = {
    firstNameInput: '',
    lastNameInput: '',
    showFirstNameError: false,
    showLastNameError: false,
    isFormSubmitted: false,
  }
  onBlurLastName = () => {
    const isValidLastName = this.validateLastName()
    this.setState({showLastNameError: !isValidLastName})
  }
  onChangeLastName = event => {
    const {target} = event
    const {value} = target
    this.setState({
      lastNameInput: value,
    })
  }
  renderLastNameField = () => {
    const {lastNameInput, showLastNameError} = this.state
    const className = showLastNameError
      ? 'nameInputFieldErrorField'
      : 'nameInputField'
    return (
      <div className="inputContainer">
        <label className="inputLabel" htmlFor="lastName">
          LAST NAME
        </label>
        <input
          type="text"
          id="lastName"
          className={className}
          value={lastNameInput}
          placeholder="Last name"
          onChange={this.onChangeLastName}
          onBlur={this.onBlurLastName}
        />
      </div>
    )
  }
  onBlurFirstName = () => {
    const isValidFirstName = this.isValidFirstName()
    this.setState({showFirstNameError: !isValidFirstName})
  }
  onChangeFirstName = event => {
    const {target} = event
    const {value} = target
    this.setState({
      firstNameInput: value,
    })
  }
  renderFirstNameField = () => {
    const {firstNameInput, showFirstNameError} = this.state
    const className = showFirstNameError
      ? 'nameInputField errorField'
      : 'nameInputField'
    return (
      <div className="inputContainer">
        <label className="inputLabel" htmlFor="firstName">
          FIRST NAME
        </label>
        <input
          type="text"
          id="firstName"
          className={className}
          value={firstNameInput}
          placeholder="First Name"
          onChange={this.onChangeFirstName}
          onBlur={this.onBlurFirstName}
        />
      </div>
    )
  }

  validateLastName = () => {
    const {lastNameInput} = this.state
    return lastNameInput !== ''
  }
  isValidFirstName = () => {
    const {firstNameInput} = this.state
    return firstNameInput !== ''
  }
  onSubmitForm = event => {
    event.preventDefault()
    const isValidFirstName = this.isValidFirstName()
    const isValidLastName = this.validateLastName()
    if (isValidFirstName && isValidLastName) {
      this.setState({isFormSubmitted: true})
    } else {
      this.setState({
        showFirstNameError: !isValidFirstName,
        showLastNameError: !isValidLastName,
        isFormSubmitted: false,
      })
    }
  }
  renderRegistrationForm = () => {
    const {showFirstNameError, showLastNameError} = this.state
    return (
      <form className="formContainer" onSubmit={this.onSubmitForm}>
        {this.renderFirstNameField()}
        {showFirstNameError && <p className="errorMessage">Required</p>}
        {this.renderLastNameField()}
        {showLastNameError && <p className="errorMessage">Required</p>}
        <button type="submit" className="submitButton">
          Submit
        </button>
      </form>
    )
  }
  onClickSubmitAnotherResponse = () => {
    this.setState(prevState => ({
      isFormSubmitted: !prevState.isFormSubmitted,
      firstNameInput: '',
      lastNameInput: '',
    }))
  }
  renderSubmissionSuccessView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
        className="successImage"
      />
      <p>Submitted Successfully</p>
      <button
        type="button"
        className="submitButton"
        onClick={this.onClickSubmitAnotherResponse}
      >
        Submit Another Response
      </button>
    </>
  )
  render() {
    const {isFormSubmitted} = this.state
    return (
      <div className="registrationFormContainer">
        <h1 className="formTitle">Registration</h1>
        <div className="viewContainer">
          {isFormSubmitted
            ? this.renderSubmissionSuccessView()
            : this.renderRegistrationForm()}
        </div>
      </div>
    )
  }
}
export default RegistrationForm
