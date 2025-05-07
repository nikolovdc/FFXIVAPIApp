jest.mock('../../../database/db');
jest.mock('../../utils/queryUtils'); // Mock the passQuery module
const { passQuery } = require('../../utils/queryUtils');
const { insertTaskItem,
    checkIfTasklistExist,
    fetchTaskItems,
    sortItems,
    deleteItem,
    editItemDescription,
    editItemDueDate,
    completeItem } = require('../taskHelpers');

/**
 * TEST createIfTasklistExist
 */
test('should return user tasklist id', async () => {
    const mockData1 = [{ user_id: 1, list_id: 12 }];
    await passQuery.mockResolvedValue(mockData1);

    const list_id = await checkIfTasklistExist(1);
    expect(passQuery).toHaveBeenCalledWith(
        'SELECT * FROM tasklist WHERE user_id = ?', [1]);

    expect(list_id).toEqual(12);
});

test('should return false', async () => {
    await passQuery.mockResolvedValue([]);

    const result = await checkIfTasklistExist(1);
    expect(passQuery).toHaveBeenCalledWith(
        'SELECT * FROM tasklist WHERE user_id = ?', [1]
    );

    expect(result).toEqual(false);
});