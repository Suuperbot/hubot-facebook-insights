# hubot-facebook-insights

A hubot script for some facebook insights

See [`src/facebook-insights.coffee`](src/facebook-insights.coffee) for full documentation.

## Installation

In hubot project repo, run:

`npm install hubot-facebook-insights --save`

Then add **hubot-facebook-insights** to your `external-scripts.json`:

```json
[
  "hubot-facebook-insights"
]
```

## Sample Interaction

```
user1>> fb fans PageNameOrFBid
hubot>> 59367 fans
```

```
user1>> fb checkins PageNameOrFBid
hubot>> 28631 checkins
```

```
user1>> fb talking about pageNameOrFBid
hubot>> 5612 talking about
```
