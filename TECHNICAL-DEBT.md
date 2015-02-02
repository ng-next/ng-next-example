## Technical Debt
Describes design flaws or technical drawbacks that **we are aware of** and that
have to be improved sometime in the future because right now there's no time
for doing that. But as we know how things are done "right", it's not cruft.
Cruft is inexcusable.

### ngAnnotate, minification
get rid of helper function "ngInject()" as soon as ngAnnotate can properly
handle ES6 (and especially Controller and Service constructor functions)

### Context
(Ambient) Context should only be used for querying (e.g. the current time), not
writing (e.g. logging). For cross-cutting concerns that write, other patterns
 like Interception, Decoration should be used.

*Current Debt:* logging service is exposed via context although it's only used for writing.
Maybe we have to wait until in angular we can exclusively use classes for
controllers, services, directives (so that methods can me overridden more
easily).
But it also might be that it's not really adequate in JavaScript at all.
Because how would you implement logging e.g. in a callback? (-> maybe async
await is a rescue?).


### auth-service
*Current Debt:*
- split up authentication and authorization
- authorization should be done by decorator pattern (for each Interactor)


### ui-state's URL's
maybe move the URL/route config for each Story Group into the Main Partition.
A default could be available, so in Main Partion you could just do
route overrides.


### asset management
*Current Debt:* Currently static URLs are used.

- Icons
In the folder structure, Icons should reside besides their reusable
components that use them.
- Images

Find out how to generate URLs when componets get used in different apps.


### introduce (proper boundaries) separate repos
- separate (dependency free) domain logic (Interactors, Entities) from UI / UI
logic. ... -> that's actually the fact right now. But domain logic could be
moved to separate Core repo (necessary as soon as you have more then one App
that share code).
- separate repos for all reusable components.


### get rid of circular reference
... due to logging-exception-handler.js
    Circular dependency found: $rootScope <- $q <- $$interimElement <- $mdToast
    <- toast <- log <- $exceptionHandler <- $rootScope


### convert factories to services (classes as soon as ngAnnotate handles ES6)
... to prepare for Angular 2.0

### directives as Story Group parent states
... to get rid of (some) html element ids

### ESLint "DisallowBundleInJspmConfig" plugIn
lint that config.js can only be commited if no bundle is present
