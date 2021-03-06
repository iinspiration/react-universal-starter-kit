import config from 'shared/configs'
import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';
import ssr from './ssr';

import firebase from 'firebase';
import firebaseConfig from 'shared/configs/firebase'

firebase.initializeApp({
  ...firebaseConfig,
  serviceAccount: "src/server/serviceAccountCredentials.json",
  databaseAuthVariableOverride: {
    uid: "server-side-request"
  }
})

const app = express();
app.use(favicon(path.join(process.cwd(), 'static/favicon.ico')));
app.use(express.static(path.join(process.cwd(), 'static')));

app.use(ssr);

app.listen(config.port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Web server listening on ${config.host}:${config.port}`);
});