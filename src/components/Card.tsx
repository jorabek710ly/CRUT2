import React, { useState, type Dispatch, type SetStateAction } from "react";
import { useBlog } from "../api/hooks/useBlog";
import { LoadingOutlined, UserOutlined } from "@ant-design/icons";
import type { IStudent } from "../types";

//ISH KETMAKETLIGI

// type ni aniqlash (IStudent)

// API hook yozish (useBlog)

// Card componentini yaratish:

// getBlog orqali ma'lumot olish

// deleteBlog orqali o‘chirish

// setUpdate orqali edit holatni uzatish

// Parent componentda update va setUpdate ni boshqarish

// Tailwind bilan chiroyli UI qilish

// Memo orqali optimizatsiya

const Card = ({
  update,
  setUpdate,
}: {
  update: IStudent | null;
  setUpdate: Dispatch<SetStateAction<null | IStudent>>;
}) => {
  const { getBlog, deleteBlog } = useBlog();
  const { mutate, isPending } = deleteBlog;
  const { data } = getBlog;
  const blogData: IStudent[] = data;

  const [IDDelete, setIDDelete] = useState<string>("");

  const handleDelete = (id: string) => {
    setIDDelete(id);
    mutate(id, {
      onSuccess: () => {
        console.log("Delete Success");
        setIDDelete("");
        setUpdate(null);
      },
      onError: () => {
        console.error("Delete Error");
        setIDDelete("");
      },
    });
  };

  const handleEdit = (item: IStudent) => {
    setUpdate(item);
  };

  return (
    <section className="bg-white py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {blogData &&
            [...blogData].reverse().map((item) => (
              <div
                key={item.id}
                className={`rounded-md border ${
                  update?.id === item.id
                    ? "border-l-4 border-blue-500"
                    : "border-gray-200"
                } bg-gray-50 p-4 shadow-sm transition`}
              >
                <div className="flex items-center justify-between border-b pb-2 mb-3">
                  <UserOutlined className="text-gray-500 text-xl" />
                  <div className="flex items-center gap-3">
                    {update?.id === item.id ? (
                      <span className="text-xs italic text-gray-500">
                        Editing...
                      </span>
                    ) : (
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 text-sm hover:underline transition"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 text-sm hover:underline transition"
                    >
                      {isPending && IDDelete === item.id ? (
                        <LoadingOutlined className="animate-spin text-base" />
                      ) : (
                        "Delete"
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-700">
                  <div>
                    <span className="font-medium text-gray-500">
                      Full name:{" "}
                    </span>
                    <span className="capitalize">
                      {item.fname} {item.lname}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">
                      Birthdate:{" "}
                    </span>
                    <span>{item.birthdate}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Address: </span>
                    <span className="capitalize">{item.address}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Phone: </span>
                    <span>{item.phone_number}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Card);
