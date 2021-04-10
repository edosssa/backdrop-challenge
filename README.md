# Backdrop Code Challenge

View the deployed version at [https://backdrop-challenge.herokuapp.com](https://backdrop-challenge.herokuapp.com/graphiql) 🚀

## Highlights ✨

- Fully functional GraphQL server as per the challenge requirements
- Integration tests using Mocha, Chai and supertest
- Continuous integration (CI) using Github actions
- 100% Typescript, because it's not 2005 anymore

## Getting started

```bash
cd <project-dir>
yarn
yarn start # or yarn dev
```

## TL;DR

### To Query or not to Query

The challenge requirements specify that the GraphQL server have a single `shortenURL` **query**. However, as per the GraphQL [specification](http://spec.graphql.org/draft/#sec-Mutation) it could be better implemented as a **mutation** instead because it modifies server resources akin to a http POST. Most GraphQL server implementations run queries in **parallel** which could lead to a race condition (albeit astronomically rare) where one operation containing multiple aliased shortenURL queries would generate the same shortUrl for two different long urls. As a result, the short url would resolve to the url of the last executed `shortenURL` query. Mutations on the other hand are resolved serially and will not have such a race condition.

### Schema first vs Code first

For this challenge I decided to use the schema-first approach to show that I can write out the GraphQL SDL by hand and also because the requirements are fairly small and straightforward; for bigger projects however, I'm more inclined to use the code-first approach leveraging frameworks like [Nexus](https://nexusjs.org) and [TypeQL](https://typeql.com/).

<br/>

> PS: I do hope I'm considered for the role.

<p align="center">Made with lots of 💙 by Kelvin</p>
