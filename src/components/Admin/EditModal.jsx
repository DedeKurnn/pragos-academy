/* eslint-disable react/prop-types */
import clsx from "clsx";
import Input from '../UI/Input';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "@/lib/baseUrl";

function EditModal({ handleCloseModal, courseItem, handleUpdate }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [intended, setIntended] = useState("");
  const [lecturer, setLecturer] = useState("");
  const [level, setLevel] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");

  useEffect(() => {
    if (courseItem) {
      setName(courseItem.name || "");
      setDescription(courseItem.description || "");
      setIntended(courseItem.intended || "");
      setLecturer(courseItem.lecturer || "");
      setLevel(courseItem.level || "");
      setType(courseItem.type || "");
      setPrice(courseItem.price || "");
      setDiscount(courseItem.discount || "");
    }
  }, [courseItem]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name,
        description,
        intended,
        lecturer,
        level,
        type,
        price,
        discount,
      };

      const response = await axios.put(
        `${BASE_URL}course/edit/${courseItem.code}`,
        data
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
      handleUpdate(data);
      handleCloseModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div
          className={clsx(
            'fixed z-10 inset-0 overflow-y-auto grid place-content-center',
            'bg-black bg-opacity-75'
          )}
        >
          <div
            className={clsx(
              'relative transform-transition',
              'bg-white px-7 pb-4 rounded-lg overflow-y-scroll',
              'h-[599px] w-[750px]'
            )}
          >
            <div className="flex justify-end font-bold text-2xl">
              <button
                type="button"
                className="text-gray-400 close hover:bg-gray-300 rounded-full w-10 h-10"
                onClick={handleCloseModal}
              >
                &times;
              </button>
            </div>
            <div className="modal-body py-1 text-center w-[465px] mx-auto">
            <h1 className="font-Montserrat text-[24px]  font-bold leading-[36px] text-darkblue-05">Edit Kelas</h1>
            </div>
            <div className='h-[83%] w-[465px] mx-auto'>
              <Input 
                placeholder="name" 
                type="text"  
                label="Nama Kelas"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
              <Input 
                placeholder="description" 
                type="text"  
                label="Kategori"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <Input
                placeholder="intended"
                type="text"
                label="Deskripsi"
                name="intended"
                onChange={(e) => setIntended(e.target.value)}
              />
              <Input 
                placeholder="lecturer" 
                type="text"  
                label="Kode Kelas"
                name="lecturer"
                onChange={(e) => setLecturer(e.target.value)}
              />
              <Input 
                placeholder="level" 
                type="text"  
                label="Tipe Kelas"
                name="level"
                onChange={(e) => setLevel(e.target.value)}
              />
              <Input 
                placeholder="type" 
                type="text"  
                label="Level"
                name="type"
                onChange={(e) => setType(e.target.value)}
              />
              <Input 
                placeholder="price" 
                type="text"  
                label="Harga"
                name="price"
                onChange={(e) => setPrice(e.target.value)}
              />
              <Input
                placeholder="discount" 
                type="text"  
                label="Materi"
                name="discount"
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
            <div className="flex justify-center w-[465px] mx-auto gap-2">
              <button
                type="button"
                className="bg-alert-warning text-white font-bold py-2 px-4 rounded-full cursor-pointer"
                onClick={handleCloseModal}
              >
                Upload Video
              </button>
              <button
                type="button"
                className="bg-darkblue-05 text-white font-bold py-2 px-4 rounded-full cursor-pointer"
                onClick={handleSave}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
  )
}

export default EditModal