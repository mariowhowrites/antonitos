export default function ProductForm({ product }) {
    return (
        <div
            className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start"
        >
            <section aria-labelledby="options-heading">
                <h2 id="options-heading" className="sr-only">Product options</h2>

                <div className="sm:flex sm:justify-between mt-4">
                    {/* Size selector */}
                    <fieldset>
                        <legend className="block text-sm font-medium text-gray-700"
                        >Quantity</legend
                        >
                        <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {/* <!-- Active: "ring-2 ring-indigo-500" --> */}
                            <div
                                aria-label="18L"
                                aria-description="Perfect for a reasonable amount of snacks."
                                className="relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none"
                            >
                                <input
                                    type="radio"
                                    name="size-choice"
                                    value="18L"
                                    className="sr-only"
                                />
                                <p className="text-base font-medium text-gray-900">
                                    18L
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    Perfect for a reasonable amount of snacks.
                                </p>
                                {/* <!--
                            Active: "border", Not Active: "border-2"
                            Checked: "border-indigo-500", Not Checked: "border-transparent"
                      --> */}
                                <div
                                    className="pointer-events-none absolute -inset-px rounded-lg border-2"
                                    aria-hidden="true"
                                >
                                </div>
                            </div>
                            {/* <!-- Active: "ring-2 ring-indigo-500" --> */}
                            <div
                                aria-label="20L"
                                aria-description="Enough room for a serious amount of snacks."
                                className="relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none"
                            >
                                <input
                                    type="radio"
                                    name="size-choice"
                                    value="20L"
                                    className="sr-only"
                                />
                                <p className="text-base font-medium text-gray-900">
                                    20L
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    Enough room for a serious amount of snacks.
                                </p>
                                {/* <!--
                            Active: "border", Not Active: "border-2"
                            Checked: "border-indigo-500", Not Checked: "border-transparent"
                      --> */}
                                <div
                                    className="pointer-events-none absolute -inset-px rounded-lg border-2"
                                    aria-hidden="true"
                                >
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div className="mt-10">
                    <button
                        id="checkout-button"
                        type="submit"
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-antonito-red px-8 py-3 text-base font-bold text-white hover:bg-antonito-tan focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                        data-product-price={product.default_price.id}
                    >
                        Get the Sauce
                    </button>
                    <p id="checkout-message" className="mt-2 text-sm text-center">
                    </p>
                </div>
                <div className="mt-6 text-center">
                    <a href="#" className="group inline-flex text-base font-medium">
                        <svg
                            className="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                            ></path>
                        </svg>
                        <span className="text-gray-200 hover:text-gray-400"
                        >Really Good Guarantee</span
                        >
                    </a>
                </div>
            </section>
        </div>
    )
}