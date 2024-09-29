Feature: Greeting

  Scenario:
    When send request "/account"
      | $method | "POST"  |
      | name    | "david" |
      | id      | "dv001" |
    Then received response
      | $status |     201 |
      | id      | "dv001" |
