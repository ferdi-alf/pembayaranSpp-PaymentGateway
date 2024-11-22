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

const ModalEditSiswa = ({ siswa, onUpdate, dataKelas }) => {
    console.log("siswa", siswa);
    const [open, setOpen] = React.useState(false);
    const [alertSuccess, setAlertSuccess] = React.useState(false);
    const { data, setData, post } = useForm({
        name: "",
        nisn: "",
        nis: "",
        kelas: "",
        alamat: "",
        no_telp: "",
        password: "",
    });

    // Set data ke state setiap kali modal dibuka
    const handleOpen = () => {
        setData({
            id: siswa.id,
            name: siswa.name || "",
            nisn: siswa.nisn || "",
            nis: siswa.nis || "",
            kelas: siswa.id_kelas || "",
            alamat: siswa.alamat || "",
            no_telp: siswa.no_telp || "",
            password: "",
        });
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/update-siswa/${siswa.id}`, {
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
                    <div className="overflow-y-auto h-[80vh]">
                        <label
                            for="small-input"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Nama
                        </label>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData((prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                    }))
                                }
                                id="small-input"
                                class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />

                            <div class="mt-2 ">
                                <label
                                    for="small-input"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Nisn
                                </label>
                                <input
                                    type="text"
                                    value={data.nisn}
                                    onChange={(e) =>
                                        setData((prev) => ({
                                            ...prev,
                                            nisn: e.target.value,
                                        }))
                                    }
                                    id="small-input"
                                    class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div class="mt-2 ">
                                <label
                                    for="small-input"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Nis
                                </label>
                                <input
                                    type="text"
                                    value={data.nis}
                                    onChange={(e) =>
                                        setData((prev) => ({
                                            ...prev,
                                            nis: e.target.value,
                                        }))
                                    }
                                    id="small-input"
                                    class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>

                            <div class="mt-2 ">
                                <label
                                    for="countries"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Pilih Kelas Siswa
                                </label>
                                <select
                                    value={data.kelas}
                                    onChange={(e) =>
                                        setData((prev) => ({
                                            ...prev,
                                            kelas: e.target.value,
                                        }))
                                    }
                                    id="countries"
                                    class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option selected>Pilih Kelas</option>
                                    {dataKelas.map((data) => (
                                        <option value={data.id}>
                                            {data.nama_kelas} {data.jurusan}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div class="mt-2 ">
                                <label
                                    for="message"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Alamat
                                </label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    value={data.alamat}
                                    onChange={(e) =>
                                        setData("alamat", e.target.value)
                                    }
                                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Write your thoughts here..."
                                ></textarea>
                            </div>

                            <div class="mt-2 ">
                                <label
                                    for="small-input"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    No Telp
                                </label>
                                <input
                                    type="text"
                                    value={data.no_telp}
                                    onChange={(e) =>
                                        setData((prev) => ({
                                            ...prev,
                                            no_telp: e.target.value,
                                        }))
                                    }
                                    id="small-input"
                                    class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>

                            <div class="mt-2 ">
                                <label
                                    for="small-input"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                                    id="small-input"
                                    class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>

                            <div className="w-full mt-2 flex justify-end">
                                <button
                                    type="submit"
                                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default ModalEditSiswa;
