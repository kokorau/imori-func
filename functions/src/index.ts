import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const app = admin.initializeApp()
const db = app.firestore()

export const onAccountCreate = functions.auth.user().onCreate(user => {
 db.collection('users').doc(user.uid).set({
  displayName: user.displayName
 })
})
