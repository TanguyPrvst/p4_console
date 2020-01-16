//@Static Class
class MathHelper {
    static random(min, max) {
        let output = 0;
        if(MathHelper.isNumber(min) && MathHelper.isNumber(max)) {
            output = min + (Math.random() * max);
        }
        return output;
    }

    static isNumber(arg) { return typeof(arg) === 'number'; }
}