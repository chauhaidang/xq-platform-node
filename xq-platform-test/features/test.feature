Feature: Greeting

  Scenario:
    When send GET request
      | #path | "/user/123" |
    Then received response
      | #statusCode |       200 |
      | id          |       123 |
      | username    | "bret123" |
