import { router } from "@inertiajs/react";
import ModalEditUser from "../Modal/ModalEditUser";

const TablePetugas = ({ data }) => {
    console.log(data);

    const handleDelete = (id) => {
        router.delete(`/petugas/${id}`);
    };

    const handleUpdate = (id, updatedUser) => {
        console.log("Updating user with ID:", id);
        console.log("Updated user:", updatedUser);

        const updatedData = data.map((user) =>
            user.id === id ? { ...user, ...updatedUser } : user
        );
    };

    return (
        <div class="relative ">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            No
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Username
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Nama
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Role
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((data, i) => (
                        <tr
                            key={i}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                            <td className="px-6 py-4">{i + 1}</td>
                            <td className="px-6 py-4">{data.username}</td>
                            <td className="px-6 py-4">{data.nama_petugas}</td>
                            <td className="px-6 py-4">
                                <span class="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                                    {data.role}
                                </span>
                            </td>
                            <td className="px-3 flex flex-nowrap py-4">
                                <ModalEditUser
                                    user={data}
                                    onUpdate={(updatedUser) =>
                                        handleUpdate(data.id, updatedUser)
                                    }
                                />
                                <button
                                    onClick={() => handleDelete(data.id)}
                                    type="button"
                                    class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TablePetugas;
