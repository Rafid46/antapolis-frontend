"use client";

import useAxios from "../../hooks/useAxios";
import { Button, Form, notification, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import Category from "../../components/Home/Category.jsx";

const Homepage = ({
  setRefetchCategory,
  setRefetchAnimal,
  categoryList,
  loadingAnimal,
  setLoadingAnimal,
  loadingCategory,
  setLoadingCategory,
}) => {
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("Image");
  const axiosPublic = useAxios();

  const [animalModal, setAnimalModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);

  const [initialValues, setInitialValues] = useState({
    categoryName: "",
  });
  const [initialValuesAnimal, setInitialValuesAnimal] = useState({
    name: " ",
  });
  //   const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageName(file.name);
    } else {
      setImage(null);
      setImageName("Image");
    }
  };

  // animal
  const handleAnimalCreate = async (values) => {
    const { name, category } = values;

    try {
      setLoadingAnimal(true);

      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "your_upload_preset");

      const cloudinaryResponse = await axiosPublic.post(
        "https://api.cloudinary.com/v1_1/deej2hp71/image/upload",
        formData
      );

      const imageUrl = cloudinaryResponse.data.secure_url;

      const data = {
        animalName: name,
        imageUrl,
        category,
      };

      await axiosPublic.post("/api/create-animals/", data);
      setRefetchAnimal((prev) => !prev);
      setLoadingAnimal(false);
      setAnimalModal(false);
      setImage(null);
      setImageName("Image");
      setInitialValuesAnimal({
        name: "",
      });
      form.setFieldsValue({ name: "" });
      notification.success({
        message: (
          <p className="font-semibold text-[14px]">
            Animal created successfully
          </p>
        ),
        duration: 3,
        placement: "topRight",
      });
    } catch (error) {
      console.error("Error uploading image or sending data:", error);
      setLoadingAnimal(false);

      notification.error({
        message: "Failed to submit data",
        duration: 3,
        placement: "topRight",
      });
    }
  };

  //   category
  const handleCategory = async (values) => {
    const { categoryName } = values;
    try {
      setLoadingCategory(true);
      const data = {
        categoryName,
      };
      await axiosPublic.post("/api/create-category/", data);
      setRefetchCategory((prev) => !prev);
      setLoadingCategory(false);
      setCategoryModal(false);
      setInitialValues({
        categoryName: "",
      });
      form.setFieldsValue({ categoryName: "" });
      notification.success({
        message: (
          <p className="font-semibold text-[14px]">
            category added successfully
          </p>
        ),
        duration: 3,
        placement: "topRight",
      });
    } catch (error) {
      console.error("Error uploading data:", error);
      setLoadingCategory(false);

      notification.error({
        message: "Failed to submit data",
        duration: 3,
        placement: "topRight",
      });
    }
  };

  return (
    <section>
      <div className="flex items-center gap-x-2 justify-end">
        <div className="">
          <Button
            onClick={() => setAnimalModal(true)}
            className="rounded-full custom_hover !bg-transparent shadow-none text-primary-color border-primary-color text-sm"
            type="primary"
          >
            Add animal
          </Button>
        </div>
        <div className="">
          <Button
            onClick={() => setCategoryModal(true)}
            className="rounded-full custom_hover !bg-primary-color shadow-none  border-primary-color text-sm"
            type="primary"
          >
            Add category
          </Button>
        </div>
      </div>

      {/* animal modal */}
      <Modal
        footer={null}
        centered
        open={animalModal}
        onOk={() => setAnimalModal(false)}
        onCancel={() => setAnimalModal(false)}
      >
        <div>
          <h2 className="text-xl font-medium text-gray-600 mb-5">Add Animal</h2>
          <Form
            form={form}
            initialValues={initialValuesAnimal}
            className="!font-geist"
            layout="vertical"
            requiredMark={false}
            onFinish={handleAnimalCreate}
          >
            {/* Name Field */}
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please enter the name!" }]}
            >
              <Input
                placeholder="Animal name"
                className="w-full placeholder:text-gray-500  h-[36px]  rounded-md border-gray-200 bg-white text-sm text-gray-700 focus:border-primary-color"
              />
            </Form.Item>

            {/* Image Field */}
            <div className="mb-5 mt-5">
              <div className="relative w-full">
                <label
                  htmlFor="image"
                  className="w-full h-[36px] rounded-md border border-gray-200 bg-white text-sm text-gray-700 flex items-center justify-between px-4 cursor-pointer hover:border-primary-color focus:outline-none"
                >
                  <span className="text-gray-500">{imageName}</span>
                  <span className="text-primary-color font-semibold">
                    Upload
                  </span>
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
            <Form.Item
              name="category"
              rules={[{ required: true, message: "Please select a category!" }]}
            >
              <Select placeholder="Select a category" allowClear>
                {Array.isArray(categoryList) &&
                  categoryList?.map((category) => (
                    <Select.Option
                      key={category._id}
                      value={category?.categoryName}
                    >
                      {category?.categoryName}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            {/* Submit Button */}
            <div className="text-end mt-5">
              <Button
                disabled={loadingAnimal}
                className={`custom_button_style custom_hover`}
                type="primary"
                htmlType="submit"
                loading={loadingAnimal}
              >
                {loadingAnimal ? "Creating..." : "Create animal"}
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
      {/* category modal */}
      <Category
        handleCategory={handleCategory}
        categoryModal={categoryModal}
        setCategoryModal={setCategoryModal}
        initialValues={initialValues}
        loadingCategory={loadingCategory}
      />
    </section>
  );
};

export default Homepage;
