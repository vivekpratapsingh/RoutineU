export class Collections {
    static numbers: any;
    static countries: any;
    static ActivityLevel :any  = [
        {level :"Not Very Active",description : "Spend most of the day sitting(e.g. bank teller,desk job)",multiplier : 1.1},
        {level :"Lightly Active",description : "Spend a good part of the day on your feet (e.g. teacher,salesperson)",multiplier : 1.275},
        {level : "Active",description : "Spend part of the day doing some physical activity(e.g. food server,postal carrier)",multiplier : 1.55},
        {level :"Very Active",description :"Spend most of the day doing heavy physical activity (e.g. bike,messanger,carpenter)",multiplier : 1.75}
    ];

    static WeeklyGoal :any = [
        {goal : 'Lose 1 kg per week',calorie_surplus : 1200,sign : '-'},
        {goal : 'Lose 0.75 kg per week',calorie_surplus : 900,sign : '-'},
        {goal : 'Lose 0.5 kg per week',calorie_surplus : 600,sign : '-'},
        {goal : 'Lose 0.25 kg per week',calorie_surplus : 300,sign : '-'},
        {goal : 'Maintain my current weight',calorie_surplus : 0,sign : '+'},
        {goal : 'Gain 0.25 kg per week',calorie_surplus : 300,sign : '+'},
        {goal : 'Gain 0.5 kg per week',calorie_surplus : 600,sign : '+'}
    ];

    static generateIntNumbers(N): any {
        return Array.apply(0, new Array(N)).map(function (_, i) { return i + 1 });
    }
    static generateFloorNumbers(N): any {
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
    static getActivityLevel() : any{
        return this.ActivityLevel;
    }

    static Muscles : any = [
        "Calves","Quadriceps","Hamstrings","Gluteus","Hips other","Lower back","Lats","Trapezius","Abdominals","Pectorals",
        "Deltoids","Triceps","Biceps","Forearms"
    ];

    static Equipments : any = [
        "Dumbbell","Barbell","Smith Machine","Bench Press Machine","Body weight","Standing Calf Raise Machine","Kettlebells",
        "Leg Press Machine","Hack Squat Machine","Trapbar","Cable Machine","Leg Extension Machine","Leg Curl Machine","Seated Calf Raise Machine",
        "Pulldown Machine","Chin-up Bar","Chin-up Machine","T-bar Machine","Lateral Raise Machine","Triceps Extension Machine","Crunch Machine",
        "Back Extension Machine"
    ];
}