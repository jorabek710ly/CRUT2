import React, { useEffect, type Dispatch, type SetStateAction } from "react";
// Type
import type { IStudent, IStudentForm } from "../types";
// React Query
import { useBlog } from "../api/hooks/useBlog";
// Icons
import { LoadingOutlined } from "@ant-design/icons";
// Form
import { useForm } from "react-hook-form";

//ISH KETMAKETLIGI

//  Ma’lumotlar shakllantiriladi (form)
// react-hook-form orqali inputlarni boshqaradi.

// useEffect orqali update qiymati mavjud bo‘lsa, form to‘ldiriladi (edit), aks holda bo‘sh bo‘ladi (create).

//  Submit (Yuborish)
// onSubmit funksiyasi:

// Maydonlar bo‘sh bo‘lmasa, tekshiradi.

// Agar update mavjud bo‘lsa – updateBlog orqali tahrirlaydi.

// Aks holda – createBlog orqali yangi yozuv yaratadi.

// Har ikkala holatda ham onSuccess va onError orqali xabar chiqadi.

//  UI elementlar
// Tailwind CSS yordamida chiroyli inputlar va tugmalar ishlatilgan.

// LoadingOutlined bilan yuklanish holati (loading) ko‘rsatilgan.

// Tahrir holatida "Cancel" tugmasi ko‘rinadi (setUpdate(null)).

const Form = ({
  update,
  setUpdate,
}: {
  update: IStudent | null;
  setUpdate: Dispatch<SetStateAction<null | IStudent>>;
}) => {
  const { createBlog, updateBlog } = useBlog();
  const { mutate: mutateCreate, isPending: isPendingCreate } = createBlog;
  const { mutate: mutateUpdate, isPending: isPengingUpdate } = updateBlog;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IStudentForm>();

  useEffect(() => {
    if (update) {
      reset({
        fname: update.fname,
        lname: update.lname,
        birthdate: update.birthdate,
        address: update.address,
        phone_number: update.phone_number,
      });
    } else {
      reset({
        fname: "",
        lname: "",
        birthdate: "",
        address: "",
        phone_number: "",
      });
    }
  }, [update]);

  const onSubmit = (data: IStudentForm) => {
    if (
      !(
        data.fname.trim() &&
        data.lname.trim() &&
        data.birthdate.trim() &&
        data.address.trim() &&
        data.phone_number.trim()
      )
    ) {
      console.error("Please fill all fields properly.");
      return;
    }

    if (update) {
      const updatedData = {
        ...data,
        id: update.id,
      };
      mutateUpdate(updatedData, {
        onSuccess: () => {
          console.log("Edited successfully");
          setUpdate(null);
        },
        onError: () => {
          console.error(
            "Something went wrong! Couldn't edit, please try again"
          );
        },
      });
    } else {
      const newBlog: IStudent = {
        ...data,
        id: new Date().getTime().toString(),
      };

      mutateCreate(newBlog, {
        onSuccess: () => {
          console.log("Created successfully");
          reset();
        },
        onError: () => {
          console.error(
            "Something went wrong! Couldn't create, please try again"
          );
        },
      });
    }
  };

  const handleEditCancel = () => {
    setUpdate(null);
  };

  return (
    <section className="bg-white py-6 px-4 md:px-8 shadow rounded-lg">
      <div className="max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="space-y-3">
            <div>
              <input
                {...register("fname")}
                type="text"
                placeholder="Firstname"
                autoComplete="off"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div>
              <input
                {...register("lname")}
                type="text"
                placeholder="Lastname"
                autoComplete="off"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div>
              <input
                {...register("birthdate")}
                type="text"
                placeholder="Birthdate"
                autoComplete="off"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <input
                {...register("address")}
                type="text"
                placeholder="Address"
                autoComplete="off"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div>
              <input
                {...register("phone_number")}
                type="text"
                placeholder="Phone Number"
                autoComplete="off"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div className="flex gap-3">
              {update && (
                <button
                  type="button"
                  onClick={handleEditCancel}
                  className="w-full border border-gray-400 text-gray-600 rounded-md py-2 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className={`w-full text-white rounded-md py-2 transition ${
                  update
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-600 hover:bg-blue-700"
                } ${
                  isPendingCreate || isPengingUpdate
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }`}
              >
                {isPendingCreate || isPengingUpdate ? (
                  <div className="flex items-center justify-center gap-2">
                    <LoadingOutlined className="animate-spin text-white" />
                    {update ? "Saving..." : "Creating..."}
                  </div>
                ) : (
                  <span>{update ? "Save" : "Create"}</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default React.memo(Form);
