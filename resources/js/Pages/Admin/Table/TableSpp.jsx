import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import ModalEditSpp from "../Modal/ModalEditSpp";
import ModalDetail from "../Modal/ModalDetail";

const TableSpp = ({ dataSpp, auth }) => {
    const handleDelete = (id) => {
        router.delete(`/spp/${id}`);
    };

    const authen = usePage().props.auth.user;

    const handleUpdate = (id, updatedUser) => {
        console.log("Updating user with ID:", id);
        console.log("Updated user:", updatedUser);

        const updatedData = dataSpp.map((item) =>
            item.id === id ? { ...item, ...updatedUser } : item
        );
    };

    const handleBayar = (id, nominal, id_user, name, no_telp, bulan) => {
        console.log("Memulai pembayaran untuk:", name);

        if (!id || !nominal || !id_user || !name || !no_telp || !bulan) {
            console.error("Parameter pembayaran tidak lengkap!");
            alert("Gagal memproses pembayaran, data tidak lengkap.");
            return;
        }

        const csrfToken = document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content");
        if (!csrfToken) {
            console.error("CSRF token tidak ditemukan!");
            alert(
                "Terjadi kesalahan pada otorisasi. Silakan muat ulang halaman."
            );
            return;
        }

        fetch("/spp/bayar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken,
            },
            body: JSON.stringify({
                id_spp: id,
                amount: nominal,
                user_name: name,
                user_phone: no_telp,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Respons dari server:", data);

                if (!data.snapToken) {
                    console.error("Snap Token tidak ditemukan:", data);
                    alert("Gagal mendapatkan Snap Token. Silakan coba lagi.");
                    return;
                }

                console.log("Snap Token:", data.snapToken);

                if (!window.snap) {
                    console.error("Midtrans Snap belum terinisialisasi!");
                    alert(
                        "Terjadi kesalahan pada pembayaran. Silakan muat ulang halaman."
                    );
                    return;
                }

                window.snap.pay(data.snapToken, {
                    onSuccess: function (result) {
                        console.log("Pembayaran Berhasil:", result);
                        alert("Pembayaran Berhasil!");

                        router.post("/pembayaran-berhasil", {
                            payment_id: result.transaction_id,
                            user_id: id_user,
                            id_spp: id,
                            jumlah_pembayaran: nominal,
                            bulan: bulan,
                        });
                    },
                    onPending: function (result) {
                        console.log("Pembayaran Pending:", result);
                        alert("Pembayaran dalam proses!");
                    },
                    onError: function (result) {
                        console.error("Kesalahan Pembayaran:", result);
                        alert("Terjadi kesalahan!");
                    },
                    onClose: function () {
                        console.log("Popup pembayaran ditutup.");
                        alert("Popup pembayaran ditutup.");
                    },
                });
            })
            .catch((error) => {
                console.error("Error saat mengirim permintaan:", error);
                alert("Terjadi kesalahan. Silakan coba lagi.");
            });
    };

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            No
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Bulan
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Nominal
                        </th>
                        {auth === "user" ? (
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                        ) : (
                            ""
                        )}
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {dataSpp.map((item, i) => (
                        <tr
                            key={i}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                            <td className="px-6 py-4">{i + 1}</td>
                            <td className="px-6 py-4">
                                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                                    {item.bulan}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                {item.nominal.toLocaleString("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                })}
                            </td>

                            {auth === "user" ? (
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium ${
                                            item.status === "Lunas"
                                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                        }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                            ) : (
                                ""
                            )}
                            {auth === "user" ? (
                                item.status === "Lunas" ? (
                                    // Jika status pembayaran sudah lunas, tampilkan tombol Detail
                                    <ModalDetail
                                        data={{
                                            bulan: item.bulan,
                                            nominal: item.nominal,
                                            nama: authen.name,
                                        }}
                                    />
                                ) : (
                                    // Jika status pembayaran belum lunas, tampilkan tombol Bayar
                                    <button
                                        onClick={() =>
                                            handleBayar(
                                                item.id,
                                                item.nominal,
                                                authen.id,
                                                authen.name,
                                                authen.no_telp,
                                                item.bulan
                                            )
                                        }
                                        type="button"
                                        className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                    >
                                        Bayar
                                    </button>
                                )
                            ) : (
                                ""
                            )}

                            {auth !== "user" ? (
                                <td className="px-3 flex flex-nowrap py-4">
                                    <ModalEditSpp
                                        item={item}
                                        onUpdate={(updatedSpp) =>
                                            handleUpdate(item.id, updatedSpp)
                                        }
                                    />
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        type="button"
                                        className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            ) : (
                                ""
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableSpp;
