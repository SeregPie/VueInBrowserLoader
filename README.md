# VueInBrowserLoader

Inspired by Franck Freiburger's [http-vue-loader](https://github.com/FranckFreiburger/http-vue-loader).

---

`VueInBrowserLoader(url)`

Loads a `.vue` file from the given URL and compiles it to a component directly in the browser. Already loaded components are cached.

## dependencies

- [Vue](https://github.com/vuejs/vue)

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
  components: {
    'MyButton': VueInBrowserLoader('/app/components/Button.vue'),

    'MyDialog': VueInBrowserLoader('/app/components/Dialog'),
     // resolves to '/app/components/Dialog/index.vue'
  },
  /*...*/
});
```

---

Use relative URLs.

```html
<!-- /app/components/Dialog/index.vue -->
<template><!--...--></template>
<script>

module.exports = {
  components: {
    'MyTitleBar': VueInBrowserLoader('./TitleBar.vue'),
    // resolves to '/app/components/Dialog/TitleBar.vue'

    'MyButton': VueInBrowserLoader('../Button.vue'),
    // resolves to '/app/components/Button.vue'
  },
  /*...*/
});

</script>
```

---

Separate files.

```html
<template src="./template.html"></template>
<script src="./script.js"></script>
<style src="./style.layout.css"></style>
<style src="./style.theme.GreenForest.css"></style>
```

## todo

- scoped style
- pre-processors
- post-processors
