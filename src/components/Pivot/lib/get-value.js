export default function getValue(dimension, row) {
    let val;

    if (dimension == null) return null;

    if (typeof dimension.value === 'string') {
        val = row[dimension.value];
    } else {
        val = dimension.value(row);
    }
    return val;
}
