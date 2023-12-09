class HomePage {

    elements = {
        dismissSignInButton: () => cy.get('[aria-label="Dismiss sign-in info."]')
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
}

module.exports = new HomePage()