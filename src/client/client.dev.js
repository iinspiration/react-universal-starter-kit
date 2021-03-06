import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import createStore from 'shared/store/createStore';
import Root from 'shared/Root';

import firebase from 'firebase'
import firebaseConfig from 'shared/configs/firebase'
import { FirebaseAPI } from 'shared/utils/firebaseUtils'
import { logOut } from 'shared/modules/auth/authActions'

firebase.initializeApp(firebaseConfig)

const initialState = window.__INITIAL_STATE__
const store = createStore(browserHistory, initialState);
const mountNode = document.getElementById('root');

FirebaseAPI.initAuth()
  .then((user) => {

    if (user === null) {
      store.dispatch(logOut())
    }

    render(
      <AppContainer>
        <Root store={store} />
      </AppContainer>,
      mountNode
    );

    if (module.hot) {
      module.hot.accept('shared/Root', () => {
        const NextRootApp = require('shared/Root').default;

        render(
          <AppContainer>
            <NextRootApp store={store} />
          </AppContainer>,
          mountNode
        );
      });
    }
  })
  .catch((error) => {
    console.log(error)
  })