function formatNumber(num: number|undefined) {
    if (num === undefined) {
        return 0;
    }

    if(isNaN(num)) {
        return 0;
    }

    return num.toLocaleString('vn-VN');
}

export default formatNumber;