import { Button, Form, Input, Modal } from "antd";

const Category = ({
  handleCategory,
  categoryModal,
  setCategoryModal,
  initialValues,
  loadingCategory,
}) => {
  const [form] = Form.useForm();
  return (
    <div>
      <Modal
        footer={null}
        centered
        open={categoryModal}
        onOk={() => setCategoryModal(false)}
        onCancel={() => setCategoryModal(false)}
      >
        <div>
          <h2 className="text-xl font-medium text-gray-600 mb-5">
            Add category
          </h2>
          <Form
            form={form}
            initialValues={initialValues}
            className="!font-geist"
            layout="vertical"
            requiredMark={false}
            onFinish={handleCategory}
          >
            {/* Name Field */}
            <Form.Item
              className=""
              name="categoryName"
              rules={[
                {
                  required: true,
                  message: "Please enter the category name!",
                },
              ]}
            >
              <Input
                placeholder="Name"
                className="w-full placeholder:text-gray-500 placeholder h-[36px]  rounded-md border-gray-200 bg-white text-sm text-gray-700 focus:border-primary-color"
              />
            </Form.Item>

            {/* Submit Button */}
            <div className="text-end mt-5">
              <Button
                disabled={loadingCategory}
                className={`custom_button_style custom_hover`}
                type="primary"
                htmlType="submit"
                loading={loadingCategory}
              >
                {loadingCategory ? "Saving..." : "Save"}
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default Category;
