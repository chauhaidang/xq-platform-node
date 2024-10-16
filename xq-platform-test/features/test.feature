Feature: API steps

  Scenario: e2e api flow
    When make POST request
      | #path    | "/user"         |
      | name     | "xqtest"        |
      | password | "pwd123"        |
      | username | "xqtestusrname" |
      | phone    | "123456789"     |
    And received response
      | #statusCode |             201 |
      | name        | "xqtest"        |
      | username    | "xqtestusrname" |
    When make GET request
      | #path | "/user/123" |
    Then received response
      | #statusCode |       200 |
      | id          |       123 |
      | username    | "Bret123" |
