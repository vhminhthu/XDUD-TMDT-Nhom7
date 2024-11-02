import { useState } from 'react';
import AdminNav from '../../components/AdminNav';
import { Link } from 'react-router-dom';

export const Type = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newType, setNewType] = useState('');

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSaveType = () => {
    console.log('New Product Type:', newType);
    setIsDialogOpen(false);
  };

  return (
    <>
      <AdminNav>
        <div className="ml-24 flex-1 flex flex-col gap-5">
      
          <div className="flex justify-between items-center p-6 bg-neutral-100 shadow-md">
            <h1 className="text-lg font-bold text-gray-900">Loại dịch vụ</h1>
          
            <div className="flex items-center bg-white rounded-full shadow-md w-full max-w-2xl relative">
              <input
                type="text"
                placeholder="Nhập từ cần tìm.."
                className="px-7 py-3 w-full rounded-3xl focus:outline-none pl-10"
              />
              <button className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center bg-green-200 text-black font-bold rounded-full px-4 py-2 mr-2">
                <svg
                  className="w-5 h-5 mr-2 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
                Tìm kiếm
              </button>
            </div>
            <div className="flex items-center">
               <button> 
                <Link to="/profile">
                <img src="https://via.placeholder.com/40" alt="profile" className="w-10 h-10 rounded-full mr-2" />
                </Link>
                </button>
              <div>
                <p className="text-gray-800 font-semibold">Pham Tien</p>
                <p className="text-gray-500 text-sm">Admin</p>
              </div>
            </div>
          </div>

          <div className="flex gap-16">
            <button
              className="bg-slate-900 rounded-lg p-2 text-white font-semibold flex gap-1"
              onClick={handleOpenDialog}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </span>
              Thêm mới
            </button>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal ">
                <tr>
                  <th className="py-3 px-4  text-center">Tên dịch vụ</th>
                  <th className="py-3 px-40 text-center">Mô tả dịch vụ</th>
                  {/* <th className="py-3 px-20 text-center">Created Date</th> */}
                  <th className="py-3 px-7 text-center">Chỉnh</th>
                </tr>
              </thead>

              <tbody className="text-gray-600 text-sm font-light">
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-10 text-center font-medium">Đồ họa và thiết kế</td>
                  <td className="py-3 px-40 text-center">Dịch vụ đồ họa và thiết kế bao gồm các công việc sáng tạo, tạo ra các sản phẩm thị giác giúp doanh nghiệp, tổ chức hoặc cá nhân truyền tải thông điệp và xây dựng thương hiệu một cách hiệu quả</td>
                  {/* <td className="py-3 px-20 text-center">20/8/2024</td> */}
                  <td className="py-3 px-7 flex gap-3 ">
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </button>
                    <span>
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </span>
                  </td>
                </tr>
  
              </tbody>
            </table>
          </div>
        </div>


        {isDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
              <h2 className="text-xl font-bold mb-4">Thêm loại dịch vụ mới</h2>
              <input
                type="text"
                placeholder="Nhập tên loại dịch vụ..."
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
              <div className="flex justify-end gap-4">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                  onClick={handleCloseDialog}
                >
                  Quay lại
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={handleSaveType}
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        )}
      </AdminNav>
    </>
  );
};

export default Type;
