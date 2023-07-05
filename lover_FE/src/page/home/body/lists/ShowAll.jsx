import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, Chip, Stack } from "@mui/material";
import ShowRating from "../../Rating/ShowRating";
import { useDispatch, useSelector } from "react-redux";
import {
    getProvider,
    newlyJoinedProviders,
    searchSexFemaleProviders,
    searchSexMaleProviders,
    topProviders,
} from "../../../../services/providerService";
import { useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ReactPaginate from "react-paginate";

export default function ShowAll() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [totalProviders, setTotalProviders] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    const showProvider = useSelector((state) => {;
        const ProviderList = state.provider.listProvider.docs;
        if (!ProviderList) return [];
        if (ProviderList && totalPage === 0) {
            setTotalPage(state.provider.listProvider.meta.totalPage);
            setTotalProviders(state.provider.listProvider.meta.total);
        }
        return ProviderList;
    });


    const handleNewProvider = async () => {
        await dispatch(newlyJoinedProviders());
    };

    const handleTopProviders = async () => {
        await dispatch(topProviders());
    };

    const handleMale = async () => {
        await dispatch(searchSexMaleProviders());
    };

    const handleFemale = async () => {
        await dispatch(searchSexFemaleProviders());
    };

    const handlePageClick = (event) => {
        dispatch(getProvider(+event.selected + 1));
    };

    useEffect(() => {
        dispatch(getProvider());
    }, [dispatch]);

    return (
        <>
            <img
                style={{ width: "99%" }}
                src="https://files.playerduo.net/production/images/banner/715867c6-698f-411a-b4f9-1e9093130b60__ff5aee00-79ee-11ed-a19f-23a3b10d190e__admin_banner.jpg"
            />
            <button
                style={{
                    backgroundColor: "#2e6c30",
                    border: "none",
                    color: "white",
                    padding: "10px 20px",
                    textAlign: "center",
                    textDecoration: "none",
                    display: "inline-block",
                    fontSize: "16px",
                    borderRadius: "4px",
                    cursor: "pointer",
                }}
                onClick={handleNewProvider}
            >
                Người đăng kí CCDV mới nhất
            </button>
            <button
                style={{
                    backgroundColor: "#2e6c30",
                    border: "none",
                    color: "white",
                    padding: "10px 20px",
                    textAlign: "center",
                    textDecoration: "none",
                    display: "inline-block",
                    fontSize: "16px",
                    borderRadius: "4px",
                    cursor: "pointer",
                }}
                onClick={handleTopProviders}
            >
                Người có lượt thuê nhiều nhất
            </button>
            <button onClick={handleMale}>Nam</button>
            <button onClick={handleFemale}>Nữ</button>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "100%",
                    gap: 1,
                }}
            >
                {showProvider &&
                    showProvider.map((item, key) => {
                        return (
                            <Card
                                sx={{ width: 250 }}
                                key={key}
                                onClick={() => navigate(`/detail-provider/${item.id}`)}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={item.avatarProvider}
                                        alt="green iguana"
                                    />
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            position: "relative",
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            color="error"
                                            sx={{
                                                position: "absolute",
                                                bottom: "10px",
                                                right: "10px",
                                            }}
                                        >
                                            {item.price}/1h
                                        </Button>
                                    </Box>
                                    <CardContent>
                                        <Badge
                                            color="secondary"
                                            badgeContent=" "
                                            variant="dot"
                                        >
                                            <Stack
                                                direction={"row"}
                                                justifyContent={"space-between"}
                                                alignItems={"center"}
                                            >
                                                <Typography variant="h6" gutterBottom>
                                                    {item.name}
                                                </Typography>
                                                {item.ready === "1" ? (
                                                    <FiberManualRecordIcon
                                                        fontSize="s"
                                                        sx={{ color: "green" }}
                                                    />
                                                ) : (
                                                    <FiberManualRecordIcon
                                                        fontSize="s"
                                                        sx={{ color: "gray" }}
                                                    />
                                                )}
                                            </Stack>
                                        </Badge>
                                        <Typography
                                            variant="caption"
                                            display="block"
                                            gutterBottom
                                            color={"gray"}
                                        >
                                            {item.desc}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>

                                <CardContent>
                                    <ShowRating />
                                </CardContent>
                            </Card>
                        );
                    })}
            </Box>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPage}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination-container"
                activeClassName="active-page"
            />
            <style>
                {`
          .pagination-container {
            display: flex;
            justify-content: center;
            align-items: center;
            list-style: none;
            padding: 0;
          }

          .pagination-container li {
            display: inline-block;
            margin: 0 5px;
          }

          .pagination-container li a {
            display: block;
            padding: 5px 10px;
            color: #000;
            text-decoration: none;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          .active-page a {
            background-color: #2e6c30;
            color: #fff;
          }
        `}
            </style>
        </>
    );
}
