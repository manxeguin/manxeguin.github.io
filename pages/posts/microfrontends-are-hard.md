---
title: Micro frontends are hard: lessons from distributed frontend teams
date: 2024/7/30
description: Lessons learned from distributed frontend teams and micro frontends.
author:
---

## Intro

Managing large-scale web applications with many teams is hard. As more teams work on the same app, keeping development and deployment smooth becomes critical. In this post, I’ll share concrete experiences and tradeoffs you face when you try to scale the frontend.

### Some context and experience

In large organizations, multiple engineering teams handle different areas/domains of a web application. If the application is big enough, the number of teams could exceed ten. More than ten teams adding new features daily to a single application can lead to a bottleneck due to the increased number of components, unit tests, integration tests, e2e tests, and configurations.

At one of my previous companies, we had a big frontend monolith. Continuous integration took almost an hour. Releases were manually scheduled once per day. The development server was slow due to numerous dependencies. Features like live-reload didn’t work.

The code was shared between multiple teams with no clear ownership; neither for maintainability nor for observability. State was shared between pages in many different ways; sometimes in the URL, sometimes in SessionStorage, sometimes in the backend session. Often this state was shared between teams. As a developer, you did not know where to get the state from. Experiments added even more confusion about where to place new code.

To address this, we first split the API calls from the rendering. We created a GraphQL layer to fetch data in a new service separate from the monolith. This new service had CI/CD with automated promotions to production environments using a canary/stable approach, allowing us to deploy multiple times a day. CI/CD was fast, and running this service locally was smooth.

So everything looked much better. Was it, really?

When you want to ship a new feature, you often create a UI experience that interacts with data. This requires changes in both the new service and the UI. That leads to multiple PRs, reviews, and approvals. In the best case, the developer is familiar with both systems. Often this is not the case, so the process gets longer.

Wouldn't it be simpler to create a single PR in the monolith and wait an hour for CI? Most features, not bug fixes, take more than a day to build. Multiple daily releases are not always necessary. The difference in speed is smaller than it looks.

### Micro frontends

Now imagine how the scenario would be if we were adopting a micro frontend solution, where a web page is assembled at runtime by different teams. Picture a screen with a header, a product list, and a shopping cart. Then, the product manager asks to implement a new feature that involves changes in all of them, as well as changes in the API layer. There are many questions you need to ask yourself:

- How would the local experience be? Do I need to run four dev servers locally?
- What about QA? How do I handle integration and e2e testing?
- How many PRs are needed?
- Do all the components have the same contribution guidelines and release process?
- Are my developers familiar with all the components?
- What about logs and observability? How do I debug an issue?
- …

All the challenges above can be solved, but you need to work hard to create something that works well for your company. It will likely be a bespoke solution tailored to your needs, built and maintained by a platform team. I am tired of seeing people posting that a micro frontend architecture is just about using module federation. Module federation is a solid tool, but the only problem it solves is the optimization of shared dependencies in JavaScript. It won’t solve any of the challenges mentioned above.

### Next.js

That is why I like Next.js. It is simple by default and provides almost everything you need to create a web feature. Need a new page? Just create a new file. Need a new API endpoint? Just create a new file.

You can develop and test everything in the same place, and it is type-safe. You can decide whether to create a more client-side app or a fully SSR page; it’s your choice, and both options are easy. You don't need to configure complex webpack setups to serve optimized bundles or polyfills for performance. You also get automatic code-splitting by route and automatic preload/prefetch almost by default.

This is the kind of development experience you want; it lets you iterate on your product in the simplest way. For many teams, this is faster than changing four different systems.

Of course, if you have a single Next.js app, it will eventually become a monolith, and you could face similar problems to the ones I’ve mentioned. In my next article, I’ll discuss how we can create different Next.js applications to have a kind of vertical micro frontend architecture where we split the frontends by pages instead of at the component level. I’ll also cover how to route traffic to them and the role of OpenNext in it.

Stay tuned!
