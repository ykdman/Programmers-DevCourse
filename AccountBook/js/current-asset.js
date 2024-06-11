const $currentAssetInput = document.querySelector(".current-asset-input");
const $currentAssetValue = document.querySelector(".current-asset-value");
const $currentAssetButton = document.querySelector(".current-asset-button");
const $addItemButton = document.querySelector(".add-item-button");

export function renderCurrentAsset() {
  $currentAssetValue.textContent =
    store.currentFunds?.toLocaleString("ko") ?? "-";
  $currentAssetInput.value = store.currentFunds;
}
