Feature: As User I should be able to book a stay on Booking website

  Background: User is on Booking website
    Given I am on 'booking.com'

  Scenario Outline: As a User i should be able to book a stay when i fill in the form
    When I enter location "<location>"
    And I select date "<startDate>"
    And I select date "<endDate>"
    And I open the occupancy menu
    And I enter the number of adults "<adults>"
    And I enter the number of children "<children>" and their age "<ages>"
    And I enter the number of rooms "<rooms>"
    And I click 'Done' button
    And I click 'Search' button
    Then I should see a map of desired location

    Examples:
      | location  | startDate    | endDate    |  adults | children | ages             | rooms |
      | Kopaonik  | 2024-02-02   | 2024-03-02 |    2    |     3    | 11, 7, 4         |   2   |
      | Zlatibor  | 2024-03-04   | 2024-03-11 |    1    |     2    | 13, 5            |   1   |
      | Tara      | 2024-04-22   | 2024-04-25 |    4    |     6    | 4, 6, 5, 9, 3, 2 |   3   |