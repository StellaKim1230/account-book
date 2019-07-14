---
## Table of contents
1. General
2. Component
3. SCSS
4. Function
5. Redux
6. Etc
---

## 1. General
- Do not use semicolon.

## 2. Component
- ### import order
  ```javascript
  import React, { Component } from 'react' // react import.  
  import { Link } from 'react-router-dom' // import react related lib
  import { map } from 'lodash' // other lib
  
  import { withModal } from 'enhancers/withModal' // our lib
  
  // Container first
  import TestContainer from 'containers/TestContainer'
  // Component second
  import TestComponent from 'components/TestComponent'
  // last import scss file
  import './Test.scss'
  // other define variable
  const TestModal = withModal(Test)
  ```

- ### lifecycle method ordering
  ```javascript
  class Orange extends component<Props, State> {
    state = {}

    constructor(props: Props) {
      super(props)
    }
    static getDerivedStateFromProps() {}
    UNSAFE_componentWillMount() {}
    componentDidMount() {}
    UNSAFE_componentWillReceiveProps() {}
    shouldComponentUpdate() {}
    UNSAFE_componentWillUpdate() {}
    componentDidUpdate() {}
    componentWillUnmount() {}

    render()
  }
  ```
