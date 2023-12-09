class StaysPage {

    elements = {
        searchLocationField: () => cy.get('[name="ss"]'),
        locationDropdownItem: () => cy.get('#autocomplete-results li'),
        arrowRight: () => cy.get('[data-testid="searchbox-datepicker-calendar"] > button:last-of-type'),
        occupancyButton: () => cy.get('button[data-testid="occupancy-config"]'),
        adultsMinus: () => cy.get('#group_adults ~ div:last-child button:first-child'),
        adultsPlus: () => cy.get('#group_adults ~ div:last-child button:last-child'),
        childrenMinus: () => cy.get('#group_children ~ div:last-child button:first-child'),
        childrenPlus: () => cy.get('#group_children ~ div:last-child button:last-child'),
        childAge: () => cy.get('select[name="age"]'),
        roomsMinus: () => cy.get('#no_rooms ~ div:last-child button:first-child'),
        roomsPlus: () => cy.get('#no_rooms ~ div:last-child button:last-child'),
        doneButton: () => cy.get('[data-testid="occupancy-popup"] > button'),
        searchButton: () => cy.get('[type="submit"]'),
        mapLink: () => cy.get('[data-testid="map-trigger"]')
    }

    clickSearchLocationField() {
        this.elements.searchLocationField().click()
    }

    typeToSearchLocationField(location) {
        this.elements.searchLocationField().type(location)
    }

    clickLocationResult(location) {
        this.elements.locationDropdownItem().eq(0).contains(location).click()
    }

    selectLocation(location) {
        this.clickSearchLocationField()
        this.typeToSearchLocationField(location)
        this.clickLocationResult(location)
    }

    setDate(date) {
        cy.get('body').then(($body) => {
            if ($body.find('[data-date="' + date + '"]').length) {
                cy.get('[data-date="' + date + '"]').click()
            } else {
                this.elements.arrowRight().click().then(() => {
                    this.setDate(date)
                })
            }
        })
    }

    clickOccupancyButton() {
        this.elements.occupancyButton().click()
    }

    addAnAdult() {
        this.elements.adultsPlus().click()
    }

    removeAnAdult() {
        this.elements.adultsMinus().click()
    }

    addAChild() {
        this.elements.childrenPlus().click()
    }

    removeAChild() {
        this.elements.childrenMinus().click()
    }

    addARoom() {
        this.elements.roomsPlus().click()
    }

    removeARoom() {
        this.elements.roomsMinus().click()
    }

    enterNumberOfAdults(adults) {
        let numberOfAdults = Number(adults)
        cy.get('body').find('#group_adults ~ div:last-child span:nth-child(2)').then(($text) => {
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

    enterNumberOfChildrenAndTheirAge(children, childrenAge) {
        let childrenAgeNum = childrenAge.split(',').map(Number);
        let numberOfChildren = Number(children)
        cy.get('body').find('#group_children ~ div:last-child span:nth-child(2)').then(($text) => {
            let childrenNumber = Number($text.text())
            if (numberOfChildren > childrenNumber) {
                let x = numberOfChildren - childrenNumber
                for (let i = 0; i < x; i++) {
                    this.addAChild()
                    this.elements.childAge().eq(i).select(childrenAgeNum[i] + 1)
                }
            } else if (numberOfChildren < childrenNumber) {
                let y = childrenNumber - numberOfChildren
                for (let i = 0; i < y; i++) {
                    this.removeAChild()
                }
            }
        })
    }

    enterNumberOfRooms(rooms) {
        let numberOfRooms = Number(rooms)
        cy.get('body').find('#no_rooms ~ div:last-child span:nth-child(2)').then(($text) => {
            let roomsNumber = Number($text.text())
            if (numberOfRooms > roomsNumber) {
                let x = numberOfRooms - roomsNumber
                for (let i = 0; i < x; i++) {
                    this.addARoom()
                }
            } else if (numberOfRooms < roomsNumber) {
                let y = roomsNumber - numberOfRooms
                for (let i = 0; i < y; i++) {
                    this.removeARoom()
                }
            }
        })
    }

    clickDoneButton() {
        this.elements.doneButton().click()
    }

    clickSearchButton() {
        this.elements.searchButton().click()
    }

    verifyThatTheMapOfDesiredLocationIsVisible() {
        this.elements.mapLink().should('be.visible')
    }
}

module.exports = new StaysPage()