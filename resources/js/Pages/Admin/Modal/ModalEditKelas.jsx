import React from "react";
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

const ModalEditKelas = ({ kelas, onUpdate }) => {
    const [open, setOpen] = React.useState(false);
    const [alertSuccess, setAlertSuccess] = React.useState(false);
    const { data, setData, post } = useForm({
        jurusan: "",
        tingkat: "",
    });

    const handleOpen = () => {
        setData({
            id: kelas.id,
            tingkat: kelas.tingkat || "",
            jurusan: kelas.jurusan || "",
        });
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/update-kelas/${kelas.id}`, {
            onSuccess: () => {
                onUpdate(data);
                setAlertSuccess(true); // Menampilkan alert sukses
                setTimeout(() => setAlertSuccess(false), 3000); // Sembunyikan setelah 3 detik
            },
            onError: (err) => {
                console.error("Error updating Kelas:", err);
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
                        Edit Kelas
                    </Typography>
                    {alertSuccess && (
                        <div className="mt-4 p-2 text-green-700 bg-green-100 border border-green-500 rounded">
                            Data berhasil dipupdate!
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <label
                                htmlFor="username"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Jurusan
                            </label>
                            <input
                                type="text"
                                value={data.jurusan}
                                onChange={(e) =>
                                    setData((prev) => ({
                                        ...prev,
                                        jurusan: e.target.value,
                                    }))
                                }
                                className="block w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="bulan"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Pilih Tingkat
                            </label>
                            <select
                                id="bulan"
                                value={data.bulan}
                                onChange={(e) =>
                                    setData("bulan", e.target.value)
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="X">X</option>
                                <option value="XI">XI</option>
                                <option value="XII">XII</option>
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

export default ModalEditKelas;
