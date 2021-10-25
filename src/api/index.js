import { firebase } from './config'

export function storeTask(task) {
    firebase.database().ref('tasks/').set(task)
}

export function indexTask(setTask) {
    firebase.database().ref('tasks/').on('value', (snapshot) => {
        const tasks = snapshot.val();
        (tasks === null) ? setTask([]) : setTask(tasks)
    })
}