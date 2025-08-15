import axios from "axios";
import { useEffect, useState } from "react";
import { RiAdvertisementLine } from "react-icons/ri";
import { MdOutlineDeleteForever } from "react-icons/md";
import AdminNewAd from "./adminNewAd";
import AdminAdDetails from "./admineAdDetails";

const AdminAds = () => {
  const [componentSelect, setComponentSelect] = useState("main");
  const [allAds, setAllAds] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);

  const HandleDelete = async (adId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ad?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://minddrop.onrender.com/api/ad/deleteAd/${adId}`
      );
      setAllAds((prev) => ({
        ...prev,
        ads: prev.ads.filter((ad) => ad._id !== adId),
        count: prev.count - 1,
      }));
      alert("Ad deleted successfully.");
    } catch (error) {
      console.error("Failed to delete ad:", error);
      alert("Failed to delete ad. Please try again.");
    }
  };

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get(
          "https://minddrop.onrender.com/api/ad/getAllAds"
        );
        console.log(res.data.ads);
        setAllAds(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchAds();
  }, [componentSelect]);

  return (
    <>
      {componentSelect === "main" && (
        <div>
          <div className="mb-4 flex flex-row justify-between items-center">
            <div className="flex justify-evenly items-start bg-white p-6 rounded-xl shadow w-[300px]">
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                <RiAdvertisementLine size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Products</p>
                <p className="text-2xl font-bold mt-1">{allAds?.count}</p>
              </div>
            </div>
            <div>
              <button
                className="text-lg p-2 flex items-center justify-center gap-2 text-blue-800 bg-blue-200 hover:bg-blue-300"
                onClick={() => setComponentSelect("newAd")}
              >
                <RiAdvertisementLine />
                NEW Ad
              </button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">All Ads</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ad ID
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allAds?.ads?.map((ad) => (
                    <tr key={ad._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        {ad._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {ad.position}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <p
                          className={`${
                            ad.status == "active"
                              ? "text-green-600 bg-green-300"
                              : "text-red-600 bg-red-300"
                          } w-[50px] flex justify-center items-center rounded-md p-1`}
                        >
                          {ad.status}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <p
                          className="text-blue-400 cursor-pointer hover:text-blue-600"
                          onClick={() => {
                            setComponentSelect("details");
                            setSelectedAd(ad);
                          }}
                        >
                          view details{" "}
                        </p>
                      </td>
                      <td className=" whitespace-nowrap text-2xl text-gray-500 flex justify-center items-center gap-1">
                        <button
                          className="text-red-400 hover:bg-red-200 p-2 w-[50px] flex justify-center items-center text-2xl"
                          onClick={() => HandleDelete(ad._id)}
                        >
                          <MdOutlineDeleteForever />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {componentSelect == "details" && (
        <div>
          <AdminAdDetails
            selectedAd={selectedAd}
            setComponentSelect={setComponentSelect}
          />
        </div>
      )}
      {componentSelect == "newAd" && (
        <div>
          <AdminNewAd setComponentSelect={setComponentSelect} />
        </div>
      )}
    </>
  );
};

export default AdminAds;
