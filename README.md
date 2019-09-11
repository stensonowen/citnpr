
### Conservatism is the New Punk Rock
#### The Implicit Association Test

what's the opposite of a magnum opus

http://conservatismisthenewpunkrock.com


### Scoring

* millisecond precision
* `max(time, 300)`
* `min(time, 3000)`
* I stopped reading the IAT paper at this point
* wrong answers are discarded
* the averages of these sets determines the result (not what the paper does)


### Contributing

Try to do your part to make the code as weird looking as possible.
See samples from the source code for inspiration:

Like [weird sigil art](src/App.js#L139)

```js
const bad = n => n <= 0 || isNaN(n);
```

or [misusing keywords](src/model.js#L31)

```js
this.null = null; // whether the null hypothesis is pro or con
// ...
this.null = true;
```


### TODO

* implement the actual statistics from the original paper
* figure out how to score wrong answers (rn they're dropped)
* add control stages to make the results scientifically meaningful
* invasive telemetry
* does this deserve a cert?
* never touch this site again
* never touch react again


### License

[AGPL](https://www.gnu.org/licenses/agpl-3.0.en.html)

