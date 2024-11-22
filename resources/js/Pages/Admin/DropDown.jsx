import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { router } from "@inertiajs/react";

const Dropdown = () => {
    // State untuk mengontrol apakah menu terbuka atau tidak
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // Fungsi untuk menangani klik tombol
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Fungsi untuk menutup menu
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        router.post("/admin/logout");
    };

    return (
        <div className="fle relative items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
                id="dropdownButton"
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                onClick={handleClick} // Menambahkan handler klik
            >
                <span className="sr-only">Open user menu</span>
                <img
                    className="w-8 h-8 rounded-full"
                    src="https://vectorified.com/images/no-profile-picture-icon-24.jpg"
                    alt="user photo"
                />
            </button>

            {/* Komponen Menu dari Material-UI */}
            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "dropdownButton",
                }}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
};

export default Dropdown;
