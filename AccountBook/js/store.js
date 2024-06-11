export const store = {
  currentFunds: 0,
  isFirstEdit: true,
  todayId: 1,
  dateList: [{ id: 1, date: new Date().toLocaleString() }],
  detailList: [],
};

export function updateStorage() {
  sessionStorage.setItem("store", JSON.stringify(store));
}

export function initStore() {
  const storage = sessionStorage.getItem("store");
  if (!storage) updateStorage();

  const { dateList, detailList, todayId, currentFunds, isFirstEdit } =
    JSON.parse(storage);
  store.currentFunds = currentFunds;
  store.isFirstEdit = isFirstEdit;
  store.dateList = dateList;
  store.detailList = detailList;
  store.todayId = todayId;
}

export function addNewHistory(newHistory) {
  try {
    if (store.detailList[store.todayId]) {
      store.detailList[store.todayId] =
        store.detailList[store.todayId].push(newHistory);
    } else {
      store.detailList[store.todayId] = [newHistory];
    }

    // 현재자산 - amount
    store.currentFunds -= newHistory.amount;
    updateStorage();
    return true;
  } catch (err) {
    alert(err);
    return false;
  }
}

export function removeHistory(dateId, itemId) {
  try {
    store.detailList[dateId] = store.detailList[dateId].filter(
      ({ id, amount }) => {
        if (id === +itemId) {
          store.currentFunds += amount;
        }
        return id !== +itemId;
      }
    );

    updateStorage();
    return true;
  } catch (err) {
    alert(err);
    return false;
  }
}
