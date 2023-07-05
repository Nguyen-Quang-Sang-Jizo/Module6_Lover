import { Box } from "@mui/material";
import React, {  useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView, TreeItem } from "@mui/lab";
import PersonIcon from "@mui/icons-material/Person";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import PaymentIcon from "@mui/icons-material/Payment";
import WalletIcon from "@mui/icons-material/Wallet";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import SettingsIcon from "@mui/icons-material/Settings";
import BlockIcon from "@mui/icons-material/Block";
import HistoryIcon from "@mui/icons-material/History";
import { useNavigate } from "react-router-dom";

export default function UserSiderbar() {
  const [expanded, setExpanded] = React.useState(
    localStorage.getItem("expanded") ? localStorage.getItem("expanded") : ["1"]
  );
  const [selected, setSelected] = React.useState(
    localStorage.getItem("selected") ? localStorage.getItem("selected") : 2
  );

  const navigate = useNavigate();

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeId) => {
    setSelected(nodeId);
  };

  useEffect(() => {
    const savedExpanded = localStorage.getItem("expanded");
    const savedSelected = localStorage.getItem("selected");

    if (savedExpanded) {
      setExpanded(JSON.parse(savedExpanded));
    }

    if (savedSelected) {
      setSelected(savedSelected);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expanded", JSON.stringify(expanded));
    localStorage.setItem("selected", selected);
  }, [expanded, selected]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <TreeView
        aria-label="Trình duyệt hệ thống tập tin"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        sx={{ height: "100%", flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
        selected={selected}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
      >
        <TreeItem nodeId="1" label="TÀI KHOẢN" defaultExpanded>
          <TreeItem
            nodeId="2"
            label="Thông tin cá nhân"
            icon={<PersonIcon />}
            onClick={() => {
              navigate("/customer_info");
            }}
          />
          <TreeItem
            nodeId="3"
            label="Thống kê"
            icon={<FeaturedPlayListIcon />}
          />
          <TreeItem nodeId="4" label="Cài đặt">
          </TreeItem>
          <TreeItem nodeId="6" label="Lịch sử giao dịch">
            <TreeItem
              nodeId="7"
              label="Lịch sử thuê"
              icon={<HistoryToggleOffIcon />}
              onClick={() => {
                navigate("/customer_info/order");
              }}
            />
          </TreeItem>
          <TreeItem nodeId="17" label="Đơn đang thực hiện" onClick={()=>{navigate("/customer_info/accept")}} icon={<HistoryIcon />} />
          <TreeItem nodeId="8" label="Thanh toán" icon={<PaymentIcon />} />
          <TreeItem nodeId="9" label="Ví" icon={<WalletIcon />} />
        </TreeItem>
        <TreeItem nodeId="10" label="TRANG CUNG CẤP DỊCH VỤ">
          <TreeItem nodeId="11" label="Cài đặt">
            <TreeItem
              nodeId="12"
              label="Cài đặt nâng cao"
              icon={<SettingsSuggestIcon />}
              onClick={() => {
                navigate("/user_setting/advance ");
              }}
            />
            <TreeItem
              nodeId="13"
              label="Cài đặt dịch vụ"
              icon={<SettingsIcon />}
              onClick={() => {
                navigate("/user_setting/service ");
              }}
            />
          </TreeItem>
          <TreeItem
            nodeId="14"
            label="Lịch sử nhật đặt"
            icon={<HistoryIcon />}
            onClick={() => {
              navigate("/user_setting/pendingProvider")
            }}
          />
          <TreeItem
            nodeId="16"
            label="Đơn đang thực hiện"
            icon={<HistoryToggleOffIcon />}
            onClick={() => {
              navigate("/user_setting/acceptProvider")
            }}
          />
          <TreeItem
            nodeId="15"
            label="Danh sách từ chối"
            icon={<BlockIcon />}
            onClick={() => {
              navigate("/user_setting/rejectProvider")
            }}
          />
        </TreeItem>
      </TreeView>
    </Box>
  );
}
