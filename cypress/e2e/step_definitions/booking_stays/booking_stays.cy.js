import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps'

const StaysPage = require('../../../page-object/StaysPage')
const HomePage = require('../../../page-object/HomePage')

// This is the safest way I found to avoid test crashing at the very start
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

Given("I am on {string}", (url) => {
    cy.viewport(1920, 1080)
    cy.visit("https://www." + url)
    cy.wait(4000)
    HomePage.dismissSignIn()
})

When("I enter location {string}", (location) => {
    StaysPage.selectLocation(location)
})

When("I select date {string}", (date) => {
    StaysPage.setDate(date)
})

When("I open the occupancy menu", () => {
    StaysPage.clickOccupancyButton()
})

When("I enter the number of adults {string}", (adults) => {
    StaysPage.enterNumberOfAdults(adults)
})

When("I enter the number of children {string} and their age {string}", (children, childrenAge) => {
    StaysPage.enterNumberOfChildrenAndTheirAge(children, childrenAge)
})

When("I enter the number of rooms {string}", (rooms) => {
    StaysPage.enterNumberOfRooms(rooms)
})

When("I click 'Done' button", () => {
    StaysPage.clickDoneButton()
})

When("I click 'Search' button", () => {
    StaysPage.clickSearchButton()
})

Then("I should see a map of desired location", () => {
    StaysPage.verifyThatTheMapOfDesiredLocationIsVisible()
})