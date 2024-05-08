import { BASENUMBER, MNUMBER, ANUMBER } from "$env/static/private"
import weapons from "$lib/data/weapons.json"

export async function load({fetch}){
    const c = parseInt(BASENUMBER) / 1000
    const day = Math.round(Date.now() / 86400000)
    let num = ((day * parseFloat(ANUMBER) + c) % parseFloat(MNUMBER))
    num = Math.round(num * 100000)
    num = num % Object.keys(weapons).length == 0 ? num : num % Object.keys(weapons).length
    

    return { weaponIndex: num, weapons: weapons, day: day}
}