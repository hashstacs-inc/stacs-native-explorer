const filter = {
    'thousandsFilter': function (val) {
        if (typeof (val) === 'number') {
            let intPart = Number(val) | 0;
            let floatPart;
            let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
            if (val.toString().indexOf('.') !== -1) {
                floatPart = val.toString().split('.')[1];
                return intPartFormat + "." + floatPart;
            }else{
                return intPartFormat
            }
            
        }
    }
}
export default filter
