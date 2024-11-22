import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ModalSpp from "./Modal/ModalSpp";
import TableSpp from "./Table/TableSpp";
import TablePetugas from "./Table/TablePetugas";
import ModalPetugas from "./Modal/ModalPetugas";
import Modalkelas from "./Modal/ModalKelas";
import TableKelas from "./Table/TableKelas";
import ModalSiswa from "./Modal/ModalSiswa";
import TableSiswa from "./Table/TableSiswa";
import Dropdown from "./DropDown";
import TableDataSpp from "./Table/TableDataSpp";
import Chart from "./Chart";

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

export default function Dashboard(props) {
    const [value, setValue] = React.useState("1");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log(props);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const admin = props.auth.admin;
    return (
        <div className="bg-slate-100">
            <nav class="bg-white border-gray-200 dark:bg-gray-900">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a
                        href="https://flowbite.com/"
                        class="flex items-center space-x-3 rtl:space-x-reverse"
                    >
                        <img
                            src="https://flowbite.com/docs/images/logo.svg"
                            class="h-8"
                            alt="Flowbite Logo"
                        />
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            Aplikasi pembayaran spp
                        </span>
                    </a>
                    <Dropdown />
                </div>
            </nav>

            <div className="flex flex-wrap p-3">
                <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <TabList
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                            >
                                {admin.role === "admin" ? (
                                    <Tab label="Dashboard" value="1" />
                                ) : (
                                    ""
                                )}
                                <Tab
                                    label="History Pembayaran"
                                    value={admin.role === "petugas" ? "1" : "2"}
                                />

                                {admin.role === "admin" ? (
                                    <Tab label="Data Users" value="3" />
                                ) : (
                                    ""
                                )}
                            </TabList>
                        </Box>
                        {admin.role === "admin" ? (
                            <TabPanel
                                className="bg-white h-[70vh] overflow-y-auto rounded-lg mt-10"
                                value="1"
                            >
                                <div className=" rounded-lg flex md:flex-row w-full flex-col justify-around bg-white p-2">
                                    <div className="flex flex-col">
                                        <div className="flex flex-nowrap p-2 justify-between">
                                            <p className="font-bold">
                                                Data input Spp tahun 2024
                                            </p>

                                            <div>
                                                <Button
                                                    sx={{
                                                        backgroundColor: "blue",
                                                        color: "white",
                                                    }}
                                                    onClick={handleOpen}
                                                >
                                                    Tambah +
                                                </Button>
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
                                                            Tambah Data Spp
                                                        </Typography>
                                                        <Typography
                                                            id="modal-modal-description"
                                                            sx={{ mt: 2 }}
                                                        >
                                                            <ModalSpp />
                                                        </Typography>
                                                    </Box>
                                                </Modal>
                                            </div>
                                        </div>

                                        <TableSpp
                                            auth={props.auth}
                                            dataSpp={props.dataSpp}
                                        />
                                    </div>
                                    <div className="flex flex-col w-full md:w-auto">
                                        <div className="flex flex-nowrap p-2 justify-between">
                                            <p className="font-bold">
                                                Data Kelas
                                            </p>

                                            <div>
                                                <Modalkelas />
                                            </div>
                                        </div>
                                        <TableKelas data={props.dataKelas} />
                                    </div>
                                </div>
                                <div className="w-full overflow-x-auto">
                                    <div className="w-full">
                                        <Chart
                                            paymentData={props.dataPembayaran}
                                        />
                                    </div>
                                </div>
                            </TabPanel>
                        ) : (
                            ""
                        )}

                        <TabPanel
                            className="bg-white h-[70vh] overflow-y-auto rounded-lg mt-10"
                            value={admin.role === "petugas" ? "1" : "2"}
                        >
                            <TableDataSpp
                                auth={admin}
                                data={props.dataPembayaran}
                            />
                        </TabPanel>
                        {admin.role === "admin" ? (
                            <TabPanel
                                className="bg-white h-[70vh] rounded-lg overflow-auto mt-10"
                                value="3"
                            >
                                <div className="flex flex-wrap justify-evenly">
                                    <div className="flex flex-col">
                                        <div className="flex flex-nowrap p-2 justify-between">
                                            <p className="font-bold">
                                                Data petugas
                                            </p>
                                            <ModalPetugas />
                                        </div>
                                        <TablePetugas
                                            data={props.dataPetugas}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex w-full flex-nowrap p-2 justify-between">
                                            <p className="font-bold">
                                                Data Siswa
                                            </p>
                                            <ModalSiswa
                                                dataKelas={props.dataKelas}
                                            />
                                        </div>
                                        <TableSiswa
                                            dataKelas={props.dataKelas}
                                            data={props.dataSiswa}
                                        />
                                    </div>
                                </div>
                            </TabPanel>
                        ) : (
                            ""
                        )}
                    </TabContext>
                </Box>
            </div>
        </div>
    );
}
