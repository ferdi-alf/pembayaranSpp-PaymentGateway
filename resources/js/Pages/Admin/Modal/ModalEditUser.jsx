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

const ModalEditUser = ({ user, onUpdate }) => {
    const [open, setOpen] = React.useState(false);
    const [alertSuccess, setAlertSuccess] = React.useState(false);
    const { data, setData, post } = useForm({
        username: "",
        namaPetugas: "",
        role: "",
        password: "",
    });

    // Set data ke state setiap kali modal dibuka
    const handleOpen = () => {
        setData({
            id: user.id,
            username: user.username || "",
            namaPetugas: user.nama_petugas || "",
            role: user.role || "",
            password: "", // Kosongkan password untuk alasan keamanan
        });
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/update-petugas/${user.id}`, {
            onSuccess: () => {
                onUpdate(data);
                setAlertSuccess(true); // Menampilkan alert sukses
                setTimeout(() => setAlertSuccess(false), 3000); // Sembunyikan setelah 3 detik
            },
            onError: (err) => {
                console.error("Error updating petugas:", err);
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
                        Edit User
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
                                Username
                            </label>
                            <input
                                type="text"
                                value={data.username}
                                onChange={(e) =>
                                    setData((prev) => ({
                                        ...prev,
                                        username: e.target.value,
                                    }))
                                }
                                className="block w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="namaPetugas"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Nama Petugas
                            </label>
                            <input
                                type="text"
                                value={data.namaPetugas}
                                defaultValue={data.nama_petugas}
                                onChange={(e) =>
                                    setData((prev) => ({
                                        ...prev,
                                        namaPetugas: e.target.value,
                                    }))
                                }
                                className="block w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="role"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Role
                            </label>
                            <select
                                value={data.role}
                                onChange={(e) =>
                                    setData((prev) => ({
                                        ...prev,
                                        role: e.target.value,
                                    }))
                                }
                                className="block w-full p-2 border rounded"
                            >
                                <option value="">Pilih Role</option>
                                <option value="admin">Admin</option>
                                <option value="petugas">Petugas</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData((prev) => ({
                                        ...prev,
                                        password: e.target.value,
                                    }))
                                }
                                className="block w-full p-2 border rounded"
                            />
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

export default ModalEditUser;
