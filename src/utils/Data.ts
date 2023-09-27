import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../db"

let weekDays = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export async function getActivity(){
    let allActivity = await db.activity.toArray()
    let day = new Date().getDay()
    let hour = new Date().getHours()
    let minute = new Date().getMinutes()

    if(allActivity.length == 0){
        weekDays.forEach(async(day, id) => {
            await db.activity.add({
                id : id,
                count: 0,
                day : day,
            })
        })
    }
}


export async function addActivity(){
    let day = new Date().getDay()
    let dayActivity = await db.activity.get(day)
    await db.activity.update(day, {
        count: dayActivity.count + 1
    })
}



// export const Data = [
//     {
//         id: 1,
//         year: 2016,
//         userGain: 80000,
//         userLost: 823
//     },
//     {
//         id: 2,
//         year: 2017,
//         userGain: 45677,
//         userLost: 345
//     },
//     {
//         id: 3,
//         year: 2018,
//         userGain: 78888,
//         userLost: 555
//     },
//     {
//         id: 4,
//         year: 2019,
//         userGain: 90000,
//         userLost: 4555
//     },
//     {
//         id: 5,
//         year: 2020,
//         userGain: 4300,
//         userLost: 234
//     }
// ]