# Backdrop Code Challenge

This repository contains code for the Backdrop coding challenge.

## What's inside ✨:

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
### Why did you use a mutation?
The challenge requirements specify that the GraphQL server have a single ```shortenURL``` **query**. However, as per the GraphQL [specification](http://spec.graphql.org/draft/#sec-Mutation), I decided to implemented this as a **mutation** instead because it modifies server resources akin to a http POST.

### Schema first vs Code first
For this challenge I decided to use the schema-first approach to show that I can write out the GraphQL SDL by hand and also because the requirements are fairly small and straightforward; for bigger projects however, I'm more inclined to use the code-first approach leveraging frameworks like [Nexus](https://nexusjs.org) and [TypeQL](https://typeql.com/).

<br/>

>PS: Working at a technologically forward company like Backdrop would be a dream come true. I do hope I'm considered for the role.

<p align="center">Made with lots of 💙 by Kelvin</p>


