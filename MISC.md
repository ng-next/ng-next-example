## Misc


### Dynamic menu
Let (most parts of) the menu be created dynamically at runtime.
Maybe by using a MenuProvider(Provider) (which would reside in the Core) and
the config phase so that individual Story Groups could plug in to the menu.


### ui-states     /  / story-group-states

#### root-state
Important: the root-state is not the ui-routers internal root state (ok, that's
a potential naming conflict. But we define our own ubiquitus language
anyways, right?). the root-state is a custom defined state under which are all
other child ui-states.

##### root-state is used for layout.
Might be used for globally storing custom data or functionality (via the
ui-router-state's data property that gets inherited down to child states) ..
but rather shouldn't be used for that because it's implicit dependencies (there
be dragons!). Make dependencies explicit, e.g. by using separate services!

#### main-ui-states

#### story-group-states
All the other story-group-states depend upon the existance of a root-state.
So when individual Story Groups get used in different Apps / Main Partitions
there has to be an abstract root-state available.

Other Apps / Main Partitions ...
- can be (automatically !?) created just for testing purposes. Test Apps
could each have a rudimentary root-state and just E2E-test single Story Groups.
  - be aware of potential interdependent Story Groups! (conceptional and
  technical decoupling is needed. maybe check "anti corruption layer" from
  DDD for inspirations. reference: Eric Evan's "blue book")
-


### State, Controller, Template -tuples
a UI makes a perfect (finite) state machine. So let's treat it as such!
No more ng-includes! (meme: destroy all the ng-includes!)

reference: AngularAir 02 - John Linquist (xx:xx)


### make all the implicit explicit vs. convention over configuration
convention over configuration very often is a good thing. But then simply
explicitly explain and document all the used conventions (which among other
stuff, this document is all about).


### Angular Modules vs. ES6 Modules
I'm not concerned about Angular Module names or dependencies (anymore). All
Angular Modules get registered in the main Angular App Module (contrary to
John Papas famous Angular Styleguide) and use the ES6 Module's name
("__moduleName", e.g. "app/my-story-group/ui/my-ui-state/my-ui-state").
It's all about ES6 Module dependencies nowadays. imho that makes stuff so much
simpler.
Each Angular Module (as well as each Controller, Service, Directive ...) gets
wrapped by an ES6 Module. That happens implicitly if you interpret each file
as ES6 module. Thus one file per Controller, Service, Directive etc.

All ES6 Module dependencies are specified by using the ES6 Module import syntax.
Each ES6 Module imports all the other ES6 Modules it dependends on.

As we're heading towards Angular 2.0, Angular Modules will eventually disappear
anyways. In favour of ES6 Modules (and classes). So why keep using them if
you don't have to?

Warning: An ES6 Module's dependency could already have been imported from a
different ES6 Module and thus your module would still work without explicitly
defining this dependency (as the dependent code was already loaded). Thus
make sure that you test all your components in isolation (unit tests for
units, integration / E2E tests for the App (or individual Story Groups)!!

### Size (Small <-> Large) vs. Connectivity (Mobile vs. Stationary vs. Offline) dillemma
TODO

### VVMD (View, ViewModel, DataStructure)
TODO
