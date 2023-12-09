class FlightsPage {

    elements = {
        startingLocation: () => cy.get('button[data-ui-name="input_location_from_segment_0"]'),
        locationOptions: () => cy.get('.Flyout-module__inner___HIjQv li'),
        endingLocation: () => cy.get('button[data-ui-name="input_location_to_segment_0"]'),
        selectClass: () => cy.get('select[data-ui-name="cabin_class_input"]'),
        passengers: () => cy.get('button[data-ui-name="button_occupancy"]'),
        adultPlus: () => cy.get('[data-ui-name="button_occupancy_adults_plus"]'),
        adultMinus: () => cy.get('[data-ui-name="button_occupancy_adults_minus"]'),
        childPlus: () => cy.get('[data-ui-name="button_occupancy_children_plus"]'),
        childMinus: () => cy.get('[data-ui-name="button_occupancy_children_minus"]'),
        directFlightCheckbox: () => cy.get('[data-ui-name="direct_flights"]'),
        doneButton: () => cy.get('[data-ui-name="button_occupancy_action_bar_done"]'),
        searchButton: () => cy.get('[data-ui-name="button_search_submit"]'),
        numberOfFilteredResults: () => cy.get('[data-testid="search_filters_summary_results_number"]'),
        dateMenu: () => cy.get('button[data-ui-name="button_date_segment_0"]'),
        arrowRight: () => cy.get('[data-ui-name="calendar_body"] > button:last-of-type')
    }

    selectStartingLocation(startingLocation) {
        this.elements.startingLocation().type(startingLocation)
        this.elements.locationOptions().eq(0).click()
    }

    selectEndingLocation(endingLocation) {
        this.elements.endingLocation().type(endingLocation)
        this.elements.locationOptions().eq(0).click()
    }

    chooseFlightType(type) {
        cy.contains(type).click({force:true})
    }

    selectClass(classType) {
        this.elements.selectClass().select(classType)
    }

    openDateMenu() {
        this.elements.dateMenu().click()
    }

    selectDate(date) {
        cy.get('body').then(($body) => {
            if ($body.find('[data-date="' + date + '"]').length) {
                cy.get('[data-date="' + date + '"]').click()
            } else {
                this.elements.arrowRight().click().then(() => {
                    this.selectDate(date)
                })
            }
        })
    }

    openPassengersMenu() {
        this.elements.passengers().click()
    }

    addAnAdult() {
        this.elements.adultPlus().click()
    }

    removeAnAdult() {
        this.elements.adultMinus().click()
    }

    selectNumberOfAdults(adults) {
        let numberOfAdults = Number(adults)
        cy.get('body').find('[data-ui-name="occupancy_adults"] span:nth-child(2)').then(($text) => {
            let adultsNumber = Number($text.text())
            if (numberOfAdults > adultsNumber) {
                let x = numberOfAdults - adultsNumber
                for (let i = 0; i < x; i++) {
                    this.addAnAdult()
                }
            } else if (numberOfAdults < adultsNumber) {
                let y = adultsNumber - numberOfAdults
                for (let i = 0; i < y; i++) {
                    this.removeAnAdult()
                }
            }
        })
    }

    addAChild() {
        this.elements.childPlus().click()
    }

    removeAChild() {
        this.elements.childMinus().click()
    }

    selectNumberOfChildrenAndTheirAge(children, childrenAge) {
        let childrenAgeNum = childrenAge.split(',').map(Number);
        let numberOfChildren = Number(children)
        cy.get('body').find('[data-ui-name="occupancy_children"] span:nth-child(2)').then(($text) => {
            let childrenNumber = Number($text.text())
            if (numberOfChildren > childrenNumber) {
                let x = numberOfChildren - childrenNumber
                for (let i = 0; i < x; i++) {
                    this.addAChild()
                    cy.get('[data-ui-name="select_occupancy_children_age_' + i + '"]').select(childrenAgeNum[i] + 1)
                }
            } else if (numberOfChildren < childrenNumber) {
                let y = childrenNumber - numberOfChildren
                for (let i = 0; i < y; i++) {
                    this.removeAChild()
                }
            }
        })
    }

    isFlightDirect(direct) {
        if (direct === "yes") {
            this.elements.directFlightCheckbox().click()
        }
    }

    clickDoneButton() {
        this.elements.doneButton().click()
    }

    clickSearchButton() {
        this.elements.searchButton().click()
    }

    verifyThatNumberOfFilteredResultsIsVisible() {
        this.elements.numberOfFilteredResults().should('be.visible')
    }
}

module.exports = new FlightsPage()