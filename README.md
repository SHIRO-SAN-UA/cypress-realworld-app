# Automation Framework for [cypress-realworld-app](https://github.com/cypress-io/cypress-realworld-app) .


## Reports

HTML Reporting system is hosted at [Github Pages](https://shiro-san-ua.github.io/cypress-realworld-app/).

## Technologies Stack
For full reference see [cypress-realworld-app](https://github.com/cypress-io/cypress-realworld-app).
Cypress dependencies were removed for educational purposes.

-   [WebdriverIO](https://webdriver.io/) - Next-gen browser and mobile automation test framework for Node.js.
-   [Faker](https://fakerjs.dev/guide/) - library that generates fake (but reasonable) data.
-   [Allure Report](https://allurereport.org/) - Test Reporting Tool.


## Setup

### Installation

1.  Install Node.js.
1.  Run `git clone https://github.com/SHIRO-SAN-UA/cypress-realworld-app` to clone repository.
1.  Run `yarn` to install dependencies.

### How to run WDIO tests

1.  Headed `yarn test` - run all specs in Chrome.
1.  Headed `yarn test --specs ../test/specs/**.specs.ts` - run a single spec file.
1.  See other options in package.json scripts, related to WDIO.


### Structure

-   `wdio.conf.ts` WDIO config file.
-   `../test` WDIO framework folder.
-   `../test/pageobjects` - forder with pageobjects.
-   `../test/specs` - forder with tests.
-   `../data/urls.ts` - use to set environment related baseUrl.


### Standards

All test cases should be coded inside the `specs` folder.
Project build using [Page Object Model](https://playwright.dev/docs/pom). The main idea is to encapsulate logic into page classes and use the logic in the spec files to run the tests.

For instance we define the class LoginPage with locators and elements and reuse them in the code.