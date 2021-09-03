/**
 * filter gender 性别
 */
export function flGender(val) {
    let map = {
        1: '男',
        2: '女',
		3: '保密',
    };
    if (!val) return '--';
    return map[Number(val)];
}