Feature: Test case for Boiler plate Body
@home
    Scenario Outline: Check the Boiler plate Body section 
        Given Customer open Boiler plate page "<url>"
        When Customer check the Walgreens UI microservices Boilerplate text in home
    Examples: 
    | url |
    | /helloworld |