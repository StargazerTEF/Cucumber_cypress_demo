class HomePage {

    elements = {
        dismissSignInButton: () => cy.get('[aria-label="Dismiss sign-in info."]'),
        flightsLink: () => cy.get('#flights')
}

    clickDismissSignInPoPUpDialog() {
        this.elements.dismissSignInButton().click()
    }

    dismissSignIn() {
        cy.get('body').then(($body) => {
            if ($body.find('[aria-label="Dismiss sign-in info."]').length) {
                this.clickDismissSignInPoPUpDialog()
            }
        })
    }

    clickFlightsLink() {
        this.elements.flightsLink().click()
    }
}

module.exports = new HomePage()