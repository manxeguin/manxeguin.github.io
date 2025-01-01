---
title: Micro Frontends are hard
date: 2024/7/30
description: My personal take about distributed frontend development.
tag: frontend, microfrontend
author:
---
## Intro

In today's fast-paced tech world, managing large-scale web applications can be daunting. With multiple engineering teams working on different parts of an application, ensuring smooth development and deployment becomes critical. In this post, I’ll share my experiences and insights on tackling these challenges.

### A bit of context and experience

In large organizations, multiple engineering teams handle different areas/domains of a web application. If the application is big enough, the number of teams could exceed ten. More than ten teams adding new features daily to a single application can lead to a bottleneck due to the increased number of components, unit tests, integration tests, e2e tests, and configurations.

At one of my previous companies, we had a big frontend monolith. Continuous integration took almost an hour, and releases were manually scheduled once per day. The development server was slow due to numerous dependencies, and features like live-reload didn’t work. The code was shared between multiple teams, not having a clear ownership (both in maintainability and observability). The state was shared between pages through the module in many different ways (sometimes keeping the state in the URL, sometimes in SessionStorage, sometimes in the backend session), and often this state was shared between teams. As a developer, you did not know where to take the state from, not to mention the number of experiments, not knowing where to put your code.

To address this, we first split the API calls from the rendering. We created a GraphQL layer to fetch data in a new service separate from the monolith. This new service had CI/CD with automated promotions to production environments using a canary/stable approach, allowing us to deploy multiple times a day. CI/CD was fast, and running this service locally was smooth.

So everything was much better, but is it really?

When implementing a new feature, it often involves creating a UI experience that interacts with the data. This requires changes in both the new service and the UI part, leading to multiple PRs, reviews, and approvals. In the best-case scenario, the developer is familiar with both systems, but often this is not the case, making the process longer. Wouldn't it be simpler to create a single PR in the monolith and wait an hour for CI? Most features (not bug fixes) take more than a day to implement, so multiple daily releases might not be necessary. The difference might not be as significant as it seems.

### Micro Frontends

Now imagine how the scenario would be if we were adopting a micro frontend solution, where a web page is assembled at runtime by different teams. Picture a screen with a header, a product list, and a shopping cart. Then, the product manager asks to implement a new feature that involves changes in all of them, as well as changes in the API layer. There are many questions you need to ask yourself:

- How would the local experience be? Do I need to run four dev servers locally?
- What about QA? How do I handle integration and e2e testing?
- How many PRs are needed?
- Do all the components have the same contribution guidelines and release process?
- Are my developers familiar with all the components?
- What about logs and observability? How do I debug an issue?
- …

I am not saying that all the challenges above cannot be solved, but you will need to work hard to create something that actually works well for your company. It will likely need to be a bespoke solution tailored to your needs, built and maintained by a platform team. I am tired of seeing people posting that implementing a micro frontend architecture is just about using module federation. Don’t get me wrong, module federation is a great tool, but the only problem it solves is the optimization of shared dependencies in JavaScript. It won’t solve any of the challenges mentioned above.

### NextJS

That is why I like NextJS. In my opinion, it is simple by default and provides almost everything you need to create a web feature. Need a new page? Just create a new file. Need a new API endpoint? Just create a new file. You can develop and test everything in the same place, and it is type-safe. You can decide whether to create a more client-side app or a fully SSR page; it’s your choice, and both options are easy. Besides you won't need to configure complex webpack configurations to serve optimized bundles or polyfills for performance, you will also have automatic code-splitting by route and automatic preload/prefetch almost by default. This is how a good development experience should be, it should allow you to iterate your product in the more simple way. I think this it is more agile than having to make changes in four different places.

Of course, if you have a single NextJS app, it will eventually become a monolith, and you could face similar problems to the ones I’ve mentioned. In my next article, I’ll discuss how we can create different NextJS applications to have a kind of vertical micro frontend architecture where we split the frontends by pages instead of at the component level. I’ll also cover how to route traffic to them and the role of OpenNext in it.

Stay tuned!
