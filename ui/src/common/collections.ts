export class Collections {
    numbers: any;
    countries: any;

    generateIntNumbers(N): any {
        return Array.apply(0, new Array(N)).map(function (_, i) { return i + 1 });
    }
    generateFloorNumbers(N): any {
        let counter = 0;
        let arr : any = [];
        arr.push(0);
        for (var k = 0; k <= N; k++) {
            for (var j = 0; j < 10; j++) {
                counter = Math.round((counter + 0.1) * 10) / 10;
                arr.push(counter);
            }
        }
        return arr;
    }
}