import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

const app = admin.initializeApp()
const db = app.firestore()

export const onAccountCreate = functions.auth.user().onCreate(user => {
    db.collection('users').doc(user.uid).set({
        displayName: user.displayName
    })
})

export const onEventCreate = functions.firestore.document('events/{eventId}').onCreate((snapshot, context) => {
    const userId = context.auth.uid
    snapshot.ref.set({
        createdAt: context.timestamp,
        staff: [
            {
                userRef: db.collection(`users/${userId}`),
                role: 'owner'
            }
        ]
    }, { merge: true })
})
