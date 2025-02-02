import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { CiCalendarDate } from "react-icons/ci";
import { FaBus } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { IoCallSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const BidTable: React.FC = () => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [bids, setBids] = useState<any[]>([]);

  const toggleRow = (id: number) => {
    setExpandedRow((prevRow) => (prevRow === id ? null : id));
  };

  useEffect(() => {
    const storedBids = localStorage.getItem('bids'); // Get data from localStorage
    if (storedBids) {
      setBids(JSON.parse(storedBids)); // Parse and set bids if data is found
    }
  }, []);

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-sm">S.No.</th>
            <th className="px-4 py-3 text-left text-sm">Bid Number<br />Created By</th>
            <th className="px-4 py-3 text-left text-sm">Start Date<br />& Time</th>
            <th className="px-4 py-3 text-left text-sm">Bid Time<br />Remaining</th>
            <th className="px-4 py-3 text-left text-sm">From city<br />To city</th>
            <th className="px-4 py-3 text-left text-sm">Vehicle Type, Size<br />Body, No. of Vehicle</th>
            <th className="px-4 py-3 text-left text-sm">Material Weight<br />(in kg)</th>
            <th className="px-4 py-3 text-center text-sm">Response</th>
            <th className="px-4 py-3 text-left text-sm">Assigned Staff</th>
            <th className="px-4 py-3 text-center text-sm">Details</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {bids.length > 0 ? (
            bids.map((bid) => (
              <React.Fragment key={bid.id}>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {bid.id}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>{bid.bidNo}</div>
                    <div className="text-sm text-gray-500">{bid.createPerson}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div>{bid.requestDate}</div>
                    <div className="text-sm text-gray-500">{bid.requestDate}</div>
                  </td>
                  <td className="px-4 py-3">{bid.bidRemaining}</td>
                  <td className="px-4 py-3">
                    <div>{bid.loadingPoint}</div>
                    <div className="text-sm text-gray-500">+</div>
                    <div>{bid.unloadingPoint}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div>{bid.vehicleType}</div>
                    <div className="text-sm text-gray-500">{bid.bodyType}</div>
                  </td>
                  <td className="px-4 py-3">{bid.weight}</td>
                  <td className="px-4 py-3 text-center">
                    <div>{bid.response}</div>
                    <button className="text-blue-600 text-sm">View results</button>
                  </td>
                  <td className="px-4 py-3">
                    <div>{bid.assignedStaff}</div>
                    <div className="text-sm text-gray-500">{bid.referenceId}</div>
                  </td>
                  <td className="px-4 py-3 text-center flex gap-2">
                     <button
                      onClick={() => toggleRow(bid.id)}
                      className="text-blue-600 flex items-center justify-center gap-1 mx-auto"
                    >
                      View Details
                      {/* Chevron Icon (changes based on row expansion) */}
                      {expandedRow === bid.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const newData = bids.filter((e: any) => e.id !== bid.id);
                        setBids(newData);
                        localStorage.setItem("bids", JSON.stringify(newData));
                      }}
                      className="text-red-500"
                    >
                      delete
                    </button>
                  </td>
                </tr>
                {expandedRow === bid.id && (
                  <tr>
                    <td colSpan={10} className="bg-blue-50 px-8 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-gray-600">Bid No: {bid.bidNo}</span>
                            <span className="text-gray-600">({bid.createPerson})</span>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <div className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                <div>
                                  <div className="font-medium">{bid.loadingPoint}</div>
                                  <div className="text-sm text-gray-600">{bid.loadingPoint}</div>
                                  <div className="text-sm text-gray-500">Loading Point: {bid.loadingPoint}</div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <div className="flex items-start gap-2">
                                <div className="w-2 h-2 mt-2"><FaLocationDot color="red" /></div>
                                <div>
                                  <div className="font-medium">{bid.unloadingPoint}</div>
                                  <div className="text-sm text-gray-600">{bid.unloadingPoint}</div>
                                  <div className="text-sm text-gray-500">Unloading Point: {bid.unloadingPoint}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <CiCalendarDate />
                              <span className="text-gray-600">Vehicle loading date:</span>
                              <span>{bid.vehicleLoadingDate}</span>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <FaBus />
                              <span className="text-gray-600">Vehicle Type:</span>
                              <span>{bid.vehicleType}</span>
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                {bid.fuelType}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <FaBoxOpen />
                              <span className="text-gray-600">Material:</span>
                              <span>{bid.material}</span>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">Weight:</span>
                              <span>{bid.weight}</span>
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">requestDate:</span>
                              <span>{bid.requestDate}</span>
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">expiryDate:</span>
                              <span>{bid.expiryDate}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <FaUser />
                              <span className="text-gray-600">Assigned Staff:</span>
                              <span>{bid.assignedStaff}</span>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <IoCallSharp />
                              <span className="text-gray-600">Phone number:</span>
                              <span className="text-blue-600">{bid.phoneNumber}</span>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">Target Price:</span>
                              <span>{bid.targetPrice}</span>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">Number of Bids for this Bid:</span>
                              <span>{bid.numBids}</span>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">Remarks:</span>
                              <span className="text-red-600">{bid.remarks}</span>
                            </div>
                          </div>
                          <div onClick={() => setExpandedRow(null)} className="flex justify-end">
                            <button className="text-blue-600 text-sm">View less</button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan={10} className="text-center py-2 bg-gray-200">
                no bids added
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BidTable;
