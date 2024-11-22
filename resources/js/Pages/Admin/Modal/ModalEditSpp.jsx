import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Box, Button, Modal, Typography } from "@mui/material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const ModalEditSpp = ({ item, onUpdate }) => {
    const [open, setOpen] = useState(false);
    const [alertSuccess, setAlertSuccess] = useState(false);

    // Initialize form data with props item
    const { data, setData, post } = useForm({
        id: item.id || "",
        bulan: item.bulan || "",
        nominal: item.nominal || "",
    });

    // Format uang dengan pemisah titik
    const formatCurrency = (val) => {
        if (typeof val !== "string") {
            val = val.toString(); // Jika bukan string, ubah menjadi string
        }
        let formattedValue = val.replace(/\D/g, ""); // Menghapus semua karakter selain angka
        formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Format menjadi ribuan

        return formattedValue;
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setData("nominal", value.replace(/\D/g, "")); // Set value tanpa format
    };

    // Set data modal ketika modal dibuka
    const handleOpen = () => {
        setData({
            id: item.id,
            bulan: item.bulan,
            nominal: item.nominal,
        });
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/update-spp/${item.id}`, {
            onSuccess: (response) => {
                console.log("Success response:", response); // Cek respon yang diterima
                onUpdate(data);
                setAlertSuccess(true);
                setTimeout(() => setAlertSuccess(false), 3000);
            },

            onError: (err) => {
                console.error("Error updating data:", err);
            },
        });
    };

    return (
        <div>
            <button
                onClick={handleOpen}
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
                Edit
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Edit SPP
                    </Typography>
                    {alertSuccess && (
                        <div className="mt-4 p-2 text-green-700 bg-green-100 border border-green-500 rounded">
                            Data Spp berhasil dipupdate!
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <label
                                htmlFor="nominal"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Nominal
                            </label>
                            <input
                                type="text"
                                id="nominal"
                                value={formatCurrency(data.nominal)}
                                onChange={handleInputChange}
                                className="block w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="bulan"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Pilih Bulan untuk SPP
                            </label>
                            <select
                                id="bulan"
                                value={data.bulan}
                                onChange={(e) =>
                                    setData("bulan", e.target.value)
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="August">August</option>
                                <option value="September">September</option>
                                <option value="October">October</option>
                                <option value="November">November</option>
                                <option value="December">December</option>
                            </select>
                        </div>

                        <div className="mt-4 flex justify-end">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Simpan
                            </button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default ModalEditSpp;
