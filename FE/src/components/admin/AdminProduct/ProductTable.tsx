import type { ColumnsType } from "antd/es/table";
import { Table, Tooltip, Button, Space, Popconfirm } from "antd";

import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineQuestionCircle,
} from "react-icons/ai";

import { IProduct } from "../../../interface";

type ProductTableProps = {
  isLoading: boolean;
  listProducts: IProduct[] | undefined;
  onAction: (_id: string, action: string) => void;
};

const ProductTable = ({
  onAction,
  isLoading,
  listProducts,
}: ProductTableProps) => {
  const columns: ColumnsType<IProduct> = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      align: "left",
      ellipsis: true,
      responsive: ["md"],
      render: (name) => (
        <Tooltip placement="top" title={name}>
          {name}
        </Tooltip>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Hình ảnh",
      dataIndex: "images", // Dữ liệu chứa URL hình ảnh
      key: "images",
      align: "center",
      responsive: ["md"],
      render: (images) => (
        <img
          src={images?.[0]?.url}
          alt="product"
          style={{ width: "100px", height: "100px" }}
        />
      ),
    },

    {
      title: "Giá sản phẩm",
      dataIndex: "price",
      key: "price",
      align: "left",
      responsive: ["md"],
      render: (price) => price.toLocaleString("vi-VN") + "₫",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      align: "left",
      responsive: ["md"],
      render: (category) => category.slug,
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Thao tác",
      dataIndex: "_id",
      key: "_id",
      align: "center",
      width: "10%",
      render: (_id) => (
        <>
          <Space wrap>
            <Button
              ghost
              type="primary"
              size="middle"
              onClick={() => onAction(_id, "update")}
              icon={<AiOutlineEdit size={20} />}
            />

            <Popconfirm
              okType="danger"
              okText="Đồng ý"
              cancelText="Hủy"
              onConfirm={() => onAction(_id, "delete")}
              placement="topRight"
              title="Xóa sản phẩm?"
              description="Bạn có chắc chắn xóa sản phẩm này không?"
              icon={
                <AiOutlineQuestionCircle
                  size={20}
                  className="text-rose-500 mr-1 mt-0.5"
                />
              }
            >
              <Button
                danger
                size="middle"
                type="primary"
                icon={<AiOutlineDelete size={20} />}
              />
            </Popconfirm>
          </Space>
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        title={() => (
          <Button
            ghost
            type="primary"
            size="middle"
            onClick={() => onAction("", "add")}
          >
            Thêm
          </Button>
        )}
        bordered
        rowKey="_id"
        size="middle"
        columns={columns}
        scroll={{ y: 350 }}
        loading={isLoading}
        tableLayout="auto"
        dataSource={listProducts || []}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
};

export default ProductTable;
