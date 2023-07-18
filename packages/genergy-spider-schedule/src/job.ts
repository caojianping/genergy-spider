import schedule from 'node-schedule';

export default function job(rules: any, callback: any) {
    let scheduleRule = new schedule.RecurrenceRule();
    for (let key in rules) {
        scheduleRule[key] = rules[key];
    }
    schedule.scheduleJob(scheduleRule, (fireDate: Date) => {
        if (callback) callback.apply(this, arguments);
    });
}
