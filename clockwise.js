'use strict'

let main = () => {
    try {
        // get current number
        let num = process.argv[2]
        checkNum(num)
        // num is string, need to parse
        drawClock(parseInt(num))
    } catch (error) {
        console.error(error)
    }
}

let drawClock = (num) => {
    const directions = {
        right: 0,
        down: 1,
        left: 2,
        up: 3,
    }

    let currentDirection = directions.right
    // 產生二維array，紀錄結果
    let recorder = [...Array(num)].map(_ => Array(num))

    // 移動座標
    let x = 0
    let y = 0

    const border = num - 1
    for (let index = 1; index <= num * num; index++) {
        recorder[y][x] = index
        switch (currentDirection) {
            case directions.right:
                if (x + 1 > border || recorder[y][x + 1] !== undefined) {
                    currentDirection = directions.down
                    y++
                    break
                }
                x++
                break
            case directions.down:
                if (y + 1 > border || recorder[y + 1][x] !== undefined) {
                    currentDirection = directions.left
                    x--
                    break
                }
                y++
                break
            case directions.left:
                if (x - 1 < 0 || recorder[y][x - 1] !== undefined) {
                    currentDirection = directions.up
                    y--
                    break
                }
                x--
                break
            case directions.up:
                if (y - 1 < 0 || recorder[y - 1][x] !== undefined) {
                    currentDirection = directions.right
                    x++
                    break
                }
                y--
                break
            default:
                break
        }
    }

    recorder.forEach(layer => {
        console.log(layer.join(' '))
    });
}

let checkNum = (num) => {
    if (!num.match(/^([1-9]|10)$/)) throw '請輸入1~10的整數數字'
}

main()