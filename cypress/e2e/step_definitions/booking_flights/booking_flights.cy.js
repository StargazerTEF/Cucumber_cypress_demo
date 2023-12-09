import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps'

const FlightsPage = require('../../../page-object/FlightsPage')
const BookingHomePage = require('../../../page-object/HomePage')

// This is the safest way I found to avoid test crashing at the very start
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

Given("I am on {string}", (url) => {
    cy.visit("https://www." + url)
    cy.wait(4000)
    BookingHomePage.dismissSignIn()
})

When("I click Flights link", () => {
    BookingHomePage.clickFlightsLink()
})

When("I choose {string} of flight", (type) => {
    FlightsPage.chooseFlightType(type)
})

When("I select {string} class", (classType) => {
    FlightsPage.selectClass(classType)
})

When("I select starting location {string}", (startingLocation) => {
    FlightsPage.selectStartingLocation(startingLocation)
})

When("I select ending location {string}", (endingLocation) => {
    FlightsPage.selectEndingLocation(endingLocation)
})

When("I open date menu", () => {
    FlightsPage.openDateMenu()
})

When("I select {string}", (date) => {
    FlightsPage.selectDate(date)
})

When("I open the passengers menu", () => {
    FlightsPage.openPassengersMenu()
})

When("I select the number of adults {string}", (adults) => {
    FlightsPage.selectNumberOfAdults(adults)
})

When("I select the number of children {string} and their age {string}", (children, childrenAge) => {
    FlightsPage.selectNumberOfChildrenAndTheirAge(children, childrenAge)
})

When("I click Done button", () => {
    FlightsPage.clickDoneButton()
})

When("I choose if it is a direct flight {string}", (direct) => {
    FlightsPage.isFlightDirect(direct)

})

When("I click Search button", () => {
    FlightsPage.clickSearchButton()
})

Then("I should see the number of filtered results", () => {
    FlightsPage.verifyThatNumberOfFilteredResultsIsVisible()
})