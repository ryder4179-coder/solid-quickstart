import { createSignal } from "solid-js";

export default function Calculator() {
  const [productCost, setProductCost] = createSignal("");
  const [shippingCost, setShippingCost] = createSignal("");
  const [fees, setFees] = createSignal("");
  const [adCost, setAdCost] = createSignal("");
  const [margin, setMargin] = createSignal("");
  const [result, setResult] = createSignal<{ price: number; profit: number } | null>(null);
  const [error, setError] = createSignal("");

  function calculate() {
    const product = parseFloat(productCost()) || 0;
    const shipping = parseFloat(shippingCost()) || 0;
    const fee = parseFloat(fees()) || 0;
    const ad = parseFloat(adCost()) || 0;
    const marginPercent = (parseFloat(margin()) || 0) / 100;

    const totalCost = product + shipping + fee + ad;

    if (marginPercent >= 1) {
      setError("Margin must be less than 100%");
      setResult(null);
      return;
    }

    setError("");
    const price = totalCost / (1 - marginPercent);
    const profit = price - totalCost;
    setResult({ price, profit });
  }

  return (
    <section class="bg-slate-200 text-slate-700 p-8 rounded-md">
      <h2 class="text-2xl text-center mb-6">Dropshipping Price Calculator</h2>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Product Cost ($)</label>
          <input
            type="number"
            class="w-full p-2 rounded-md border border-slate-300 bg-white"
            placeholder="e.g. 12"
            value={productCost()}
            onInput={(e) => setProductCost(e.currentTarget.value)}
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Shipping Cost ($)</label>
          <input
            type="number"
            class="w-full p-2 rounded-md border border-slate-300 bg-white"
            placeholder="e.g. 3"
            value={shippingCost()}
            onInput={(e) => setShippingCost(e.currentTarget.value)}
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Platform/Payment Fees ($)</label>
          <input
            type="number"
            class="w-full p-2 rounded-md border border-slate-300 bg-white"
            placeholder="e.g. 2"
            value={fees()}
            onInput={(e) => setFees(e.currentTarget.value)}
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Ad Cost per Sale ($)</label>
          <input
            type="number"
            class="w-full p-2 rounded-md border border-slate-300 bg-white"
            placeholder="e.g. 10"
            value={adCost()}
            onInput={(e) => setAdCost(e.currentTarget.value)}
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Desired Profit Margin (%)</label>
          <input
            type="number"
            class="w-full p-2 rounded-md border border-slate-300 bg-white"
            placeholder="e.g. 30"
            value={margin()}
            onInput={(e) => setMargin(e.currentTarget.value)}
          />
        </div>

        <button
          type="button"
          class="w-full p-3 bg-slate-900 text-white rounded-md cursor-pointer text-base hover:bg-slate-800"
          onClick={calculate}
        >
          Calculate Price
        </button>

        {error() && (
          <div class="mt-4 text-lg font-bold text-red-600">{error()}</div>
        )}

        {result() && (
          <div class="mt-4 text-lg font-bold">
            <p>Recommended Selling Price: ${result()!.price.toFixed(2)}</p>
            <p class="mt-1">Expected Profit per Sale: ${result()!.profit.toFixed(2)}</p>
          </div>
        )}
      </div>
    </section>
  );
}
