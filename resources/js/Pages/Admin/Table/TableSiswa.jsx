import { router } from "@inertiajs/react";
import ModalEditUser from "../Modal/ModalEditUser";
import ModalEditSiswa from "../Modal/ModalEditSiswa";

const TableSiswa = ({ data, dataKelas }) => {
    console.log("ini data", data);

    const handleDelete = (id) => {
        router.delete(`/siswa/${id}`);
    };

    const handleUpdate = (id, updatedUser) => {
        console.log("Updating user with ID:", id);
        console.log("Updated user:", updatedUser);

        const updatedData = data.map((user) =>
            user.id === id ? { ...user, ...updatedUser } : user
        );
    };

    return (
        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            No
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Nama
                        </th>

                        <th scope="col" class="px-6 py-3">
                            Nis
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Kelas
                        </th>

                        <th scope="col" class="px-6 py-3">
                            No Tlp
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((siswa, i) => {
                        const kelas = dataKelas.find(
                            (kelas) => kelas.id === siswa.id_kelas
                        );

                        console.log("hello", siswa.no_tlp);

                        return (
                            <tr
                                key={siswa.id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <td className="px-6 py-4">{i + 1}</td>
                                <td className="px-6 py-4">{siswa.name}</td>
                                <td className="px-6 py-4">{siswa.nis}</td>
                                <td className="px-6 py-4">
                                    <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                                        {kelas
                                            ? `${kelas.nama_kelas} - ${kelas.jurusan}`
                                            : "Kelas Tidak Ditemukan"}
                                    </span>
                                </td>

                                <td className="px-6 py-4">{siswa.no_telp}</td>

                                <td className="px-6  flex flex-nowrap py-4">
                                    <ModalEditSiswa
                                        siswa={siswa}
                                        dataKelas={dataKelas}
                                        onUpdate={(updatedUser) =>
                                            handleUpdate(siswa.id, updatedUser)
                                        }
                                    />
                                    <button
                                        onClick={() => handleDelete(siswa.id)}
                                        type="button"
                                        className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TableSiswa;
