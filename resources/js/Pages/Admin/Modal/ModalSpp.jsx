import { useForm } from "@inertiajs/react";
import { useState } from "react";

const ModalSpp = () => {
    const [uangValue, setUangValue] = useState("");
    const { data, setData, post, reset } = useForm({
        harga: "",
        bulan: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("store.spp"));
    };

    const formatCurrency = (val) => {
        let formattedValue = val.replace(/\D/g, "");

        formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return formattedValue;
    };

    // Fungsi untuk menangani perubahan input
    const handleInputChange = (e) => {
        const value = e.target.value;
        // Set nilai terformat pada state untuk ditampilkan
        setUangValue(formatCurrency(value));
        // Set nilai tanpa format ke form data
        setData("harga", value.replace(/\D/g, ""));
    };
    return (
        <div>
            <label
                for="small-input"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                Masukan nominal bayaran spp
            </label>
            <form onSubmit={submit}>
                <input
                    type="text"
                    value={uangValue}
                    onChange={handleInputChange}
                    id="small-input"
                    class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />

                <div class="mt-3 ">
                    <label
                        for="countries"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Pilih bulan untuk spp
                    </label>
                    <select
                        value={data.bulan}
                        onChange={(e) => setData("bulan", e.target.value)}
                        id="countries"
                        class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option selected>Pilih Bulan Spp</option>
                        <option value="January">January</option>
                        <option value="Febuary">Febuary</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="July">July</option>
                        <option value="Juny">Juny</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>
                </div>

                <div className="w-full mt-3 flex justify-end">
                    <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ModalSpp;
