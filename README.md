# VueInBrowserLoader

Inspired by Franck Freiburger's [http-vue-loader](https://github.com/FranckFreiburger/http-vue-loader).

---

`VueInBrowserLoader(url)`

Loads a `.vue` file from the given URL and compiles it to a component directly in the browser. Already loaded components are cached.

## dependencies

*no dependencies*

## setup

### npm

```shell
npm install vueinbrowserloader
```

### ES module

```javascript
import VueInBrowserLoader from 'vueinbrowserloader';
```

### browser

```html
<script src="https://unpkg.com/vueinbrowserloader"></script>
```

## usage

```javascript
new Vue({
  /*...*/
  components: {
    'my-tiny-component': VueInBrowserLoader('/vue-components/my-tiny-component.vue'),

    'my-component': VueInBrowserLoader('/vue-components/my-component'),
     // resolves to '/vue-components/my-component/index.vue'
  },
});
```

---

Use relative URLs.

```html
<!-- /vue-components/my-component/index.vue -->
<template>
  <p><!--...--></p>
</template>
<script>

module.exports = {
  /*...*/
  components: {
    'my-nested-component': VueInBrowserLoader('./my-nested-component'),
    // resolves to '/vue-components/my-component/my-nested-component/index.vue'

    'my-general-component': VueInBrowserLoader('../my-general-component'),
    // resolves to '/vue-components/my-general-component/index.vue'
  },
});

</script>
```

---

Separate files.

```html
<template src="./template.html"></template>
<script src="./script.js"></script>
<style src="./style.layout.css"></style>
<style src="./style.theme.green-forest.css"></style>
```

## todo

- scoped style
- preProcessors
- postProcessors
