export function localize(value, language) {
    if (value == null) return '';
    if (typeof value === 'object' && !Array.isArray(value)) {
        if (
            Object.prototype.hasOwnProperty.call(value, language) ||
            Object.prototype.hasOwnProperty.call(value, 'en') ||
            Object.prototype.hasOwnProperty.call(value, 'sq')
        ) {
            return value[language] ?? value.en ?? value.sq ?? '';
        }
    }
    return value;
}
