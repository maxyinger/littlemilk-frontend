# ![littlemilk.studio](public/avatar_github.png)

## Overview

This repository contains all the front end code for the current [littlemilk.studio][1] website and the toolset required to build it.

In order to have control over page transitions and other aspecs of the website, this project uses [React.js][2] & [React Router 4][3] with [Redux][4] & [Reselect][5] for state management.

This project seeks to explore animation in React apps. Animations fall into two categories, Stateful & Reactive. We explored these concepts thoroughly and describe what they are and how they're accomlished in our app below.

## Stateful vs Reactive Animations

_Disclaimer_: If not familiar with functional based programming practices, you should be fine to understand stateful animations, but recommend catching up on some of the core concepts before looking into reactive animations. An excellent tutorial can be found [Here][8] by [MPJ of Fun Fun Function][9]. Also MPJ has several videos on [Dependancy Injection][10] which I found quite useful for composing pipelines for reactive animations.

### Stateful Animations

Stateful Animations tween states in the app and are accomplished through the heavy use of [react-pose][6] in this project.

A common example of stateful animations are CSS transitions, where a state is represented by adding a class to an element and that state can cascade to child elements allowing them to transition properly to the new state in the app.

The main constraint with CSS animations however, is that they often don't suffice for the robustness needed for certain animations. It's more of a challenge to make the properties the new state depends on dynamic in such cases, not to mention the lack of beautiful easing functions!

The main aspect of stateful animations to note here is that stateful animations, although transitioning to a dynamically generated property, transition to a static,single value for each respective property. If the property is however frequently changing and better represented as a stream of values rather than a change in state, we look to reactive animations!

### Reactive Animations

Reactive animations are needed to animate an element who's properties (or property) depend on a stream of values. This case is mostly seen when an elements property is dependant on events like mousemove, scroll, or touch based gestures. In this project we originally looked to [react-pose][6] because of its declaritive syntax and ease of use for react integration, but soon found we needed the robustness of [popmotion][7] to suffice our needs.

Through repeated use on multiple components, we a quickly saw a pattern emerging in our reactive animations. This pattern basically consists of state defining what streams we should listen to, how we should augment those streams to transform DOM events into the required properties, then how we should animate our component to that property.

#### State Derived Stream Binding

In this project we essentially used [reselect][5] to derive a finite automata (fancy wording for reducer) from our state to pass into our component. This derived state was handled in a component local reducer which dispatched what streams the component should bind to.

#### State Derived Stream Augmentation

This project also heavily used [reselect][5], and the functional programming utilities in [popmotion][7], to compose pipelines derived from the application state. This allowed for the stability of redux, but also the ability to dynamically generate stream transformations depending on the application state.

#### Animating the Component

Currently using popmotion's [physics][11] and [value][12] features for lerping to a derived value. Looking to possibly implement custom lerping for potential performance & visual benefits.

#### Sidenotes

Ben Lesh, lead of RxJS, has a great video on accomplishing reactive and stateful animations with RxJS. We're looking at incorporating them into our next project and hope RxJS provides better support and control over reactive animations, but will likely stick with [react-pose][6] for most stateful animation use cases. Watch Ben Lesh's talk [here][13].

## Feature Todos

- Mobile support
- Server Side Rendering
- Code Splitting
- Further Performance Optimizations
- [Globby Ball][14] of App State
- Contact Form Page
- 404 and Device Support Redesign
- Preloader, Maybe Drag Intro Tutorial

## References

- [Architecture Used][15]
- Modified Build of [react-redux-starter-kit][19] to work with Webpack 4
- [Page Transition Example][16]
- [Constraint Motion Example][17]
- [Aristide Benoist Easing Functions][18]

[1]: https://littlemilk.studio
[2]: https://reactjs.org/
[3]: https://reacttraining.com/react-router/
[4]: https://redux.js.org/
[5]: https://www.npmjs.com/package/reselect
[6]: https://popmotion.io/pose/
[7]: https://popmotion.io/pure/
[8]: https://www.youtube.com/watch?v=BMUiFMZr7vk&list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84
[9]: https://www.youtube.com/channel/UCO1cgjhGzsSYb1rsB4bFe4Q
[10]: https://www.youtube.com/results?search_query=dependancy+injection+fun+fun+function
[11]: https://popmotion.io/api/physics/
[12]: https://popmotion.io/api/value/
[13]: https://www.youtube.com/watch?v=X_RnO7KSR-4
[14]: https://www.clicktorelease.com/blog/vertex-displacement-noise-3d-webgl-glsl-three-js/
[15]: https://levelup.gitconnected.com/structure-your-react-redux-project-for-scalability-and-maintainability-618ad82e32b7
[16]: https://popmotion.io/pose/examples/route-transitions-reach-router/
[17]: https://popmotion.io/learn/constrain-motion/
[18]: https://github.com/ariiiman/s/blob/master/src/Core/Ease.js
[19]: https://github.com/davezuko/react-redux-starter-kit
