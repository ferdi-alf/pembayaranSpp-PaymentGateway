import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const TableDataSpp = ({ data, auth }) => {
    const downloadPDF = (data) => {
        const doc = new jsPDF();

        // Judul laporan
        doc.text("Laporan Pembayaran SPP", 14, 10);

        // Header tabel
        const tableColumn = [
            "No",
            "Nama",
            "NISN",
            "Kelas",
            "Nominal",
            "Periode",
            "Tanggal Pembayaran",
        ];

        // Data tabel
        const tableRows = data.map((item, index) => [
            index + 1,
            item.user_name,
            item.nisn,
            `${item.nama_kelas} ${item.jurusan}`,
            item.jumlah_bayar,
            item.bulan,
            new Date(item.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
            }),
        ]);

        // Tambahkan tabel ke PDF
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20, // Posisi awal tabel
        });

        // Simpan file PDF
        doc.save("Laporan_SPP.pdf");
    };

    return (
        <div className="relative">
            <div className="flex w-full justify-between">
                <p className="font-bold">History Pembayaran Spp</p>
                {auth.role === "admin" ? (
                    <button
                        type="button"
                        className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        onClick={() => downloadPDF(data)}
                    >
                        Download laporan PDF
                    </button>
                ) : (
                    ""
                )}
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            No
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Nama
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Nisn
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Kelas
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Nominal
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Periode
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Tanggal Pembayaran
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => (
                        <tr
                            key={i}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                            <td className="px-6 py-4">{i + 1}</td>
                            <td className="px-6 py-4">{item.user_name}</td>
                            <td className="px-6 py-4">{item.nisn}</td>
                            <td className="px-6 py-4">
                                {item.nama_kelas} {item.jurusan}
                            </td>
                            <td className="px-6 py-4">{item.jumlah_bayar}</td>
                            <td className="px-6 py-4">
                                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                                    {item.bulan}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                {new Date(item.created_at).toLocaleDateString(
                                    "id-ID",
                                    {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    }
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableDataSpp;
