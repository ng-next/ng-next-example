## Glossary
Our non functional ubiquitous language. You specify a separate ubiquitous
language when talking to other people about the actual problem domain (e.g.
to business experts, developers, QA, product owners .. you get the idea.)


### Story Group (or bigger Feature)


### Story (or Feature)


### Product
May include several different Apps (e.g. mobile web, desktop web, mobile
native iOS, mobile native Android, desktop native Mac OS X etc.)


### Adaptive UI (grr, ok, it's: Responsive Webdesign)
The UI of an App automatically adapts to different device categories(screen
sizes / form factors / input devices and input methodologies). At best the
amount of displayed information and the available functionality stays the
same across all device categories. What differs should be just the style /
layout with which this information and functionality gets presented and made
available to the user.
The above might work for blogs quite well. But if (like it's typically the
case for a larger, more sophisticated Product) there's a huge difference
between the displayed information and available functionality across
different device categories, then rather consider to make separate Apps
specific to the individual device category (the same Core can be used across
all Apps).
(reference: Dino esposito: You download to hide!)

Today, regarding the hugely varying dpi/screen resolutions, expressing the
size of a screen in pixels is imho inappropriate. It all should relate to
something like the much better understandable unit "cm" or "inch".

btw: I actually hate the term "Responsive Webdesign" (reference: Uncle Bob:
an app is responsive if the UI responds to user input in a quickly fashion).


### Core
  - Core can consist of separate modules, some of which are used in all Apps
  and some of which are only used in individual Apps that use the same Core.
- domain logic / business rules


### App
- App specific functionality
  - can be promoted to and loaded from Core (dynamically via module loader.
  see ES6-module-loader / SystemJS)
- promotion



### Main Partition
- App specific configuration (IoC container, ...?)
- ui-states use Angular's config phase. They keep their configuration within
themselfs and hook into the config phase.


### Folder Structure / Boundaries


### Reuseablity
Can be achieved by decoupling (which you always should do anyways). If you
then actually need to use components in more than one App then you can make them
available as separate package / repo (see Promotion).
  - reusable (UI / logic) components


### Promotion of code / components
If a component (e.g. directive) got used only by an individual ui-state and now
should be made accessable for other parts of the system then it has to move
up in the Folder Structure. Thus the direction of dependencies are still
valid (rule: dependencies should cross boundaries / seams from concrete to
abstract. Never the other way around)

- promotion targets
  - higher levels in the folder structure. If
  (potentially has just symbolic value because ....... ? -> clearify that
  thought!)
  - own package / repo

### Decoupling / Deployment
 - needed for deploy as microservice
 - (reference: Uncle Bob's article: Domain Discontinuity)

### Providers (the concept)
#### Services (the concept)
The Angular concept of a service includes: Constants, Values, Providers,
Services (constructor functions), Factories (return objects).
Their API (except Provider.$get()) is up to the user.
Often Services are named by their architectural pattern (having a "Service"
postfix, or no postfix at all), rather than by their technical nature. That's
totally fine.
So you'll see Services(Classes), Factories (and sometimes even Providers)
having the postfix "Service".
Constants and Values almost always don't have a postfix in their name.

#### Specialized Objects
include: Controllers, Directives, Filters or Animations (in some way $Filter,
$Parse as well).
Conform to a specific Angular framework API.

### Context (ctx)
Ambient Context (reference: Mark Seemann / others)
