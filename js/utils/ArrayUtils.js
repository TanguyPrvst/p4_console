class ArrayUtils{

    static forEach(array, callback){
        if(this.isArray(array) && array.length > 0){
            for(let index in array) {
                if(callback( array[index], index ) !== undefined) { break; }
            }
        }
    }

    static isArray(array) { return array instanceof Array; }
}