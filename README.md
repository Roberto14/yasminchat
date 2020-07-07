# yasminchat

A responsive webchat prototype using React and socket.io with typescript. 

## Getting Started

### Prerequisites

Make sure you got `nodejs`, `npm` and `git` installed in your system and check its version: 

```
$ node --version
$ npm --version
$ git --version
```

### Installing

To get development environment up and running do:
1. Clone Github repo and navigate to its folder

```
$ git clone https://github.com/Roberto14/yasminchat.git
$ cd yasminchat 
```

2. Run `npm install`
```
$ npm install
```

3. Run npm script to bootstrap the server and webapp
```
$ npm run start
```

The server should be listening in port `3000, and the webapp can be accessed on http://localhost:8080

## Running the tests

Tests are implemented on `*.spec.tsx` files using Jest and Enzyme. There are examples using snapshots, shallow
and mount, and mocks when needed. By default, test command will output with `--coverage`:

```
$ npm run test
```

For linting run:

```
$ npm run lint
```

## Features

- [x] React Framework
- [x] Typescript (have more experience with Flowtype)
- [x] CSS Preprocessor (used Theme-ui which follows css-in-js approach)
- [x] Chat Page
    - [x] Messages floating left or right
    - [x] Messages contain time and user (if sent by different user)
    - [x] Blink when another tab is active (last minute feature, found out when doing this readme :)
    - [x] Unread messages count in the chat tab
    - [x] Link Parser when a link is present in the message
- [x] Settings Page
    - [x] Username
    - [x] Interface Colour
    - [x] Clock Display
    - [x] Send messages on CTRL+ENTER
    - [x] Internationalization (Only two languages and keys)
    - [x] Settings saved in local storage
    - [x] Reset to defaults
- [x] Unit tests with coverage
- [x] Responsive design, mobile-first approach (although I'm not UI/designer expert)
- [x] Working code that works if we serve it with the http server
- [x] Using env variables for API keys and Socket.io connection

Other than that, I truly focused on using different approaches like using
classic class-based components, functional components with hooks, render props
pattern, custom hooks and providers, and React Context API.

Although this prototype is not production ready and needs to be optimized. Webpack bundle analyzer
has been added to provide us a view on module sizes.
Note that big libraries like theme-ui have been used to speed up this prototype development.

## NPM Scripts

List of all available npm scripts and function:

* `build` - cleans ./dist directory and builds the server and webapp for production
* `build:server` - builds the server and outputs in ./dist
* `build:webapp` - builds the webapp and outputs in ./dist
* `start:prod` - starts our backend server and serves the webapp
* `start:prod:node` - starts production version of server
* `start:prod:webapp` - servers production webapp's bundle & assets 
* `start` - starts development env for server and webapp
* `develop:server` - lifts the server and watches for file changes
* `develop:webapp` - starts webpack dev server for webapp
* `lint` - runs eslint on source files
* `precommit` - runs lint and test on pre-commit hook
* `test` - runs jest tests with coverage

## Built With
Main frameworks and libs used to build this project:

* [Typescript](https://www.typescriptlang.org/)
* [React](https://reactjs.org/)
* [Webpack](https://webpack.js.org/)
* [Theme-ui](https://theme-ui.com/)
* [I18next](https://www.i18next.com/)

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/Roberto14/yasminchat/tags). 

## Authors

* **Roberto Jesus** - [robertojesus.me](https://robertojesus.me)

## License

This project is licensed under the GPLv3 - see the [LICENSE.md](LICENSE.md) file for details
