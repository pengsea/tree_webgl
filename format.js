let dataReal;
const dataAll = [...(data1 ? data1.datas : {}), ...(data2 ? data2.datas : {}), ...(data3 ? data3.datas : {})];

//数组转树
function toTree(data) {
    let result = [];
    if (!Array.isArray(data)) {
        return result
    }

    let map = {};//所有行转为键值对
    data.forEach(item => {
        item.name = item.lastname;
        map[item.lastname] = item;
    });
    data.forEach(item => {
        if (item.manageridspan) {
            let parent = map[item.manageridspan];
            if (parent) {
                (parent.children || (parent.children = [])).push(item);
            } else {//父字段不为空字符串 但是找不到父条目
                let top = {name: item.manageridspan, children: [item]};
                map[item.manageridspan] = top;
                result.push(top);
            }
        } else {//父字段为空字符串
            result.push(item);
        }
    });
    return result;
}

if (dataAll) {
    dataReal = toTree(dataAll);
}
