async function worker(id ,generator, mapFn, result) {
    for (let [ currentValue, index, array ] of generator) {
        const currentProgress = (index/array.length*100).toFixed(0);
        if(currentProgress % 5 == 0 && id == 0)
            console.log(`Scraping... ${currentProgress}%`)
        result[index] = await mapItem(mapFn, currentValue, index, array)
    }
}

async function mapAllSettled(arr, mapFn, limit = arr.length) {
    const result = []

    if (arr.length === 0) {
        return result
    }

    const generator = arrayGenerator(arr)

    limit = Math.min(limit, arr.length)
    
    const workers = new Array(limit)
    for (let i = 0; i < limit; i++) {
        workers.push(worker( i,generator, mapFn, result))
    }

    await Promise.all(workers)

    return result
}

async function mapItem(mapFn, currentValue, index, array) {
    try {
        return {
            status: 'fulfilled',
            value: await mapFn(currentValue, index, array)
        }
    } catch (reason) {
        return {
            status: 'rejected',
            reason
        }
    }
}

function* arrayGenerator(array){
    for (let index = 0; index < array.length; index++) {
        const currentValue = array[index]
        yield [ currentValue, index, array ]
    }
}

exports.mapAllSettled = mapAllSettled;