/**
 *
 * Jest测试
 *
 */



test('test common matcher', () => {
    //
    expect(2 + 2).toBe(4);

    expect(2 + 2).not.toBe(5);
})

/**
 *
 * 布尔类型测试
 *
 */
test('test to be true or false', () => {

    // 是否为true
    expect(1).toBeTruthy();

    expect(0).toBeFalsy();
    // 是否为false
    expect(undefined).toBeFalsy();
    expect(null).toBeFalsy();
})


/**
 * 数值类型测试
 */

test('test number', () => {
    // 大于
    expect(4).toBeGreaterThan(3);
    // 小于
    expect(5).toBeLessThan(6);
})

/**
 *
 * 测试对象
 *
 */
test('test object', () => {
    // toBe()是完全相等
    // 如果我们只想测试内容相等，使用toEqual()
    expect({name: 'viking'}).toEqual({name: 'viking'});
})
