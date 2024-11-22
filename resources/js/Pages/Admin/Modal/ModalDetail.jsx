import React from "react";
import { useForm } from "@inertiajs/react";
import {
    Box,
    Button,
    Card,
    Chip,
    Divider,
    Modal,
    Stack,
    Typography,
} from "@mui/material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const ModalDetail = ({ data }) => {
    console.log("hhhhh", data);
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    return (
        <div>
            <button
                onClick={handleOpen}
                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
                Detail
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
                        Detail Pembayaran Spp bulan {data.bulan}
                    </Typography>
                    <Card variant="outlined" sx={{ maxWidth: 360 }}>
                        <Box sx={{ p: 2 }}>
                            <Stack
                                direction="row"
                                sx={{
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                >
                                    Nama
                                </Typography>
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="div"
                                >
                                    {data.nama}
                                </Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                sx={{
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                >
                                    Nominal
                                </Typography>
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="div"
                                >
                                    {data.nominal.toLocaleString("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    })}
                                </Typography>
                            </Stack>

                            <Typography
                                variant="body2"
                                sx={{ color: "text.secondary" }}
                            >
                                Anda sudah melunasi pembayaran Spp bulan{" "}
                                {data.bulan}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ p: 2 }}>
                            <Typography gutterBottom variant="body2">
                                status
                            </Typography>
                            <Stack direction="row" spacing={1}>
                                <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                    Lunas
                                </span>
                            </Stack>
                        </Box>
                    </Card>
                </Box>
            </Modal>
        </div>
    );
};

export default ModalDetail;
