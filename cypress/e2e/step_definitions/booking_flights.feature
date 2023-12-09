Feature: As User I should be able to book a flight on Booking website

  Background: User is on Booking website
    Given I am on 'booking.com'

  Scenario Outline: As a user I should be able to book a flight when I fill in the form
    When I click Flights link
    And I choose "<type>" of flight
    And I select "<class>" class
    And I select starting location "<startingLocation>"
    And I select ending location "<endingLocation>"
    And I open date menu
    And I select "<travelDate>"
    And I open the passengers menu
    And I select the number of adults "<adults>"
    And I select the number of children "<children>" and their age "<ages>"
    And I click Done button
    And I choose if it is a direct flight "<direct>"
    And I click Search button
    Then I should see the number of filtered results

    Examples:
      | type      | class       | startingLocation | endingLocation    | travelDate   |  adults | children |  ages | direct  |
      | One-way   | Business    | Belgrade         | London            | 2024-03-02   |    2    |     2    | 10, 6 |   no    |
      | One-way   | Economy     | Nis              | Frankfurt         | 2024-02-02   |    1    |     0    |       |   no    |
      | One-way   | First-class | Madrid           | Montevideo        | 2024-04-25   |    1    |     1    |  3    |   yes   |